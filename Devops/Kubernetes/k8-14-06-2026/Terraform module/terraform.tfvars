resource_group_names = {
    mukesh-rg-k9 = {
        name = "mukesh-rg-k9"
        location = "centralindia"
        tags = {
            env = "dev"
            module = "k8"
            managed_by = "Mukesh Dani"
        } 
    }
}


variable_kubernetes = {
    kub1 = {
        name = "kubernetes"
        location = "centralindia"
        resource_group_name = "mukesh-rg-k9"
        default_node_pool = {
            name = "mukesh"
            node_count = 1
            vm_size = "Standard_DS2_v2"
        }
        identity = {
            type = "SystemAssigned"
        }
        tags = {
            env = "dev"
            module = "k8"
            managed_by = "Mukesh Dani"
        }
    }
}