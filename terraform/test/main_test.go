package test

import (
	"testing"

	"github.com/gruntwork-io/terratest/modules/terraform"
)

func TestTerraformConfiguration(t *testing.T) {
	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		TerraformDir: "../",
		NoColor:      true,
	})

	// Keep this test non-destructive. Acceptance tests must use a separate,
	// ephemeral workspace before they may call Apply or Destroy.
	terraform.InitAndValidate(t, terraformOptions)
}
