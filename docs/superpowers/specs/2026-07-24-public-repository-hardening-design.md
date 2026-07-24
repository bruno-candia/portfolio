# Public Repository Hardening

## Objective

Publish the Sentry alert fix without exposing credentials or operational data, while making the repository demonstrate production-minded engineering practices that are real, testable, and proportionate to a personal portfolio.

## Scope

The change will:

- fix the two invalid Sentry metric alerts;
- prevent Terraform tests from applying to or destroying the production workspace;
- scan the complete Git history for secrets on pull requests and pushes;
- stop publishing raw Terraform plans in public pull-request comments;
- pin every GitHub Action to an immutable commit SHA;
- add CodeQL and Dependabot coverage;
- document responsible vulnerability reporting;
- gate production applies through a GitHub Environment and serialized execution;
- protect `master` with pull requests and required CI checks;
- label SRE documentation as a target operating model or reusable template where it is not evidence of a real incident.

The unrelated local change in `src/app/api/events/route.ts` is excluded from this publication.

## Workflow Design

The CI workflow remains split by responsibility:

1. `quality` validates TypeScript, lint, unit tests, and browser tests with read-only repository access.
2. `security` runs Gitleaks against full Git history without publishing findings, reports, or raw matches.
3. `terraform-check` runs the static Sentry contract test, formatting, validation, tfsec, and a remote plan. Its pull-request comment contains statuses only.
4. `terraform-apply` runs only after a push to protected `master`, uses the `production` environment, and never cancels an apply already in progress.
5. A separate CodeQL workflow analyzes JavaScript and TypeScript on pull requests, pushes to `master`, and a weekly schedule.

## Secret Handling

Real `.env` and `.tfvars` files remain ignored and must have owner-only local permissions. Example files contain placeholders only. Gitleaks uses the default rules plus one narrow allowlist for the historical `consent_secret` placeholder that is already known to be non-secret.

No workflow may echo secret values or publish the raw Terraform plan. GitHub Secrets remain referenced only through the `secrets` context.

## GitHub Repository Policy

The repository remains public. `master` requires a pull request, passing quality, security, Terraform, and CodeQL checks, resolved conversations, and linear history. Direct force pushes and branch deletion are blocked. Squash merging is the default history strategy.

The `production` environment restricts deployments to `master`. Required-reviewer protection will be enabled only if GitHub supports a usable solo-maintainer configuration; otherwise the environment and branch checks remain the enforceable gate.

## Failure Behavior

- A detected secret blocks CI and exposes only rule and location metadata.
- Terraform validation or plan failure blocks merging.
- Production applies are serialized and are not automatically cancelled.
- CodeQL findings appear in GitHub code scanning rather than workflow comments.
- Unsupported repository-plan features are reported instead of silently weakening another protection.

## Validation

Before publication:

- Gitleaks scans all refs and the staged diff;
- the Sentry contract regression test passes;
- the formerly destructive Terraform test runs without apply or destroy;
- `terraform fmt`, `terraform validate`, workflow YAML parsing, and repository diff checks pass;
- GitHub repository visibility, merge policy, branch rules, environments, and required checks are read back after mutation.

## Acceptance Criteria

- No real credential is present in tracked files or Git history.
- A normal `go test` cannot mutate remote infrastructure.
- Pull requests cannot publish raw Terraform plan content.
- All Actions use immutable SHAs.
- The Sentry fix reaches a draft pull request without including unrelated worktree changes.
- Remote protections are confirmed from GitHub after configuration.
