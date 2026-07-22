data "azurerm_resource_group" "rgs" {
    for_each = var.pip
    name = "pmd"
}

resource "azurerm_public_ip" "pip" {
    for_each = var.pip
    name = each.key
    resource_group_name = data.azurerm_resource_group.rgs.name
    location = data.azurerm_resource_group.rgs.location
    allocation_method = each.value.allocation_method
}