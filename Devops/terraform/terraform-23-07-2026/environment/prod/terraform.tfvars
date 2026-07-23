rgs = {
  pmd = {
    location = "East US"
  }
}

vnet = {
        pmdvnet = {
            address_space = ["10.0.0.0/16"]
        }
    }

subnet = {
    frontend_subnet = {
        address_prefixes = ["10.0.1.0/24"]
    }
    backend_subnet = {
        address_prefixes = ["10.0.2.0./24"]
    }
}

pip = {
    pmd_pip1 ={
         allocation_method = "Static"
    }
    pmd_pip2 ={
         allocation_method = "Static"
    }
}
nic = {
    pmd_nic1 = {
        virtual_network_name = "pmdvnet"
        subnet_name = "frontend_subnet"
        ip_configuration_name = "internal"
        private_ip_address_allocation = "Dynamic"
    }
    pmd_nic2 = {
        virtual_network_name = "pmdvnet"
        subnet_name = "backend_subnet"
        ip_configuration_name = "internal"
        private_ip_address_allocation = "Dynamic"
    }
}



vm = {
    frontend_vm = {
        vm_size = "Standard_B2s"
        os_disk_name = "frontend_os_disk"
        os_disk_caching = "ReadWrite"
        os_disk_create_option = "FromImage"
        os_disk_managed_disk_type = "Standard_LRS"
        image_publisher = "Canonical"
        image_offer = "UbuntuServer"
        image_sku = "18.04-LTS"
        image_version = "latest"
        computer_name = "frontendvm"
        admin_username = "adminuser"
        admin_password = "P@ssw0rd1234"
        disable_password_authentication = false
    }
}