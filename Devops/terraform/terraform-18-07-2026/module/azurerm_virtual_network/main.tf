variable "vnets"{
    type = any
}

resource "azurerm_virtual_network" "vnet"{
    for_each = var.vnets
    name = each.value.name
    location = data.azurerm_resource_group.rgs[each.value.resource_group_name]
    resource_group_name = 
    address_space =
}