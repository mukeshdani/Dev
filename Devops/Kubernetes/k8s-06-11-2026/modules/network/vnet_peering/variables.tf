variable "resource_group_name" {
  type = string
}

variable "vnets" {
  type = map(object({
    name          = string
    address_space = list(string)
  }))
}

variable "vnet_ids" {
  type = map(string)
}

variable "peerings" {
  type = map(object({
    name        = string
    source_vnet = string
    target_vnet = string
  }))
}
