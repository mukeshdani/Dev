
resource "azurerm_subnet" "subnet" {
    for_each = var.subnet
    name = each.key
    resource_group_name = data.azurerm_resource_group.rgs[each.key].name
    virtual_network_name = data.azurerm_virtual_network.vnet[each.key].name
    address_prefixes = each.value.address_prefixes
}