# Recursos do Sentry
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

# Recursos da Vercel
resource "vercel_project" "portfolio" {
  name      = var.vercel_project_name
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = var.github_repo
  }
}

resource "vercel_project_domain" "custom_domain" {
  project_id = vercel_project.portfolio.id
  domain     = "brunocandia.com"
}


resource "vercel_project_environment_variable" "api_key" {
  count      = var.app_secret_api_key != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  key        = "SECRET_API_KEY"
  value      = var.app_secret_api_key
  target     = ["production", "preview"]
  sensitive  = true
}

resource "vercel_project_environment_variable" "sentry_dsn" {
  count      = var.sentry_dsn != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  key        = "NEXT_PUBLIC_SENTRY_DSN"
  value      = var.sentry_dsn
  target     = ["production", "preview", "development"]
  sensitive  = true
}

resource "vercel_project_environment_variable" "ga_measurement_id" {
  count      = var.ga_measurement_id != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  key        = "GA_MEASUREMENT_ID"
  value      = var.ga_measurement_id
  target     = ["production"]
  sensitive  = false
}

resource "vercel_project_environment_variable" "ga_api_secret" {
  count      = var.ga_api_secret != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  key        = "GA_API_SECRET"
  value      = var.ga_api_secret
  target     = ["production"]
  sensitive  = true
}

resource "vercel_project_environment_variable" "consent_secret" {
  count      = var.consent_secret != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  key        = "CONSENT_SECRET"
  value      = var.consent_secret
  target     = ["production", "preview"]
  sensitive  = true
}
