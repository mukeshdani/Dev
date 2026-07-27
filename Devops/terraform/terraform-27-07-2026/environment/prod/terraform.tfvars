rgs = {
  pmd = {
    location = "westus3"
  }
}

vnet = {
        pmdvnet = {
            address_space = ["10.1.0.0/16"]
        }
    }

subnet = {
    frontend_subnet = {
        address_prefixes = ["10.1.1.0/24"]
    }
    backend_subnet = {
        address_prefixes = ["10.1.2.0/24"]
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
        RG_name = "pmd"
        nic_name = "pmd_nic1" 
        vm_size = "Standard_D8s_v5"
        os_disk_name = "frontend_os_disk"
        os_disk_caching = "ReadWrite"
        os_disk_create_option = "FromImage"
        os_disk_managed_disk_type = "Standard_LRS"
        image_publisher = "Canonical"
        image_offer = "UbuntuServer"
        image_sku = "18.04-LTS"
        image_version = "latest"
        computer_name = "frontendvm"
        disable_password_authentication = false
        key_vault_name = "azurekeyvalut01"
    }
}

azurekeyvalut = {
    azurekeyvalut01 = {
        rg_name = "pmd"
        rbac_authorization_enabled = false
        enabled_for_disk_encryption = true
        soft_delete_retention_days = 7
        purge_protection_enabled = false
        sku_name = "standard"
    }
}