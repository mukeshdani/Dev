rgs = {
  pmdkubctl = {
    location = "centralindia"
  }
}

k8s = {
  kubeclt_01_prod = {
    rg_name                      = "pmdkubctl"
    dns_prefix                   = "kubectlprod"
    default_node_pool_name       = "pmdnode"
    default_node_pool_node_count = 1
    default_node_pool_vm_size    = "Standard_B2ats_v2"
    identity_type                = "SystemAssigned"

  }
}