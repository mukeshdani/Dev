module "rg_prod" {
  source = "E:/Dev/Devops/terraform/terraform-09-06-2026/module/resource_group"

  resource_groups = var.resource_groups
}

module "vnet_prod" {
  source = "E:/Dev/Devops/terraform/terraform-09-06-2026/module/virtual_network"

  virtual_networks       = var.virtual_networks
  resource_groups_output = module.rg_prod
  
  depends_on = [module.rg_prod]
}

module "subnet_prod" {
  source = "./subnet"

  subnets = var.subnets

  depends_on = [module.vnet_prod]
}

module "nic_prod" {
  source = "./network_interface_card"

  network_interfaces = var.network_interfaces

  depends_on = [module.subnet_prod]
}
