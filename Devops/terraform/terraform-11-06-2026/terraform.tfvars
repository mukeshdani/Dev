resource_groups = {
  rgs1 = {
    name     = "mukeshdanirg"
    location = "centralindia"
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
    location            = "centralindia"
    resource_group_name = "mukeshdanirg"
    address_space       = ["10.9.0.0/16"]
    tags = {
      environment = "dev"
      project     = "terraform"
      owner       = "Mukesh Dani"
    }
  }
  vnet2 = {
    name                = "vnet-terraform-02"
    location            = "centralindia"
    resource_group_name = "mukeshdanirg"
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
    resource_group_name  = "mukeshdanirg"
    virtual_network_name = "vnet-terraform-01"
    address_prefixes     = ["10.9.0.0/24"]
  }
  subnet2 = {
    name                 = "subnet-terraform-02"
    resource_group_name  = "mukeshdanirg"
    virtual_network_name = "vnet-terraform-01"
    address_prefixes     = ["10.9.1.0/24"]
  }
}
network_interfaces = {
  nic1 = {
    name                = "nic-terraform-01"
    location            = "centralindia"
    resource_group_name = "mukeshdanirg"
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
    location            = "centralindia"
    resource_group_name = "mukeshdanirg"
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
nsgs = {
  nsg1 = {
    name                = "nsg-terraform-01"
    location            = "centralindia"
    resource_group_name = "mukeshdanirg"
  }
  nsg2 = {
    name                = "nsg-terraform-02"
    location            = "centralindia"
    resource_group_name = "mukeshdanirg"
  }
}
virtual_machine_configuration ={
  vm1 = {
    name                = "winjumpvm"
    location            = "centralindia"
    resource_group_name = "mukeshdanirg"
    network_interface_name = "nic-terraform-01"
    vm_size               = "Standard_D2s_v3"
    storage_image_reference = {
      publisher = "MicrosoftWindowsServer"
      offer     = "WindowsServer"
      sku       = "2022-datacenter"
      version   = "latest"
    }
    storage_os_disk = {
      name              = "win-osdisk"
      caching           = "ReadWrite"
      create_option     = "FromImage"
      managed_disk_type = "Standard_LRS"
    }
    os_profile = {
      computer_name  = "mukeshdani"
      admin_username = "dani"
      admin_password = "Password1234!"
    }
    os_profile_windows_config = {
      provision_vm_agent        = true
      enable_automatic_upgrades = true
    }
    tags = {
      environment = "dev"
      project     = "terraform"
      owner       = "Mukesh Dani"
    }
  }
}