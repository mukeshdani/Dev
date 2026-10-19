module "rgs" {
  source = "../../modules/azurerm_rg"
  rgs = var.rgs
}

# module "vnets" {
#   depends_on = [module.rgs]
#   source = "../../modules/azurerm_vnet"
#   vnets = var.vnets
# }

# module "subnets" {
#   depends_on = [module.vnets]
#   source = "../../modules/azurerm_subnet"
#   subnets = var.subnets
# }

# module "nics" {
#   depends_on = [module.subnets]
#   source = "../../modules/azurerm_nic"
#   nics = var.nics
# }

# module "public_ips" {
#   depends_on = [module.rgs]
#   source = "../../modules/azurerm_pip"
#   public_ips = var.public_ips
# }

# module "bastions" {
#   depends_on = [module.public_ips, module.subnets]
#   source = "../../modules/azurerm_basion"
#   bastions = var.bastions
# }

# module "keyvaults" {
#   depends_on = [module.rgs]
#   source = "../../modules/azurerm_ketvalut"
#   keyvaults = var.keyvaults
# }

# module "vms" {
#   depends_on = [module.nics, module.keyvaults]
#   source = "../../modules/azurerm_vm"
#   vms = var.vms
# }

module "acrs" {
  depends_on = [module.rgs]
  source = "../../modules/azurerm_acr"
  acrs = var.acrs
 
}

module "aks" {

  depends_on = [module.rgs, module.acrs]
  source = "../../modules/azurerm_aks"
  
  aks = var.aks
}