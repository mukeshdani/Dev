variable "resource_groups" {
  type = map(object({
    name     = string
    location = string
    tags     = map(string)
  }))
  description = "Map of resource groups to create"
}

variable "virtual_networks" {
  type = map(any)
  description = "Map of virtual networks to create"
}


variable "subnets" {
  type = map(any)
  description = "Map of subnets to create"
}

variable "network_interfaces" {
  type = map(any)
  description = "Map of network interfaces to create"
}