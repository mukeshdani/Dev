resource "azurerm_resource_group" "resources" {
  for_each = toset(var.resource_group_names)
  name     = each.key
  location = var.location 
}