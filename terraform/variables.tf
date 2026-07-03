variable "vercel_api_token" {
  type        = string
  description = "Token de API da Vercel para autenticação"
  sensitive   = true
}

variable "vercel_team_id" {
  type        = string
  description = "ID do time no console da Vercel (obrigatório para recursos sob times)"
  default     = "team_BoPmisi1VYB4voNC2i4O59ai"
}

variable "vercel_project_name" {
  type        = string
  description = "Nome do projeto na Vercel"
  default     = "portfolio"
}

variable "github_repo" {
  type        = string
  description = "Repositório Git associado no formato org/repo"
  default     = "bruno-candia/portfolio"
}

variable "sentry_api_token" {
  type        = string
  description = "Token de API do Sentry para autenticação"
  sensitive   = true
}

variable "sentry_org" {
  type        = string
  description = "Slug da organização no Sentry"
  default     = "brunocandia"
}

variable "sentry_project_name" {
  type        = string
  description = "Slug do projeto no Sentry"
  default     = "portfolio"
}

variable "app_secret_api_key" {
  type        = string
  description = "Chave de API secreta de exemplo injetada de forma segura na Vercel"
  sensitive   = true
  default     = ""
}

variable "sentry_dsn" {
  type        = string
  description = "DSN do Sentry para instrumentação do cliente e servidor"
  sensitive   = true
  default     = ""
}

variable "ga_measurement_id" {
  type        = string
  description = "ID de medição do Google Analytics (GA4)"
  default     = ""
}

variable "ga_api_secret" {
  type        = string
  description = "Segredo da API do Google Analytics (Measurement Protocol)"
  sensitive   = true
  default     = ""
}

variable "consent_secret" {
  type        = string
  description = "Segredo para criptografia/assinatura dos cookies de consentimento de privacidade"
  sensitive   = true
  default     = ""
}
