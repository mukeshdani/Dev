module "resource_group" {
  source = "../child/azurerm_resource_group"
  rgs = var.rgs
}

module "virtual_network"{
    depends_on = [module.resource_group]
    source = "../child/azurerm_virtual_network"
    vnet_name = var.vnet
}

module "subnet"{
    depends_on = [module.virtual_network]
    source = "../child/azurerm_subnet"
    subnet_name = var.subnet
}