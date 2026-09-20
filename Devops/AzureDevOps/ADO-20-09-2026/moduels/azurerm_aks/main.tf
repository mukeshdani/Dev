resource "azurerm_kubernetes_cluster" "aks" {
  for_each            = var.aks
  name = each.value.name
  location            = each.value.location
  resource_group_name = each.value.resource_group_name
  dns_prefix          = each.value.dns_prefix
  default_node_pool {
    name       = each.value.def_name
    node_count = each.value.def_node_count
    vm_size    = each.value.def_vm_size
  }
  node_provisioning_profile {
    mode = "Manual"
  }
  identity {
    type = "SystemAssigned"
  }
  
}