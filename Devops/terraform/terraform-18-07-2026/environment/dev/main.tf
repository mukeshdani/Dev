module "resource_group" {
    source = "../../module/azurerm_resource_group"
    rgs = var.resource_name
}