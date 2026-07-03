package test

import (
	"testing"
	// "time"

	"github.com/gruntwork-io/terratest/modules/terraform"
	// http_helper "github.com/gruntwork-io/terratest/modules/http-helper"
)

func TestTerraformInfrastructure(t *testing.T) {
	t.Parallel()

	// Configuração do Terratest para apontar para a pasta do terraform (../)
	// Idealmente em testes reais de CI/CD, variáveis de ambiente ou vars no tfvars apontariam para um Workspace "sandbox" ou "test"
	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "../",

		// Exemplo de passagem de variáveis customizadas:
		// Vars: map[string]interface{}{
		// 	"sentry_project_name": "portfolio-test",
		// },

		NoColor: true,
	})

	// Garante que os recursos criados para o teste serão destruídos ao final
	defer terraform.Destroy(t, terraformOptions)

	// Inicializa os módulos do terraform e aplica as mudanças
	terraform.InitAndApply(t, terraformOptions)

	// Exemplo de como validar os resultados (Outputs) criados pela infra:
	// url := terraform.Output(t, terraformOptions, "website_url")
	
	// Validação dinâmica (verificar se o site retorna status HTTP 200 após o deploy)
	// http_helper.HttpGetWithRetry(t, url, nil, 200, "expected text", 10, 5*time.Second)
}
