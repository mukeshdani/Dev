# AKS Kubernetes Deployment with Helm & Azure DevOps

This project contains a universal Helm chart used to deploy microservices smoothly onto Azure Kubernetes Service (AKS). It supports both **Development** and **Production** environments using custom configuration variables, secrets management, and automated CI/CD pipelines.

---

## Project Structure
```text
k8s-04-10-2026-helm/
├── helm/
│   ├── Chart.yaml         # Chart metadata and versions
│   ├── values.yaml        # Default global fallback variables
│   ├── value-dev.yaml     # Dev environment configurations
│   ├── value-prod.yaml    # Production configurations (with resource limits)
│   └── templates/         # Kubernetes manifest templates
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── configmap.yaml
│       └── secret.yaml
└── azure-pipelines.yml    # Multi-stage Azure DevOps pipeline file
```

---

## Step 1: Connect to Azure & Your AKS Cluster

Before running any commands, open your terminal (PowerShell or Bash) and authenticate with your cloud account.

1. **Log into your Azure Account:**
   ```bash
   az login
   ```
2. **Download Cluster Connection Credentials:**
   ```bash
   az aks get-credentials --resource-group digitalops --name digitalcluster
   ```
3. **Verify the Cluster Connection:**
   ```bash
   kubectl get nodes
   ```
   *(Ensure your node pools show a `Ready` status before moving forward).*

---

##  Step 2: Validate and Test Helm Templates Locally

Always test your syntax adjustments locally before running a live deployment update.

1. **Check for Code & Indentation Errors:**
   ```bash
   helm lint ./helm
   ```
2. **Preview Generated Dev Manifests (Dry-Run):**
   ```bash
   helm template my-release ./helm -f ./helm/value-dev.yaml
   ```
3. **Preview Generated Production Manifests (Dry-Run):**
   ```bash
   helm template my-release ./helm -f ./helm/value-prod.yaml
   ```

---

## Step 3: Manual Deployment & Rollbacks

If you want to manually manage or fix updates straight from your workspace console.

* **Deploy / Upgrade to Development:**
  ```bash
  helm upgrade --install mkd-dev-app ./helm -f ./helm/value-dev.yaml
  ```
* **Deploy / Upgrade to Production:**
  ```bash
  helm upgrade --install mkd-prod-app ./helm -f ./helm/value-prod.yaml
  ```
* **Instantly Undo a Failed Production Deployment:**
  ```bash
  helm rollback mkd-prod-app 1
  ```
* **Check Deployment History:**
  ```bash
  helm history mkd-prod-app
  ```

---

## Step 4: Verify Live Container Details

Run these checks to guarantee your workloads are running smoothly inside AKS.

1. **List All Running Pods:**
   ```bash
   kubectl get pods
   ```
2. **Inspect Production Resource Constraints (Conditional Logic Check):**
   ```bash
   kubectl describe pod <your-prod-pod-name>
   ```
3. **Look Inside a Live Pod to Verify Environment Variables:**
   ```bash
   kubectl exec <your-dev-pod-name> -- printenv
   ```

---

## Step 5: Automate with Azure DevOps (ADO) Pipeline

To set up hands-free automated continuous deployment (CD):

1. Go to **ADO Project Settings** -> **Service Connections** -> Create a new **Azure Resource Manager** connection named `aks-service-connection` pointing to your cluster resource group.
2. Push your project folder to your repository (**GitHub** or **Azure Repos Git**).
3. In Azure DevOps, go to **Pipelines** -> Click **New Pipeline** -> Select your repository.
4. Choose **Existing Azure Pipelines YAML file** and select the `/azure-pipelines.yml` file from the root directory.
5. Click **Run**! Your code changes will now auto-deploy to Dev, then wait for verification before updating Production.
