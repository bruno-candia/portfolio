package test

import (
	"os"
	"regexp"
	"strings"
	"testing"
)

func TestSentryMetricAlertContract(t *testing.T) {
	t.Parallel()

	config, err := os.ReadFile("../sentry.tf")
	if err != nil {
		t.Fatalf("read sentry.tf: %v", err)
	}

	availability := resourceBlock(t, string(config), `resource "sentry_metric_alert" "error_budget_availability"`)
	latency := resourceBlock(t, string(config), `resource "sentry_metric_alert" "error_budget_latency"`)

	assertMatches(t, latency, `(?m)dataset\s*=\s*"events_analytics_platform"`,
		"latency alert must use Sentry's events_analytics_platform dataset")
	assertMatches(t, latency, `(?m)query\s*=\s*"[^"]*is_transaction:true[^"]*"`,
		"latency alert must filter transaction spans with is_transaction:true")

	for name, block := range map[string]string{
		"availability": availability,
		"latency":      latency,
	} {
		assertMatches(t, block, `(?m)^\s*action\s*\{`,
			name+" alert trigger must have an associated action")
		assertMatches(t, block, `(?m)^\s*type\s*=\s*"email"`,
			name+" alert action must notify by email")
		assertMatches(t, block, `(?m)^\s*target_type\s*=\s*"team"`,
			name+" alert action must target a team")
		assertMatches(t, block, `(?m)^\s*target_identifier\s*=\s*data\.sentry_team\.personal\.internal_id`,
			name+" alert action must target the personal team ID")
	}
}

func assertMatches(t *testing.T, value, pattern, message string) {
	t.Helper()

	if !regexp.MustCompile(pattern).MatchString(value) {
		t.Error(message)
	}
}

func resourceBlock(t *testing.T, config, marker string) string {
	t.Helper()

	start := strings.Index(config, marker)
	if start == -1 {
		t.Fatalf("resource block %q not found", marker)
	}

	open := strings.Index(config[start:], "{")
	if open == -1 {
		t.Fatalf("opening brace for %q not found", marker)
	}
	open += start

	depth := 0
	for i := open; i < len(config); i++ {
		switch config[i] {
		case '{':
			depth++
		case '}':
			depth--
			if depth == 0 {
				return config[start : i+1]
			}
		}
	}

	t.Fatalf("closing brace for %q not found", marker)
	return ""
}
