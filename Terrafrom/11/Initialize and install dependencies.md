The terraform init command is used to initialize a working directory containing the Terraform configuration files.

This command performs several different initialization steps in order to prepare a working directory for use and is always safe to run multiple times, to bring the working directory up to date with changes in the configuration:


Run terraform init:
    terraform init

Run the terraform apply command, which is used to apply the changes required to reach the desired state of the configuration:
    terraform apply -var="region=us-central1" -var="location=us-central1-a"

Review Terraform's actions and inspect the resources which will be created.

When ready, type yes to begin Terraform actions.

Verify resources created by Terraform
In the console, navigate to Navigation menu > Kubernetes Engine.
Click on tf-gke-k8s cluster and check its configuration.
In the left panel, click Gateways, Services & Ingress and check the nginx service status.
Click the Endpoints IP address to open the Welcome to nginx! page in a new browser tab.