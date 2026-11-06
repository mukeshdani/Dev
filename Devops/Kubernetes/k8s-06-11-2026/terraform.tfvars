resource_group_name = "DigitalPrivateEndPoint"
location            = "East US"
vm_admin_username   = "azureadmin"
vm_name             = "DigitalPEP-VM"
vm_size             = "Standard_B2s"
vm_computer_name    = "digitalpepvm"
vm_private_ip       = "10.0.1.4"
vm_os_disk_type     = "Standard_LRS"
deploy_vm           = false

vm_image = {
  publisher = "MicrosoftWindowsServer"
  offer     = "WindowsServer"
  sku       = "2022-datacenter-azure-edition"
  version   = "latest"
}

storage_account_name            = "digitalpepstorage0611"
key_vault_name                  = "digitalpepkeyvault0611"
key_vault_secret_name           = "vm-admin-password"
blob_private_dns_zone_name      = "privatelink.blob.core.windows.net"
key_vault_private_dns_zone_name = "privatelink.vaultcore.azure.net"

storage_resource_names = {
  private_endpoint   = "DigitalPEP-Storage-Blob-PE"
  private_connection = "DigitalPEP-Storage-Blob-PSC"
  dns_zone_group     = "blob-dns-zone-group"
}

key_vault_resource_names = {
  private_endpoint   = "DigitalPEP-KeyVault-PE"
  private_connection = "DigitalPEP-KeyVault-PSC"
  dns_zone_group     = "key-vault-dns-zone-group"
}

blob_vnet_links = {
  vm = {
    name     = "vm-vnet-blob-dns-link"
    vnet_key = "vm"
  }
  private_endpoint = {
    name     = "private-endpoint-vnet-blob-dns-link"
    vnet_key = "private_endpoint"
  }
}

key_vault_vnet_links = {
  vm = {
    name     = "vm-vnet-key-vault-dns-link"
    vnet_key = "vm"
  }
  private_endpoint = {
    name     = "private-endpoint-vnet-key-vault-dns-link"
    vnet_key = "private_endpoint"
  }
}

network_vnets = {
  vm = {
    name          = "DigitalPEP-VM-VNet"
    address_space = ["10.0.0.0/16"]
  }
  private_endpoint = {
    name          = "DigitalPEP-PrivateEndpoint-VNet"
    address_space = ["10.1.0.0/16"]
  }
}

network_subnets = {
  vm = {
    name                              = "vm-subnet"
    vnet_key                          = "vm"
    address_prefixes                  = ["10.0.1.0/24"]
    private_endpoint_network_policies = null
  }
  private_endpoint = {
    name                              = "private-endpoint-subnet"
    vnet_key                          = "private_endpoint"
    address_prefixes                  = ["10.1.1.0/24"]
    private_endpoint_network_policies = "Enabled"
  }
  key_vault = {
    name                              = "key-vault-private-endpoint-subnet"
    vnet_key                          = "private_endpoint"
    address_prefixes                  = ["10.1.2.0/24"]
    private_endpoint_network_policies = "Enabled"
  }
}

network_peerings = {
  vm_to_private_endpoint = {
    name        = "vm-to-private-endpoint"
    source_vnet = "vm"
    target_vnet = "private_endpoint"
  }
  private_endpoint_to_vm = {
    name        = "private-endpoint-to-vm"
    source_vnet = "private_endpoint"
    target_vnet = "vm"
  }
}

network_security_groups = {
  storage_private_endpoint = {
    name       = "DigitalPEP-PrivateEndpoint-NSG"
    subnet_key = "private_endpoint"
    rules = {
      allow_blob_from_vm = {
        name                       = "Allow-Blob-HTTPS-From-VM"
        priority                   = 100
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        source_address_prefix      = "10.0.1.4/32"
        destination_port_range     = "443"
        destination_address_prefix = "*"
      }
      deny_other_inbound = {
        name                       = "Deny-Other-Inbound"
        priority                   = 200
        direction                  = "Inbound"
        access                     = "Deny"
        protocol                   = "*"
        source_port_range          = "*"
        source_address_prefix      = "*"
        destination_port_range     = "*"
        destination_address_prefix = "*"
      }
    }
  }
  key_vault_private_endpoint = {
    name       = "DigitalPEP-KeyVault-NSG"
    subnet_key = "key_vault"
    rules = {
      allow_vm_https = {
        name                       = "Allow-VM-HTTPS"
        priority                   = 100
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        source_address_prefix      = "10.0.1.4/32"
        destination_port_range     = "443"
        destination_address_prefix = "*"
      }
      allow_terraform_runner_https = {
        name                       = "Allow-Terraform-Runner-HTTPS"
        priority                   = 110
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        source_address_prefix      = "10.0.0.0/16"
        destination_port_range     = "443"
        destination_address_prefix = "*"
      }
      deny_other_inbound = {
        name                       = "Deny-Other-Inbound"
        priority                   = 200
        direction                  = "Inbound"
        access                     = "Deny"
        protocol                   = "*"
        source_port_range          = "*"
        source_address_prefix      = "*"
        destination_port_range     = "*"
        destination_address_prefix = "*"
      }
    }
  }
}