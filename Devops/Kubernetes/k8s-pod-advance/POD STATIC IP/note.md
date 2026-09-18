## Important Note: Production Warning & Cluster Support## Why this configuration might fail
It is critical to note that if you are using a standard Kubernetes cluster (without Calico or a supported CNI), this IP annotation will not work. Depending on your setup, Kubernetes will either completely ignore the annotation or throw a configuration error.

## Production Best Practices
Because of these platform limitations, targeting direct Pod IPs is highly discouraged in production environments. Instead, the industry-standard approach relies on:

* Services: To provide stable networking and load balancing.
* StatefulSets: To maintain persistent network identities for stateful workloads.

However, advanced networking solutions like Calico natively support this annotation-based static IP assignment, making it a viable option for specialized use cases.

