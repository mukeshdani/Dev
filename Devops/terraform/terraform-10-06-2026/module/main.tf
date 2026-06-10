module "resource_group_production" {
  source          = "./resource_group"
  resource_groups = var.resource_groups
}

module "virtual_network_production" {
  source           = "./virtual_network"
  virtual_networks = var.virtual_networks
  depends_on       = [module.resource_group_production]
}
module "subnet_production" {
  source     = "./subnet"
  subnets    = var.subnets
  depends_on = [module.virtual_network_production]
}
module "network_interface_production" {
  source             = "./network_interface"
  network_interfaces = var.network_interfaces
  subnets            = module.subnet_production.subnets
  depends_on         = [module.subnet_production]
}