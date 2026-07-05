resource "azurerm_virtual_network" "vnet"{
    for_each = var.vnet
    name = each.value.name
    location            = var.rg_details[each.value.resource_group_name].location
    resource_group_name = var.rg_details[each.value.resource_group_name].name
    address_space = each.value.address_space
}