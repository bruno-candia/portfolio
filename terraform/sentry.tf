resource "sentry_project" "portfolio" {
  organization = var.sentry_org
  teams        = ["personal"]
  name         = var.sentry_project_name
  slug         = var.sentry_project_name
  platform     = "javascript-nextjs"
}

resource "sentry_issue_alert" "critical_errors" {
  organization = var.sentry_org
  project      = sentry_project.portfolio.id
  name         = "Alerta: Erros Críticos de Produção"
  action_match = "any"
  filter_match = "any"
  frequency    = 30 # minutos de intervalo entre alertas idênticos

  conditions = jsonencode([
    {
      id = "sentry.rules.conditions.high_priority_issue.NewHighPriorityIssueCondition"
    },
    {
      id = "sentry.rules.conditions.high_priority_issue.ExistingHighPriorityIssueCondition"
    }
  ])

  actions = jsonencode([
    {
      id               = "sentry.mail.actions.NotifyEmailAction"
      targetType       = "IssueOwners"
      targetIdentifier = ""
    }
  ])
}

# ------------------------------------------------------------------------------
# SLOs & Error Budgets (Fase 2)
# ------------------------------------------------------------------------------

# Alerta de Disponibilidade (Error Budget)
# Esgota se a contagem de erros for muito alta nos últimos 60 minutos.
resource "sentry_metric_alert" "error_budget_availability" {
  organization      = var.sentry_org
  project           = sentry_project.portfolio.id
  name              = "SLO: Error Budget de Disponibilidade"
  dataset           = "events"
  query             = "event.type:error"
  aggregate         = "count()"
  time_window       = 60
  threshold_type    = 0 # 0 para "above"
  resolve_threshold = 10

  trigger {
    alert_threshold   = 100
    resolve_threshold = 10
    label             = "critical"
    threshold_type    = 0
  }
}

# Alerta de Performance (Error Budget de Latência / LCP)
# Esgota se o tempo de P95 de LCP exceder 2500ms (Core Web Vitals - Needs Improvement / Poor limit)
resource "sentry_metric_alert" "error_budget_latency" {
  organization      = var.sentry_org
  project           = sentry_project.portfolio.id
  name              = "SLO: Error Budget de Latência (LCP)"
  dataset           = "transactions"
  query             = "transaction.op:pageload has:measurements.lcp"
  aggregate         = "p95(measurements.lcp)"
  time_window       = 60
  threshold_type    = 0
  resolve_threshold = 2000

  trigger {
    alert_threshold   = 2500
    resolve_threshold = 2000
    label             = "critical"
    threshold_type    = 0
  }
}
