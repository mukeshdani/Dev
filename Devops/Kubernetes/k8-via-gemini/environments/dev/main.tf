# 1. Resource Group Module Call
module "resource_group" {
  source              = "../../modules/resource_group"
  resource_group_name = "${var.project_name}-${var.environment}-rg"
  location            = var.location
  tags                = var.tags
}

# 2. Azure Container Registry Module Call
module "acr" {
  source              = "../../modules/acr"
  acr_name            = "${replace(var.project_name, "-", "")}${var.environment}acr"
  resource_group_name = module.resource_group.resource_group_name
  location            = module.resource_group.location
  sku                 = "Standard"
  tags                = var.tags
}

# 3. Azure Kubernetes Service Module Call
module "aks" {
  source              = "../../modules/aks"
  cluster_name        = "${var.project_name}-${var.environment}-aks"
  resource_group_name = module.resource_group.resource_group_name
  location            = module.resource_group.location
  dns_prefix          = "${var.project_name}-${var.environment}"
  
  default_node_pool = {
    name                = "systempool"
    node_count          = 1
    vm_size             = "Standard_DS2_v2"
    enable_auto_scaling = true
    min_count           = 1
    max_count           = 3
  }
  # Example of generic/dynamic iteration for additional node pools
  additional_node_pools = var.additional_node_pools
  tags = var.tags
}

# 4. Role Assignment: AKS to pull from ACR
resource "azurerm_role_assignment" "aks_to_acr" {
  principal_id                     = module.aks.principal_id
  role_definition_name             = "AcrPull"
  scope                            = module.acr.acr_id
  skip_service_principal_aad_check = true
}
