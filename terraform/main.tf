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
