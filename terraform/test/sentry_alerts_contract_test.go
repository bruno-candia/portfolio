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

	availability := resourceBlock(t, string(config), `resource "sentry_metric_monitor" "error_budget_availability"`)
	latency := resourceBlock(t, string(config), `resource "sentry_metric_monitor" "error_budget_latency"`)

	assertMatches(t, availability, `(?m)event_types\s*=\s*\[\s*"error"\s*\]`,
		"availability alert must declare Sentry's normalized error event type to avoid perpetual drift")
	assertMatches(t, latency, `(?m)dataset\s*=\s*"events_analytics_platform"`,
		"latency alert must use Sentry's events_analytics_platform dataset")
	assertMatches(t, latency, `(?m)query\s*=\s*"[^"]*is_transaction:true[^"]*"`,
		"latency alert must filter transaction spans with is_transaction:true")

	for name, block := range map[string]string{
		"availability": availability,
		"latency":      latency,
	} {
		assertMatches(t, block, `(?m)^\s*owner\s*=\s*\{`,
			name+" monitor must have an owner")
		assertMatches(t, block, `(?m)team_id\s*=\s*data\.sentry_team\.personal\.internal_id`, name+" monitor must belong to personal team")
		assertMatches(t, block, `(?m)time_window_seconds\s*=\s*3600`, name+" monitor must preserve one hour window")
	}
	alerts := resourceBlock(t, string(config), `resource "sentry_alert" "error_budgets"`)
	assertMatches(t, alerts, `sentry_metric_monitor\.error_budget_availability\.id`, "alert must connect availability")
	assertMatches(t, alerts, `sentry_metric_monitor\.error_budget_latency\.id`, "alert must connect latency")
	assertMatches(t, alerts, `regression_event`, "notify again after a recovered monitor breaches its threshold")
	assertMatches(t, alerts, `target_type\s*=\s*"team"`, "alert must email team")
	assertMatches(t, alerts, `target_id\s*=\s*data\.sentry_team\.personal\.internal_id`, "alert must target personal team")
	critical := resourceBlock(t, string(config), `resource "sentry_alert" "critical_errors"`)
	assertMatches(t, critical, `"new_high_priority_issue"`, "preserve new high priority trigger")
	assertMatches(t, critical, `"existing_high_priority_issue"`, "preserve existing high priority trigger")
	assertMatches(t, critical, `frequency_minutes\s*=\s*30`, "preserve 30 minute frequency")
	assertMatches(t, critical, `logic_type\s*=\s*"all"`, "empty action filters must permit critical notifications")
	assertMatches(t, critical, `target_type\s*=\s*"issue_owners"`, "preserve owner notification")
	assertMatches(t, availability, `comparison\s*=\s*100`, "preserve availability critical threshold")
	assertMatches(t, availability, `comparison\s*=\s*10`, "preserve availability resolve threshold")
	assertMatches(t, latency, `comparison\s*=\s*2500`, "preserve latency critical threshold")
	assertMatches(t, latency, `comparison\s*=\s*2000`, "preserve latency resolve threshold")

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
