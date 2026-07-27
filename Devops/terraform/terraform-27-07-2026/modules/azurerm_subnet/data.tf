data "azurerm_resource_group" "rgs" {
    for_each = var.subnet
    name = "pmd"
}
data "azurerm_virtual_network" "vnet" {
    for_each = var.subnet
    name = "pmdvnet"
    resource_group_name = data.azurerm_resource_group.rgs[each.key].name
}
