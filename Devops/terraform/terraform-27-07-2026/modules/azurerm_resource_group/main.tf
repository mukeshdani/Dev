resource "azurerm_resource_group" "rgs" {
    for_each = var.rgs
    name = each.key
    location = each.value.location
}