rgs = {
  rg1 = {
    name     = "rg1"
    location = "East US"
  }
  rg2 = {
    name     = "rg2"
    location = "West US"
  }
}


vnet = {
  vnet1 = {
    name                = "pmd-vnet1"
    resource_group_name = "rg1"
    address_space       = ["10.1.0.0/16"]
  }
  vnet2 = {
    name                = "pmd-vnet2"
    resource_group_name = "rg2"
    address_space       = ["10.2.0.0/16"]
  }
}

subnet = {
  subnet1 = {
    name                = "pmd-subnet1"
    virtual_network_name = "pmd-vnet1"
    resource_group_name = "rg1"
    address_prefixes    = ["10.1.1.0/24"]
  }
  subnet2 = {
    name                = "pmd-subnet2"
    virtual_network_name = "pmd-vnet2"
    resource_group_name = "rg2"
    address_prefixes    = ["10.2.1.0/24"]
  }
}