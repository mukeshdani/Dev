data "azurerm_resource_group" "rgs" {
    for_each = var.vm
    name = "pmd"
}

data "azurerm_network_interface" "nic" {
    for_each = var.vm
    name = each.value.nic_name
    resource_group_name = data.azurerm_resource_group.rgs.name
}

resource "azurerm_virtual_machine" "vm"{
    for_each = var.vm
    name = each.key
    resource_group_name = data.azurerm_resource_group.rgs.name
    location = data.azurerm_resource_group.rgs.location
    network_interface_ids = data.azurerm_network_interface.nic[each.key].id
    
}