module "aksmodule" {
  source = "../moduels/azurerm_aks"
  aks = var.aks_clusters
}

module "rgs" {
  source = "../moduels/azurerm_rg"
  resource_groups = var.resource_groups
}