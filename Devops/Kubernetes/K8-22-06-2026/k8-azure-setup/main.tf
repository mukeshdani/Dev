resource "azurerm_resource_group" "rgs" {
    for_each = var.resource_groups
    name = each.key
    location = each.value.location
    tags = each.value.tags
}

resource "azurerm_kubernetes_cluster" "k8s" {
  for_each = var.kubernetes_cluster_config
  name = each.key
  location = each.value.location
  resource_group_name = each.value.resource_group_name
  dns_prefix          = each.value.dns_prefix
  
  default_node_pool {
    name       = each.value.default_node_pool.name
    node_count = each.value.default_node_pool.node_count
    vm_size    = each.value.default_node_pool.vm_size
  }
  
  identity {
    type = each.value.identity.type
  }

  depends_on = [ azurerm_resource_group.rgs ]
}