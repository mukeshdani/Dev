resource "azurerm_virtual_network_peering" "main" {
  for_each = var.peerings

  name                      = each.value.name
  resource_group_name       = var.resource_group_name
  virtual_network_name      = var.vnets[each.value.source_vnet].name
  remote_virtual_network_id = var.vnet_ids[each.value.target_vnet]
}
