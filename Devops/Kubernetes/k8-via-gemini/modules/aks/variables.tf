variable "cluster_name" {
  type = string
}

variable "location" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "dns_prefix" {
  type = string
}

variable "kubernetes_version" {
  type    = string
  default = null
}

variable "default_node_pool" {
  type = object({
    name                = string
    node_count          = number
    vm_size             = string
    enable_auto_scaling = bool
    min_count           = number
    max_count           = number
  })
}

variable "additional_node_pools" {
  type = map(object({
    node_count          = number
    vm_size             = string
    enable_auto_scaling = bool
    min_count           = number
    max_count           = number
  }))
  default = {}
}

variable "vnet_subnet_id" {
  type    = string
  default = null
}

variable "network_plugin" {
  type    = string
  default = "azure"
}

variable "tags" {
  type    = map(string)
  default = {}
}
