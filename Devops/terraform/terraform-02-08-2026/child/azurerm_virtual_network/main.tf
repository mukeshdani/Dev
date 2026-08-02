data "azurerm_resource_group" "rg"{
  for_each = var.vnet_name
  name = each.value.resource_group_name
}


resource "azurerm_virtual_network" "vnet" {
  for_each            = var.vnet_name
  name                = each.value.name
  resource_group_name = each.value.resource_group_name
  location            = data.azurerm_resource_group.rg[each.key].location
  address_space       = each.value.address_space
}