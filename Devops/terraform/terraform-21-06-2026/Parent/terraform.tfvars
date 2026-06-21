resource_groups = {
   landing_zone = {
        location = "centralindia"
        tags = {
            env = "prod"
            managed_by = "terraform"
            owner = "Mukesh Dani"
            Department = "IT"
        }
    }
}

virtual_networks = {
    frontendVnet = {
        resource_group_name = "landing_zone"
        location = "centralindia"
        address_space = ["10.0.0.0/16"]
    } 
}

subnets = {
    frontendSubnet01 = {
        resource_group_name = "landing_zone"
        virtual_network_name = "frontendVnet"
        address_prefixes = ["10.0.1.0/24"]
    }
    frontendSubnet02 = {
        resource_group_name = "landing_zone"
        virtual_network_name = "frontendVnet"
        address_prefixes = ["10.0.2.0/24"]
    }
}

network_security_groups = {
    nsg1 = {
    location  = "centralindia"
  resource_group_name = "landing_zone"

  security_rule = {
    
    security_rule_ssh={
    name                       = "SSH"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  },
  security_rule_http = {
    name                       = "HTTP"
    priority                   = 101
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
  }
    }
}