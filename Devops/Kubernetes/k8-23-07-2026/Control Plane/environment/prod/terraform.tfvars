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
    default_node_pool_vm_size    = "Standard_D2s_v5"
    identity_type                = "SystemAssigned"

  }
}