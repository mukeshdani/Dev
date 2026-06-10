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
subnets = {
  subnet1 = {
    name                 = "subnet-terraform-01"
    resource_group_name  = "rg-terraform-01"
    virtual_network_name = "vnet-terraform-01"
    address_prefixes     = ["10.9.0.0/24"]
  }
  subnet2 = {
    name                 = "subnet-terraform-02"
    resource_group_name  = "rg-terraform-01"
    virtual_network_name = "vnet-terraform-01"
    address_prefixes     = ["10.9.1.0/24"]
  }
}
network_interfaces = {
  nic1 = {
    name                = "nic-terraform-01"
    location            = "eastus"
    resource_group_name = "rg-terraform-01"
    subnet_name         = "subnet-terraform-01"
    ip_configuration = [{
      name                          = "ipconfig1"
      private_ip_address_allocation = "Dynamic"
    }]
    tags = {
      environment = "dev"
      project     = "terraform"
      owner       = "Mukesh Dani"
    }
  }
  nic2 = {
    name                = "nic-terraform-02"
    location            = "eastus"
    resource_group_name = "rg-terraform-01"
    subnet_name         = "subnet-terraform-01"
    ip_configuration = [{
      name                          = "ipconfig2"
      private_ip_address_allocation = "Dynamic"
    }]
    tags = {
      environment = "dev"
      project     = "terraform"
      owner       = "Mukesh Dani"
    }
  }
}