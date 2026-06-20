resource "azurerm_resource_group" "k8_rg_group" {
  for_each = var.resource_group_names
  name     = each.key
  location = each.value.location
  tags = each.value.tags
}

resource "azurerm_kubernetes_cluster" "mkd_k8_revision" {
  for_each = var.variable_kubernetes
  name = each.value.name
  location = each.value.location
  resource_group_name = each.value.resource_group_name
  dns_prefix          = "mukeshhdns"
  default_node_pool {
    name = each.value.default_node_pool.name
    node_count = each.value.default_node_pool.node_count
    vm_size = each.value.default_node_pool.vm_size
  }

  identity {
    type = each.value.identity.type
  }

  tags = each.value.tags

  depends_on = [ azurerm_resource_group.k8_rg_group ]

}