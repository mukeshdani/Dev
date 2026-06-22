variable "resource_groups" {
  type = map(object({
    location = string
    tags     = map(string)
  }))
}

variable "kubernetes_cluster_config" {
  type = map(object({
    location            = string
    resource_group_name = string
    dns_prefix          = string
    default_node_pool = object({
      name       = string
      node_count = number
      vm_size    = string
    })
    identity = object({
      type = string
    })
  }))
}
