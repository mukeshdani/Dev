resource "azurerm_virtual_network" "vnets" {
    for_each = var.virtual_networks
    resource_group_name = var.resource_groups_output.name[each.value.rg_key]
    location            = each.value.location
    name                = each.value.name
    address_space       = each.value.address_space
    tags                = each.value.tags
}