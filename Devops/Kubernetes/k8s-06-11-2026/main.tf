terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "5.13.0"
    }
  }
}

provider "azurerm" {
  features {}
}

data "azurerm_client_config" "current" {}

module "resource_group" {
  source = "./modules/resource_group"

  resource_groups = {
    main = {
      name     = var.resource_group_name
      location = var.location
    }
  }
}

module "virtual_network" {
  source = "./modules/network/virtual_network"

  resource_group_name = module.resource_group.name["main"]
  location            = module.resource_group.location["main"]
  vnets               = var.network_vnets
}

module "subnet" {
  source = "./modules/network/subnet"

  resource_group_name = module.resource_group.name["main"]
  vnets               = var.network_vnets
  subnets             = var.network_subnets
  depends_on          = [module.virtual_network]
}

module "vnet_peering" {
  source = "./modules/network/vnet_peering"

  resource_group_name = module.resource_group.name["main"]
  vnets               = var.network_vnets
  vnet_ids            = module.virtual_network.ids
  peerings            = var.network_peerings
  depends_on          = [module.virtual_network]
}

module "network_security_group" {
  source = "./modules/network/network_security_group"

  resource_group_name = module.resource_group.name["main"]
  location            = module.resource_group.location["main"]
  security_groups     = var.network_security_groups
}

module "subnet_nsg_association" {
  source = "./modules/network/subnet_nsg_association"

  subnet_ids      = module.subnet.ids
  nsg_ids         = module.network_security_group.ids
  security_groups = var.network_security_groups
}

module "key_vault" {
  source = "./modules/key_vault/key_vault"

  vaults = {
    main = {
      name                = var.key_vault_name
      location            = module.resource_group.location["main"]
      resource_group_name = module.resource_group.name["main"]
      tenant_id           = data.azurerm_client_config.current.tenant_id
    }
  }
}

locals {
  private_dns_zones = merge(
    {
      key_vault = {
        name                = var.key_vault_private_dns_zone_name
        resource_group_name = module.resource_group.name["main"]
      }
    },
    var.deploy_vm ? {
      blob = {
        name                = var.blob_private_dns_zone_name
        resource_group_name = module.resource_group.name["main"]
      }
    } : {}
  )

  private_dns_links = merge(
    {
      for key, link in var.key_vault_vnet_links : "key_vault_${key}" => {
        name               = link.name
        zone_key           = "key_vault"
        virtual_network_id = module.virtual_network.ids[link.vnet_key]
      }
    },
    var.deploy_vm ? {
      for key, link in var.blob_vnet_links : "blob_${key}" => {
        name               = link.name
        zone_key           = "blob"
        virtual_network_id = module.virtual_network.ids[link.vnet_key]
      }
    } : {}
  )

  private_endpoints = merge(
    {
      key_vault = {
        name                = var.key_vault_resource_names.private_endpoint
        connection_name     = var.key_vault_resource_names.private_connection
        dns_zone_group_name = var.key_vault_resource_names.dns_zone_group
        location            = module.resource_group.location["main"]
        resource_group_name = module.resource_group.name["main"]
        subnet_id           = module.subnet.ids["key_vault"]
        target_resource_id  = module.key_vault.id["main"]
        subresource_name    = "vault"
        dns_zone_key        = "key_vault"
      }
    },
    var.deploy_vm ? {
      blob = {
        name                = var.storage_resource_names.private_endpoint
        connection_name     = var.storage_resource_names.private_connection
        dns_zone_group_name = var.storage_resource_names.dns_zone_group
        location            = module.resource_group.location["main"]
        resource_group_name = module.resource_group.name["main"]
        subnet_id           = module.subnet.ids["private_endpoint"]
        target_resource_id  = module.storage_account.id["storage"]
        subresource_name    = "blob"
        dns_zone_key        = "blob"
      }
    } : {}
  )

  network_interfaces = var.deploy_vm ? {
    vm = {
      name                = "${var.vm_name}-NIC"
      location            = module.resource_group.location["main"]
      resource_group_name = module.resource_group.name["main"]
      subnet_id           = module.subnet.ids["vm"]
      private_ip          = var.vm_private_ip
    }
  } : {}

  virtual_machines = var.deploy_vm ? {
    vm = {
      name                 = var.vm_name
      computer_name        = var.vm_computer_name
      size                 = var.vm_size
      location             = module.resource_group.location["main"]
      resource_group_name  = module.resource_group.name["main"]
      network_interface_id = module.network_interface.id["vm"]
      admin_username       = var.vm_admin_username
      image                = var.vm_image
      os_disk_type         = var.vm_os_disk_type
    }
  } : {}

  storage_accounts = var.deploy_vm ? {
    storage = {
      name                = var.storage_account_name
      location            = module.resource_group.location["main"]
      resource_group_name = module.resource_group.name["main"]
    }
  } : {}
}

module "private_dns_zones" {
  source = "./modules/shared/private_dns_zone"

  zones = local.private_dns_zones
}

module "private_dns_links" {
  source = "./modules/shared/dns_link"

  links                = local.private_dns_links
  private_dns_zone_ids = module.private_dns_zones.ids
}

module "private_endpoints" {
  source = "./modules/shared/private_endpoint"

  endpoints = {
    for key, endpoint in local.private_endpoints : key => {
      name                = endpoint.name
      connection_name     = endpoint.connection_name
      dns_zone_group_name = endpoint.dns_zone_group_name
      location            = endpoint.location
      resource_group_name = endpoint.resource_group_name
      subnet_id           = endpoint.subnet_id
      target_resource_id  = endpoint.target_resource_id
      subresource_name    = endpoint.subresource_name
      private_dns_zone_id = module.private_dns_zones.ids[endpoint.dns_zone_key]
    }
  }

  depends_on = [module.subnet_nsg_association]
}

module "key_vault_role_assignment" {
  source = "./modules/shared/role_assignment"

  assignments = {
    key_vault_terraform = {
      scope_id             = module.key_vault.id["main"]
      role_definition_name = "Key Vault Secrets Officer"
      principal_id         = data.azurerm_client_config.current.object_id
    }
  }
}

data "azurerm_key_vault_secret" "vm_admin_password" {
  for_each = var.deploy_vm ? { vm = true } : {}

  name         = var.key_vault_secret_name
  key_vault_id = module.key_vault.id["main"]
  depends_on   = [module.private_endpoints, module.key_vault_role_assignment]
}

module "network_interface" {
  source = "./modules/compute/network_interface"

  interfaces = local.network_interfaces
}

module "virtual_machine" {
  source = "./modules/compute/virtual_machine"

  virtual_machines = local.virtual_machines
  admin_passwords = {
    for key, secret in data.azurerm_key_vault_secret.vm_admin_password : key => secret.value
  }
}

module "storage_account" {
  source = "./modules/storage/storage_account"

  accounts = local.storage_accounts
}

module "storage_role_assignment" {
  source = "./modules/shared/role_assignment"

  assignments = var.deploy_vm ? {
    storage_blob_vm = {
      scope_id             = module.storage_account.id["storage"]
      role_definition_name = "Storage Blob Data Contributor"
      principal_id         = module.virtual_machine.principal_id["vm"]
      principal_type       = "ServicePrincipal"
    }
  } : {}
}
