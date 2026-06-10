resource_groups = {
  rgs1 = {
    name     = "rg-terraform-01"
    location = "eastus"
    tags = {
      environment = "dev"
      project     = "terraform"
      owner       = "Mukesh Dani"
    }
  }
}

virtual_networks = {
  vnet1 = {
    name                = "vnet-terraform-01"
    location            = "eastus"
    resource_group_name = "rg-terraform-01"
    address_space       = ["10.9.0.0/16"]
    tags = {
      environment = "dev"
      project     = "terraform"
      owner       = "Mukesh Dani"
    }
  }
  vnet2 = {
    name                = "vnet-terraform-02"
    location            = "eastus"
    resource_group_name = "rg-terraform-01"
    address_space       = ["10.10.0.0/16"]
    tags = {
      environment = "dev"
      project     = "terraform"
      owner       = "Mukesh Dani"
    }
  }
}