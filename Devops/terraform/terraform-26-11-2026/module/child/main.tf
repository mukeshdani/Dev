module "resource_group" {
  source = "./modules/resource_group"

  resource_group_name = local.reg_id
  location            = var.location
  
}