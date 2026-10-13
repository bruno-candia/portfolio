"""Exercise real provider refresh against a loopback-only, synthetic 404 fixture.

No cloud backend, credentials, production state, apply, or external Sentry calls.
Usage: python3 sentry_missing_alert_test.py [provider-version]
"""
import http.server
import json
import os
import re
from pathlib import Path
import subprocess
import sys
import tempfile
import threading

lock = Path(__file__).resolve().parents[1].joinpath('.terraform.lock.hcl').read_text()
selected = re.search(r'provider "registry.terraform.io/jianyuan/sentry"\s*\{\s*version\s*=\s*"([^"\n]+)"', lock)
assert selected, 'Missing locked Sentry provider'
version = sys.argv[1] if len(sys.argv) > 1 else selected.group(1)
# Terraform enumerates saved credential hosts even with a CLI config override.
# Refuse that environment before launching it; inspect existence only.
if Path.home().joinpath('.terraform.d/credentials.tfrc.json').exists():
    raise SystemExit('Run this fixture on a clean runner without saved Terraform credentials')
requests = []


class Fixture(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        requests.append(self.path)
        missing = '/rules/' in self.path
        self.send_response(404 if missing else 200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(b'{"detail":"Not found"}' if missing else b'{}')

    def log_message(self, *_args):
        pass


server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), Fixture)
threading.Thread(target=server.serve_forever, daemon=True).start()
try:
    with tempfile.TemporaryDirectory(prefix='sentry-404-fixture-') as temporary:
        root = Path(temporary)
        root.joinpath('main.tf').write_text('''
terraform {
  required_providers {
    sentry = {
      source = "jianyuan/sentry"
      version = "= VERSION"
    }
  }
}
provider "sentry" {
  token = "synthetic-test-token"
  base_url = "http://127.0.0.1:PORT/api/"
}
resource "sentry_issue_alert" "fixture" {
  organization = "fixture-org"
  project = "fixture-project"
  name = "fixture-alert"
  action_match = "any"
  filter_match = "any"
  frequency = 30
  conditions = jsonencode([{ id = "sentry.rules.conditions.high_priority_issue.NewHighPriorityIssueCondition" }])
  actions = jsonencode([{ id = "sentry.mail.actions.NotifyEmailAction", targetType = "IssueOwners", targetIdentifier = "" }])
}
'''.replace('VERSION', version).replace('PORT', str(server.server_port)))
        attrs = dict(id='123', organization='fixture-org', project='fixture-project',
                     name='fixture-alert', action_match='any', filter_match='any',
                     frequency=30, conditions=json.dumps([dict(id='sentry.rules.conditions.high_priority_issue.NewHighPriorityIssueCondition')]), actions=json.dumps([dict(id='sentry.mail.actions.NotifyEmailAction', targetType='IssueOwners', targetIdentifier='')]), filters=None,
                     environment=None)
        root.joinpath('terraform.tfstate').write_text(json.dumps(dict(
            version=4, terraform_version='1.15.7', serial=1,
            lineage='00000000-0000-0000-0000-000000000001', outputs={},
            resources=[dict(mode='managed', type='sentry_issue_alert', name='fixture',
                            provider='provider["registry.terraform.io/jianyuan/sentry"]',
                            instances=[dict(schema_version=2, attributes=attrs)])])))
        env = {k: v for k, v in os.environ.items()
               if not k.startswith(('TF_', 'SENTRY_'))}
        root.joinpath('fixture.tfrc').write_text('')
        # Explicit override also suppresses the default CLI config directory.
        env['TF_CLI_CONFIG_FILE'] = str(root / 'fixture.tfrc')
        env['TF_IN_AUTOMATION'] = '1'
        def run(*args):
            return subprocess.run(['terraform', *args], cwd=root, env=env,
                                  capture_output=True, text=True, timeout=120)
        init = run('init', '-backend=false', '-input=false', '-no-color')
        if init.returncode:
            raise AssertionError('Provider initialization failed')
        plan = run('plan', '-input=false', '-no-color', '-out=fixture.plan')
        assert '/api/0/projects/fixture-org/fixture-project/rules/123/' in requests, plan.stdout + plan.stderr
        if plan.returncode:
            assert 'Issue alert not found' in plan.stdout + plan.stderr, 'Unexpected failure'
            raise AssertionError('404 aborts refresh instead of planning alert recreation')
        show = run('show', '-json', 'fixture.plan')
        assert show.returncode == 0
        changes = json.loads(show.stdout)['resource_changes']
        assert len(changes) == 1 and changes[0]['change']['actions'] == ['create']
        print(f'PASS: Sentry {version} handles 404 and plans only fixture alert creation')
finally:
    server.shutdown()
