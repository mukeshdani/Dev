module "resource_group" {
  source = "../../modules/azurerm_resource_group"
  rgs    = var.rgs
}

module "kubectl" {
  depends_on = [module.resource_group]
  source     = "../../modules/azurerm_k8_cluster"
  k8s        = var.k8s
}