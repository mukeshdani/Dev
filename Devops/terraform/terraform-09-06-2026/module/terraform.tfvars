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
