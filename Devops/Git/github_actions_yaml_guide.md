# Understanding GitHub Actions YAML Code

If you want to build CI/CD pipelines for your infrastructure, you have to write `.yml` (YAML) files. YAML is not a programming language like Python or JavaScript; it is a **Configuration Language**. It uses simple "Key: Value" pairs and relies strictly on indentation (spaces) to group things together.

Here is the ultimate breakdown of exactly what goes inside a GitHub Actions YAML file, tailored specifically for **Terraform**.

---

## The 4 Pillars of a Pipeline

Every GitHub Action file is built on 4 main blocks. If you understand these 4 blocks, you can read and write any pipeline in the world.

### 1. `name` (The Title)
This is simply the title of your pipeline. It shows up in the "Actions" tab on your GitHub dashboard so you know which pipeline is running.
```yaml
name: Production Terraform Pipeline
```

### 2. `on` (The Trigger)
This block tells the pipeline **WHEN** to wake up and start running. You can trigger it on code pushes, pull requests, or even on a schedule.
```yaml
on:
  push:
    branches:
      - main         # Wake up when code is pushed to the 'main' branch
  pull_request:
    branches:
      - features/*   # Wake up when a PR is made from any 'features' branch
```

### 3. `jobs` (The Workers)
A pipeline can have multiple "jobs". Think of a job as a physical computer (a runner) that GitHub rents for you in the cloud to do your work.
```yaml
jobs:
  terraform-plan:               # The name you give to your job
    runs-on: ubuntu-latest      # We are asking GitHub for a free Linux computer
```

### 4. `steps` (The Instructions)
This is the heart of the pipeline. Once GitHub gives you the `ubuntu-latest` computer, what exactly do you want it to do? 

There are two main ways to give instructions in a step: **`uses`** and **`run`**.

- **`uses` (Using Pre-built Scripts):** 
  Instead of writing 100 lines of complex code to figure out how to install Terraform, you can just "use" a pre-built script that someone else published to the GitHub Marketplace.
  ```yaml
      - name: Install Terraform on the computer
        uses: hashicorp/setup-terraform@v3   # Pre-built script from HashiCorp
  ```

- **`run` (Typing in the Terminal):** 
  This acts exactly as if you were sitting at that Linux computer typing commands into the terminal yourself.
  ```yaml
      - name: Check Terraform syntax
        run: terraform validate     # Runs this exact command in the terminal
  ```

---

## Important Features: Variables & Secrets

### `env` (Environment Variables)
Sometimes you have variables that you want to pass directly into Terraform. You can declare them in an `env` block. (Terraform automatically reads variables that start with `TF_VAR_`).
```yaml
env:
  TF_VAR_environment: "production"
  TF_VAR_location: "eastus"

steps:
  - name: Run Terraform Plan
    run: terraform plan
```

### `secrets` (Hidden Credentials)
**Never type a real password or Secret Key in a YAML file.** Anyone who looks at your GitHub repository will see it. Instead, you save the credentials safely in your GitHub Repository Settings under "Secrets", and call them like this:
```yaml
      - name: Secure Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
```
*(GitHub will automatically hide the real secret in the logs and replace it with `***` so it can never be stolen).*

---

## Advanced Production Scenarios

In real enterprise production environments, Terraform pipelines must be smart. They use conditions, approvals, and fail-safes. Here is how you write them:

### 1. `if` Conditions (Smart Steps)
You don't always want every step to run. You can use `if` to make your pipeline intelligent.
```yaml
      # Only run this step IF the code was pushed directly to 'main'
      - name: Terraform Apply
        if: github.ref == 'refs/heads/main'
        run: terraform apply -auto-approve

      # Only run this step IF the previous step FAILED (e.g., to send a Slack alert)
      - name: Send Failure Alert
        if: failure()
        run: echo "The Terraform Build Failed!"
```

### 2. Manual Approvals (`needs` & `environment`)
Before running `terraform apply`, you usually want a manager to check the `plan`. To get a manual approval button in GitHub, you must split your pipeline into multiple jobs. You use `needs` to tell Job B to wait for Job A, and `environment` to trigger the approval pause.
```yaml
jobs:
  job1-plan:
    runs-on: ubuntu-latest
    steps:
      - run: terraform plan

  job2-apply:
    needs: job1-plan          # Wait for the Plan to finish successfully!
    environment: production   # PAUSE here and wait for a human to click 'Approve'
    runs-on: ubuntu-latest
    steps:
      - run: terraform apply -auto-approve
```

### 3. Concurrency (Preventing Cloud Crashes)
**Scenario:** A developer pushes code, and a Terraform Apply pipeline starts. 1 minute later, they realize they made a typo and push again. Now you have TWO Terraform pipelines running at the same time, fighting over the State File and crashing your cloud.
**Solution:** `concurrency`. It tells GitHub to only run one pipeline at a time.
```yaml
concurrency: 
  group: terraform-production
  # NEVER set this to 'true' for Terraform Apply jobs! 
  # If you cancel a deployment halfway through, your live servers could be permanently corrupted.
  cancel-in-progress: false  
```

### 4. Matrix Builds (Testing Multiple Versions)
If you want to test if your Terraform code works on Terraform version 1.4, 1.5, and 1.6, you use a `matrix`. GitHub will magically clone your job 3 times and run them all at the exact same time.
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        tf-version: ['1.4.0', '1.5.0', '1.6.0']
    
    steps:
      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: ${{ matrix.tf-version }} # Will run 3 times!
```

---

## The Ultimate Example (Putting it all together)

Here is a complete, real-world **Terraform Pipeline** combining everything we just learned into one smooth, production-grade file.

```yaml
name: Enterprise Terraform Pipeline

on:
  push:
    branches: [ main ]

# Automatically queue new pipelines if one is already running (Safe for State Locks)
concurrency: 
  group: terraform-deploy
  cancel-in-progress: false

env:
  TF_VAR_environment: "production"

jobs:
  # ==============================
  # JOB 1: PLAN (Runs Automatically)
  # ==============================
  terraform-plan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      
      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
          
      - run: terraform init
      - run: terraform plan -out=tfplan
      
      #  PRO TIP: In 100% strict production, you would upload the 'tfplan' file 
      # here using actions/upload-artifact so Job 2 can download and use it.

  # ==============================
  # JOB 2: APPLY (Needs Job 1 + Manual Approval)
  # ==============================
  terraform-apply:
    runs-on: ubuntu-latest
    needs: terraform-plan     # Wait for the plan to finish
    environment: production   # Pause for Tech Lead Approval
    
    # Extra safety: Only apply if it's the main branch
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      
      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
          
      - run: terraform init
      
      # (If using artifacts, you would download the 'tfplan' file here first)
      - run: terraform apply -auto-approve 
```
