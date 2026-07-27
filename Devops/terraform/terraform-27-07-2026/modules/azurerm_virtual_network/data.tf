data "azurerm_resource_group" "rgs" {
    for_each = var.vnet
    name = "pmd"
}