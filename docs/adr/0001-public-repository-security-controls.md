# ADR 0001: Public Repository Security Controls

- Status: Accepted
- Date: 2026-07-24

## Context

This portfolio is a public repository that deploys application and
observability infrastructure. Its CI therefore handles production credentials
and produces Terraform output that could reveal operational details.

The branch also contained a Terratest scaffold that called `apply` and
`destroy` against the configured HCP Terraform workspace. A normal `go test`
could consequently mutate production infrastructure.

## Decision

- Keep production credentials only in GitHub and HCP Terraform secrets.
- Scan complete Git history with Gitleaks and maintain only narrow,
  evidence-backed false-positive allowlists.
- Pin GitHub Actions to immutable commit SHAs and let Dependabot propose
  updates.
- Publish Terraform check statuses, but never the raw plan, in public pull
  requests.
- Keep local Terraform tests non-destructive. Future acceptance tests must use
  an explicitly isolated, ephemeral workspace.
- Run production applies in a serialized GitHub `production` environment after
  all required checks pass on protected `master`.
- Run CodeQL for JavaScript and TypeScript on pull requests, `master`, and a
  weekly schedule.

## Consequences

CI gains additional runtime and dependency-update pull requests. Contributors
cannot inspect a full Terraform plan in a public pull-request comment and must
use the authenticated HCP Terraform run instead.

The repository can be cloned and tested without risking production mutation.
Security controls are visible as code, while remote branch and environment
policies remain verifiable through the GitHub API.
