resource_groups  = {
    rg1 = {
        name = "rg-app-prod-eastus"
        location = "East US"
        tags = { Environment = "Production", Owner = "Dani-Team" }
    }
}

virtual_networks = {
  vnet1 = {
    rg_key        = "rg1"
    name          = "frontend-vnet-prod"
    location      = "East US"
    address_space = ["10.9.0.0/16"]
    tags          = { Environment = "Production", Owner = "Dani-Team" }
  }
  vnet2 = {
    rg_key        = "rg1"
    name          = "backend-vnet-prod"
    location      = "East US"
    address_space = ["10.10.0.0/16"]
    tags          = { Environment = "Production", Owner = "Dani-Team" }
  }
}

subnets = {
  subnet1 = {
    rg_name  = "rg-app-prod-eastus"
    vnet_name = "frontend-vnet-prod"
    name    = "frontend-subnet-prod"
    address_prefixes = ["10.9.1.0/24"]
    tags          = { Environment = "Production", Owner = "Dani-Team" }
  }
  subnet2 = {
    rg_name  = "rg-app-prod-eastus"
    vnet_name = "frontend-vnet-prod"
    name    = "backend-subnet-prod"
    address_prefixes = ["10.9.2.0/24"]
    tags          = { Environment = "Production", Owner = "Dani-Team" }
  }   
  subnet3 = {
    rg_name  = "rg-app-prod-eastus"
    vnet_name = "backend-vnet-prod"
    name    = "database-subnet-prod"
    address_prefixes = ["10.10.1.0/24"]
    tags          = { Environment = "Production", Owner = "Dani-Team" }
  }   
}

network_interfaces = {
  nic1 = {
    rg_name  = "rg-app-prod-eastus"
    vnet_name = "frontend-vnet-prod"
    name    = "frontend-nic-prod"
    location = "East US"
    subnet_name = "frontend-subnet-prod"
    ip_configuration = {
      name                          = "internal"
      private_ip_address_allocation = "Dynamic"
    }
    tags          = { Environment = "Production", Owner = "Dani-Team" }
  }
}
