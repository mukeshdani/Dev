data "azurerm_resource_group" "rgs" {
    for_each = var.vnet
    name = "pmd"
}

resource "azurerm_virtual_network" "vnet"{
    for_each = var.vnet
    name = each.key
    resource_group_name = data.azurerm_resource_group.rgs.name
    location = data.azurerm_resource_group.rgs.location
    address_space = each.value.address_space
}