rgs = {
  pmdkubctl = {
    location = "eastus"
  }
}

k8s = {
  kubeclt_01_prod = {
    rg_name                      = "pmdkubctl"
    dns_prefix                   = "kubectlprod"
    default_node_pool_name       = "pmdnode"
    default_node_pool_node_count = 1
    default_node_pool_vm_size    = "standard_d2s_v7"
    identity_type                = "SystemAssigned"

  }
}