Cloud Shell

You can list the active account name with this command:
      gcloud auth list

You can list the project ID with this command:
      gcloud config list project

Kubernetes services
A service is a grouping of pods that are running on the cluster. Services are "cheap" and you can have many services within the cluster. Kubernetes services can efficiently power a microservice architecture.

Services provide important features that are standardized across the cluster: load-balancing, service discovery between applications, and features to support zero-downtime application deployments.

Each service has a pod label query which defines the pods which will process data for the service. This label query frequently matches pods created by one or more replication controllers. Powerful routing scenarios are possible by updating a service's label query via the Kubernetes API with deployment software.

Why Terraform?
While you could use kubectl or similar CLI-based tools mapped to API calls to manage all Kubernetes resources described in YAML files, orchestration with Terraform presents a few benefits:

One language - You can use the same configuration language to provision the Kubernetes infrastructure and to deploy applications into it.
Drift detection - terraform plan will always present you the difference between reality at a given time and the config you intend to apply.
Full lifecycle management - Terraform doesn't just initially create resources, but offers a single command to create, update, and delete tracked resources without needing to inspect the API to identify those resources.
Synchronous feedback - While asynchronous behavior is often useful, sometimes it's counter-productive as the job of identifying operation results (failures or details of created resource) is left to the user. e.g. you don't have the IP/hostname of the load balancer until it has finished provisioning, hence you can't create any DNS record pointing to it.
Graph of relationships - Terraform understands relationships between resources which may help in scheduling - e.g. Terraform won't try to create a service in a Kubernetes cluster until the cluster exists.