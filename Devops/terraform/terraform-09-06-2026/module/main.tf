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