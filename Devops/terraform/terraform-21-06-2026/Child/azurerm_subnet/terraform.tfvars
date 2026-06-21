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