resource_groups = {
    pmd_rgs = {
        location = "centralindia"
        tags = {
            env = "prod"
            managed_by = "terraform"
            bu = "pmd"
            owner = "mukesh dani"
        }
    }
}

kubernetes_cluster_config = {
    kubernetes_cluster_config_01 = {
        location = "centralindia"
        resource_group_name = "pmd_rgs"
        dns_prefix = "pmd-dns"
        default_node_pool  = {
            name       = "pmdgroup"
            node_count = 1
            vm_size    = "Standard_D2s_v3"
        }
         identity = {
            type = "SystemAssigned"
        }
    }
}