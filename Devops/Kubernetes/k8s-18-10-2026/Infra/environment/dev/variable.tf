variable "rgs" {
  type = map(object({
    name        = string
    location    = string
    environment = optional(string)
    managed_by  = optional(string)
  }))

  # Validation 1: Location Check
  validation {
    condition = alltrue([
      for rg in values(var.rgs) : contains(["East US", "West Europe", "Southeast Asia"], rg.location)
    ])
    error_message = "Location must be either 'East US', 'West Europe', or 'Southeast Asia'."
  }

  # Validation 2: Name prefix check ('rg-')
  validation {
    condition = alltrue([
      for rg in values(var.rgs) : startswith(lower(rg.name), "rg-")
    ])
    error_message = "Resource Group name must start with 'rg-'."
  }
}

variable "vnets" {
  type = map(object({
    name                = string
    location            = string
    resource_group_name = string
    address_space       = list(string)
  }))
}

variable "subnets" {
  type = map(object({
    name                 = string
    location             = string
    resource_group_name  = string
    virtual_network_name = string
    address_prefixes     = list(string)
  }))
}

variable "nics" {
  type = map(object({
    name                 = string
    location             = string
    resource_group_name  = string
    virtual_network_name = string
    subnet_name          = string
  }))
}

variable "bastions" {
  type = map(object({
    name                 = string
    location             = string
    resource_group_name  = string
    virtual_network_name = string
    subnet_name          = string
    public_ip_name       = string
  }))
}

variable "public_ips" {
  type = map(object({
    name                = string
    location            = string
    resource_group_name = string
  }))
}

variable "keyvaults" {
  type = map(object({
    name                = string
    location            = string
    resource_group_name = string
  }))
}

variable "vms" {
  type = map(object({
    name                = string
    location            = string
    resource_group_name = string
    size                = string
    nic_name            = string
    keyvault_name       = string
  }))
}