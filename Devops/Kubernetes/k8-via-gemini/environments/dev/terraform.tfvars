project_name = "k8via"
environment  = "dev"
location     = "East US"

additional_node_pools = {
  userpool1 = {
    node_count          = 1
    vm_size             = "Standard_DS2_v2"
    enable_auto_scaling = true
    min_count           = 1
    max_count           = 2
  }
}

tags = {
  Environment = "dev"
  Project     = "k8-via-gemini"
  Owner       = "Mukesh"
}
