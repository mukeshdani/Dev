resource "azurerm_virtual_network" "main" {
  for_each = var.vnets

  name                = each.value.name
  address_space       = each.value.address_space
  location            = var.location
  resource_group_name = var.resource_group_name
}
