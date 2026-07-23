data "azurerm_resource_group" "rgs" {
    for_each = var.vm
    name = "pmd"
}

data "azurerm_network_interface" "nic" {
    for_each = var.vm
    name = each.value.nic_name
    resource_group_name = data.azurerm_resource_group.rgs[each.key].name
}