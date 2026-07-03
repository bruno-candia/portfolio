output "vercel_project_id" {
  value       = vercel_project.portfolio.id
  description = "O ID do projeto na Vercel"
}

output "vercel_project_targets" {
  value = [
    vercel_project_domain.custom_domain.domain
  ]
  description = "Os domínios mapeados para o projeto na Vercel"
}

output "sentry_project_id" {
  value       = sentry_project.portfolio.id
  description = "O ID do projeto no Sentry"
}
