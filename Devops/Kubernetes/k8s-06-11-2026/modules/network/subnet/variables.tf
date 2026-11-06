variable "resource_group_name" {
  type = string
}

variable "vnets" {
  type = map(object({
    name          = string
    address_space = list(string)
  }))
}

variable "subnets" {
  type = map(object({
    name                              = string
    vnet_key                          = string
    address_prefixes                  = list(string)
    private_endpoint_network_policies = optional(string)
  }))
}
