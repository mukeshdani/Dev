module "prod_resource_group" {
  source = "../Child/azurerm_resource_group"
  resource_groups = var.resource_groups
}

module "prod_virtual_network" {
  source = "../Child/azurerm_virtual_network"
  virtual_networks = var.virtual_networks
  depends_on = [ module.prod_resource_group ]
}

module "prod_subnet" {
  source = "../Child/azurerm_subnet"
  subnets = var.subnets
  depends_on = [ module.prod_virtual_network ]
}

module "prod_nsgs" {
  source = "../Child/azurerm_network_secuirty_group"
  network_security_groups = var.network_security_groups

  depends_on = [ module.prod_virtual_network ]
}