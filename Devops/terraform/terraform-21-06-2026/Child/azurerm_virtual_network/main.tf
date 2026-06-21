resource "azurerm_virtual_network" "vnet" {
  for_each = var.virtual_networks
  name = each.key
  resource_group_name = each.value.resource_group_name
  location = each.value.location
  address_space = each.value.address_space
}