variable "resource_group_name" {
  description = "Name of the resource group."
  type        = string
}

variable "location" {
  description = "Azure region for all resources."
  type        = string
}

variable "vm_name" {
  description = "Name of the Windows virtual machine."
  type        = string
}

variable "vm_size" {
  description = "Azure size of the Windows virtual machine."
  type        = string
}

variable "vm_admin_username" {
  description = "Local administrator username for the Windows VM."
  type        = string
}

variable "vm_private_ip" {
  description = "Static private IP used by the VM and private endpoint firewall rules."
  type        = string
}

variable "network_vnets" {
  description = "Virtual network names and address ranges."
  type = map(object({
    name          = string
    address_space = list(string)
  }))
}

variable "network_subnets" {
  description = "Subnet names, parent VNets, address ranges, and optional private endpoint policies."
  type = map(object({
    name                              = string
    vnet_key                          = string
    address_prefixes                  = list(string)
    private_endpoint_network_policies = optional(string)
  }))
}

variable "network_peerings" {
  description = "Directional VNet peering connections."
  type = map(object({
    name        = string
    source_vnet = string
    target_vnet = string
  }))
}

variable "network_security_groups" {
  description = "Network security groups, subnet associations, and inbound rules."
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

variable "storage_account_name" {
  description = "Globally unique storage account name (3 to 24 lowercase letters or numbers)."
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9]{3,24}$", var.storage_account_name))
    error_message = "The storage account name must contain 3 to 24 lowercase letters or numbers."
  }
}

variable "key_vault_name" {
  description = "Globally unique Key Vault name (3 to 24 letters or numbers)."
  type        = string

  validation {
    condition     = can(regex("^[a-zA-Z0-9]{3,24}$", var.key_vault_name))
    error_message = "The Key Vault name must contain 3 to 24 letters or numbers."
  }
}

variable "key_vault_secret_name" {
  description = "Name of the Key Vault secret containing the Windows VM administrator password."
  type        = string
}

variable "storage_resource_names" {
  description = "Names of Storage private endpoint resources."
  type        = map(string)
}

variable "key_vault_resource_names" {
  description = "Names of Key Vault private endpoint resources."
  type        = map(string)
}

variable "blob_vnet_links" {
  description = "VNets linked to the Blob private DNS zone."
  type = map(object({
    name     = string
    vnet_key = string
  }))
}

variable "key_vault_vnet_links" {
  description = "VNets linked to the Key Vault private DNS zone."
  type = map(object({
    name     = string
    vnet_key = string
  }))
}

variable "blob_private_dns_zone_name" {
  description = "Private DNS zone for Azure Blob Storage private endpoint."
  type        = string
}

variable "key_vault_private_dns_zone_name" {
  description = "Private DNS zone for Azure Key Vault private endpoint."
  type        = string
}

variable "vm_computer_name" {
  description = "Windows computer name (maximum 15 characters)."
  type        = string
}

variable "vm_image" {
  description = "Windows VM image publisher, offer, SKU, and version."
  type = object({
    publisher = string
    offer     = string
    sku       = string
    version   = string
  })
}

variable "vm_os_disk_type" {
  description = "Managed disk type for the VM operating system disk."
  type        = string
}

variable "deploy_vm" {
  description = "Set true after the Key Vault private endpoint is ready and the password secret has been added."
  type        = bool
  default     = false
}
