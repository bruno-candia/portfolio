terraform {
  required_version = ">= 1.5.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
    sentry = {
      source  = "jianyuan/sentry"
      version = "~> 0.12.0"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team_id
}

provider "sentry" {
  token = var.sentry_api_token
}
