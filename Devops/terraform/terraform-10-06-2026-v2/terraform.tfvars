resource_groups = {
    rg1 = {
        name     = "pmd-rg"
        location = "centralindia"
    }
}

virtual_networks = {
    vnet1 = {
        name = "vnet1"
        resource_group_name = "pmd-rg"
        location = "centralindia"
        address_space = ["10.9.0.0/16"]
    }
    vnet2 = {
        name = "vnet2"
        resource_group_name = "pmd-rg"
        location = "centralindia"
        address_space = ["10.10.0.0/16"]
    }
}

subnets = {
    subnet1 = {
        name = "subnet1"
        resource_group_name = "pmd-rg"
        virtual_network_name = "vnet1"
        address_prefixes = ["10.9.1.0/24"]
    }
    subnet2 = {
        name = "subnet2"
        resource_group_name = "pmd-rg"
        virtual_network_name = "vnet1"
        address_prefixes = ["10.9.2.0/24"]
    }
    subnet3 = {
        name = "subnet3"
        resource_group_name = "pmd-rg"
        virtual_network_name = "vnet2"
        address_prefixes = ["10.10.1.0/24"]
    }
}

network_interfaces = {
    nic1 = {
        name = "nic1"
        resource_group_name = "pmd-rg"
        virtual_network_name = "vnet1"
        location = "centralindia"
        subnet_name = "subnet1"
        ip_configuration = {
            name = "internal"
            private_ip_address_allocation = "Dynamic"
        }

    }
    nic2 = {
        name = "nic2"
        resource_group_name = "pmd-rg"
        virtual_network_name = "vnet1"
        location = "centralindia"
        subnet_name = "subnet2"
        ip_configuration = {
            name = "internal"
            private_ip_address_allocation = "Dynamic"
        }

    }
    nic3 = {
        name = "nic3"
        resource_group_name = "pmd-rg"
        virtual_network_name = "vnet2"
        location = "centralindia"
        subnet_name = "subnet3"
        ip_configuration = {
            name = "internal"
            private_ip_address_allocation = "Dynamic"
        }

    }
}

network_security_groups = {
    ngs1 = {
        name = "nsg1"
        resource_group_name = "pmd-rg"
        location = "centralindia"
    }
    ngs2 = {
        name = "nsg2"
        resource_group_name = "pmd-rg"
        location = "centralindia"
    }
    ngs3 = {
        name = "nsg3"
        resource_group_name = "pmd-rg"
        location = "centralindia"
    }
}

virtual_machines ={
    vm1 ={
        name = "vm1"
        resource_group_name = "pmd-rg"
        location = "centralindia"
        network_interface_name = "nic1"
        vm_size = "Standard_B1s"
        storage_image_reference = {
            publisher = "Canonical"
            offer     = "0001-com-ubuntu-server-jammy"
            sku       = "22_04-lts"
            version   = "latest"
        }
        storage_os_disk = {
            name = "osdisk1"
            caching = "ReadWrite"
            create_option = "FromImage"
            managed_disk_type = "Standard_LRS"
        }
        os_profile = {
            computer_name = "Mukesh-VM"
            admin_username = "Dani"
            admin_password = "Password1234!"
        }

        
    }
}