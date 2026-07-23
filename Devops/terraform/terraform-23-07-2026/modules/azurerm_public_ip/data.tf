data "azurerm_resource_group" "rgs" {
    for_each = var.pip
    name = "pmd"
}