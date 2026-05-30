# Project Instructions (GEMINI.md)

This file contains the foundational mandates, architecture patterns, and conventions for the `k8-via-gemini` project.

## Core Principles
- **Infrastructure as Code (IaC):** All Kubernetes resources must be defined in code (YAML/Helm/Kustomize). No manual `kubectl` changes in production.
- **Security First:** Never hardcode secrets. Use Kubernetes Secrets or a dedicated provider (HashiCorp Vault, AWS Secrets Manager).
- **Observability:** Applications must export logs in structured format (JSON) and provide metrics endpoints.

## Infrastructure as Code (Terraform) Standards

### 1. Modularity
- **Separate Modules:** Keep resources in separate modules (e.g., `aks`, `acr`, `vnet`) for reusability.
- **Environment Separation:** Use separate folders for each environment (e.g., `environments/dev`, `environments/prod`).

### 2. Variable Management
- Use `variables.tf` for declarations and `terraform.tfvars` for environment-specific values.
- **Naming Conventions:** Follow a consistent naming pattern: `${project}-${env}-${resource}`.

### 3. Dynamic & Generic Code
- **Iteration:** Use `for_each` and `count` to handle multiple instances of similar resources (e.g., additional node pools).
- **Generic Modules:** Modules should not have hardcoded values. Pass everything via variables.

### 4. Security
- **Sensitive Data:** Mark sensitive outputs (like kube_config) as `sensitive = true`.
- **RBAC:** Use managed identities for AKS and assign minimum required roles (e.g., `AcrPull`).

### 5. Documentation
- Every module must have `description` for variables and outputs.
- Use comments to explain complex logic or role assignments.

## Production Best Practices

### 1. Resource Management
- **Always specify requests and limits** for CPU and Memory in Pod specifications.
- Example:
  ```yaml
  resources:
    requests:
      memory: "64Mi"
      cpu: "250m"
    limits:
      memory: "128Mi"
      cpu: "500m"
  ```

### 2. High Availability & Reliability
- **Health Checks:** Every deployment MUST have `livenessProbe` and `readinessProbe` configured.
- **Termination:** Use `terminationGracePeriodSeconds` to allow graceful shutdown.
- **Replicas:** Production deployments should have at least 2 replicas across different nodes (use `podAntiAffinity`).

### 3. Security Standards
- **Run as Non-Root:** Containers should not run as the root user.
  ```yaml
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
  ```
- **ReadOnly Root Filesystem:** Use `readOnlyRootFilesystem: true` where possible.
- **Namespace Isolation:** Use Namespaces to segregate environments and teams.

### 4. Configuration
- **ConfigMaps:** Use ConfigMaps for non-sensitive configuration.
- **Secrets:** Use Secrets for sensitive data.
- **Environment Variables:** Prefer injecting configuration via environment variables or volume mounts.

### 5. Deployment Workflow
- **GitOps:** Prefer GitOps workflows (e.g., ArgoCD, Flux) for deploying to clusters.
- **Versioning:** Always use specific image tags (avoid `:latest`).

## Development Workflow
- **Linting:** All YAML files should be linted using `kube-linter` or `yamllint`.
- **Testing:** Validate manifests with `kubeval` or `conftest` before committing.
