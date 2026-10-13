resource "sentry_project" "portfolio" {
  organization = var.sentry_org
  teams        = ["personal"]
  name         = var.sentry_project_name
  slug         = var.sentry_project_name
  platform     = "javascript-nextjs"
}

data "sentry_team" "personal" {
  organization = var.sentry_org
  slug         = "personal"
}

# Classic issue rules now use the project's default issue monitor.
data "sentry_project_error_monitor" "portfolio" {
  organization = var.sentry_org
  project      = sentry_project.portfolio.slug
}

resource "sentry_alert" "critical_errors" {
  organization      = var.sentry_org
  name              = "Alerta: Erros Críticos de Produção"
  monitor_ids       = [data.sentry_project_error_monitor.portfolio.id]
  frequency_minutes = 30
  legacy_trigger_conditions = [
    "new_high_priority_issue",
    "existing_high_priority_issue",
  ]
  action_filters = [{
    logic_type = "all"
    actions = [{
      email = {
        target_type      = "issue_owners"
        fallthrough_type = "AllMembers"
      }
    }]
  }]
}

resource "sentry_metric_monitor" "error_budget_availability" {
  organization = var.sentry_org
  project      = sentry_project.portfolio.slug
  name         = "SLO: Error Budget de Disponibilidade"
  owner = {
    team_id = data.sentry_team.personal.internal_id
  }
  dataset             = "events"
  event_types         = ["error"]
  query               = "event.type:error"
  query_type          = "error"
  aggregate           = "count()"
  time_window_seconds = 3600
  issue_detection     = { type = "static" }
  condition_group = {
    logic_type = "any"
    conditions = [
      { type = "gt", comparison = 100, condition_result = 75 },
      { type = "lte", comparison = 10, condition_result = 0 },
    ]
  }
}

resource "sentry_metric_monitor" "error_budget_latency" {
  organization = var.sentry_org
  project      = sentry_project.portfolio.slug
  name         = "SLO: Error Budget de Latência (LCP)"
  owner = {
    team_id = data.sentry_team.personal.internal_id
  }
  dataset             = "events_analytics_platform"
  event_types         = ["transaction"]
  query               = "is_transaction:true transaction.op:pageload has:measurements.lcp"
  query_type          = "performance"
  aggregate           = "p95(measurements.lcp)"
  time_window_seconds = 3600
  issue_detection     = { type = "static" }
  condition_group = {
    logic_type = "any"
    conditions = [
      { type = "gt", comparison = 2500, condition_result = 75 },
      { type = "lte", comparison = 2000, condition_result = 0 },
    ]
  }
}

resource "sentry_alert" "error_budgets" {
  organization      = var.sentry_org
  name              = "SLO: Error Budgets"
  frequency_minutes = 60
  monitor_ids = [
    sentry_metric_monitor.error_budget_availability.id,
    sentry_metric_monitor.error_budget_latency.id,
  ]
  trigger_conditions = [{ first_seen_event = {} }, { reappeared_event = {} }]
  action_filters = [{
    logic_type = "all"
    actions = [{
      email = {
        target_type = "team"
        target_id   = data.sentry_team.personal.internal_id
      }
    }]
  }]
}
