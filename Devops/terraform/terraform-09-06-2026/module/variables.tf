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
