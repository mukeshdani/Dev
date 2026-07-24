data "azurerm_resource_group" "rgs" {
    for_each = var.k8s
     name = each.value.rg_name
}

resource "azurerm_kubernetes_cluster" "k8s" {
  for_each = var.k8s
  name                = each.key
  location            = data.azurerm_resource_group.rgs[each.key].location
  resource_group_name = data.azurerm_resource_group.rgs[each.key].name
  dns_prefix          = each.value.dns_prefix

  default_node_pool {
    name       = each.value.default_node_pool_name
    node_count = each.value.default_node_pool_node_count
    vm_size    = each.value.default_node_pool_vm_size
  }

  identity {
    type = each.value.identity_type
  }
}