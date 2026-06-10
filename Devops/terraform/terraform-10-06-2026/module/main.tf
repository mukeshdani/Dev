module "resource_group_production" {
  source = "./resource_group"
  resource_groups = var.resource_groups
}

module "virtual_network_production" {
  source = "./virtual_network"
  virtual_networks = var.virtual_networks
  depends_on = [module.resource_group_production]
}