resource "azurerm_subnet" "main" {
  for_each = var.subnets

  name                 = each.value.name
  resource_group_name  = var.resource_group_name
  virtual_network_name = var.vnets[each.value.vnet_key].name
  address_prefixes     = each.value.address_prefixes

  private_endpoint_network_policies = each.value.private_endpoint_network_policies
}
