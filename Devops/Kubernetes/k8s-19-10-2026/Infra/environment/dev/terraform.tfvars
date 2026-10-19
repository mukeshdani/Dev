rgs = {
  "rg1" = {
    name = "rg-dev-app"
    location = "East US"
    tags = {
      environment = "dev"
      managed_by  = "mueksh"
      owner      = "mueksh"
    }
  }
}

vnets = {
  "vnet1" = {
    name                = "vnet-dev-app"
    location            = "East US"
    resource_group_name = "rg-dev-app"
    address_space       = ["10.0.0.0/16"]
  }
}

subnets = {
  "subnet1" = {
    name                 = "subnet-dev-app"
    location             = "East US"
    resource_group_name  = "rg-dev-app"
    virtual_network_name = "vnet-dev-app"
    address_prefixes     = ["10.0.1.0/24"]
  }
  "subnet2" = {
    name                 = "AzureBastionSubnet"
    location             = "West Europe"
    resource_group_name  = "rg-dev-app"
    virtual_network_name = "vnet-dev-app"
    address_prefixes     = ["10.0.2.0/24"]
  }
}

nics = {
  "nic1" = {
    name                 = "nic-dev-app"
    location             = "East US"
    resource_group_name  = "rg-dev-app"
    virtual_network_name = "vnet-dev-app"
    subnet_name          = "subnet-dev-app"
  }
}

public_ips = {
  "pip1" = {
    name                = "pip-dev-app"
    location            = "East US"
    resource_group_name = "rg-dev-app"
  }
}

bastions = {
  "bastion1" = {
    name                 = "bastion-dev-app"
    location             = "East US 2"
    resource_group_name  = "rg-dev-app"
    virtual_network_name = "vnet-dev-app"
    subnet_name          = "AzureBastionSubnet"
    public_ip_name       = "pip-dev-app"
  }
}

keyvaults = {
  "kv1" = {
    name                = "kv-dev-app-mkd-9826"
    location            = "East US"
    resource_group_name = "rg-dev-app"
  }
}

vms = {
  "vm1" = {
    name                = "vm-dev-app"
    location            = "East US"
    resource_group_name = "rg-dev-app"
    size                = "Standard_B2s"
    nic_name            = "nic-dev-app"
    keyvault_name       = "kv-dev-app-mkd-9826"
  }
}

acrs = {
  "acr1" = {
    name                = "acrdevappmkd9826"
    resource_group_name = "rg-dev-app"
    location            = "East US"
    sku                 = "Basic"
  }
}

aks = {
  "mkd_aks" = {
    name                = "aks-dev-app"
    location            = "East US"
    resource_group_name = "rg-dev-app"
    dns_prefix          = "aks-dev-app"
  }
}