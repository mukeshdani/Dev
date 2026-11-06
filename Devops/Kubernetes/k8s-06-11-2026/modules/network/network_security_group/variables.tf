variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "security_groups" {
  type = map(object({
    name       = string
    subnet_key = string
    rules = map(object({
      name                       = string
      priority                   = number
      direction                  = string
      access                     = string
      protocol                   = string
      source_port_range          = string
      source_address_prefix      = string
      destination_port_range     = string
      destination_address_prefix = string
    }))
  }))
}
