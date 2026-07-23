

resource "azurerm_public_ip" "pip" {
    for_each = var.pip
    name = each.key
    resource_group_name = data.azurerm_resource_group.rgs[each.key].name
    location = data.azurerm_resource_group.rgs[each.key].location
    allocation_method = each.value.allocation_method
}