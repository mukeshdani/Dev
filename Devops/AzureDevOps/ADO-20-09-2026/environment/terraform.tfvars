aks_clusters = {
    aks1 = {
        name                = "DigitalAppAks"
        location            = "East US"
        resource_group_name = "digitalrg"
        dns_prefix          = "digitalappaks"
        def_name = "default"
        def_node_count = 1
        def_vm_size = "Standard_D2s_v7"
    }
}

resource_groups = {
    rg1 = {
        name     = "digitalrg"
        location = "East US"
    }
}