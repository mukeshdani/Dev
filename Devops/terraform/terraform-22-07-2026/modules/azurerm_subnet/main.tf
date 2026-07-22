data "azurerm_resource_group" "rgs" {
    for_each = var.subnet
    name = "pmd"
}
data "azurerm_virtual_network" "vnet" {
    for_each = var.subnet
    name = "pmdvnet"
    resource_group_name = data.azurerm_resource_group.rgs.name
}

resource "azurerm_subnet" "subnet" {
    for_each = var.subnet
    name = each.key
    resource_group_name = data.azurerm_resource_group.rgs.name
    virtual_network_name = data.azurerm_virtual_network.vnet.name
    address_prefixes = each.value.address_prefixes
}