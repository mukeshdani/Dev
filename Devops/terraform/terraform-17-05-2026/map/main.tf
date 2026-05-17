resource "azurerm_resource_group" "resource_group" {
  for_each = var.resource_group
  name     = each.value
  location = each.key
}