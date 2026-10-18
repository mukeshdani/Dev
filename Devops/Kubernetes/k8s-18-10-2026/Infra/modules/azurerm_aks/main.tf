data "azurerm_container_registry" "acr" {
  name                = "acrdevappmkd9826"
  resource_group_name = "rg-dev-app"
}

# 1. Main AKS Cluster
resource "azurerm_kubernetes_cluster" "aks" {
  for_each            = var.aks
  name                = each.value.name
  location            = each.value.location
  resource_group_name = each.value.resource_group_name
  dns_prefix          = each.value.dns_prefix
  oidc_issuer_enabled       = true

  # Azure Policy (Gatekeeper engine) enable karta hai
  azure_policy_enabled = true

  default_node_pool {
    name            = "systempool"
    node_count      = 1
    vm_size         = "Standard_D2as_v4" # Free quota friendly
    os_disk_size_gb = 30
  }

  network_profile {
    network_plugin      = "azure"
    network_plugin_mode = "overlay"
    network_data_plane  = "cilium"
    network_policy      = "cilium"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Dev"
  }
}

# 2. ACR Attach (AcrPull permission)
resource "azurerm_role_assignment" "aks_acr_attach" {
  for_each                         = var.aks
  scope                            = data.azurerm_container_registry.acr.id
  role_definition_name             = "AcrPull"
  principal_id                     = azurerm_kubernetes_cluster.aks[each.key].kubelet_identity[0].object_id
  skip_service_principal_aad_check = true
}

# 3. User Node Pool (1 Nodes)
resource "azurerm_kubernetes_cluster_node_pool" "user_pool" {
  for_each              = var.aks
  name                  = "userpool"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.aks[each.key].id
  vm_size               = "Standard_D2as_v4"
  node_count            = 1
  mode                  = "User"

  tags = {
    Environment = "Dev"
    PoolType    = "User"
  }
}

# 4. Production Policy: Pod Limits Enforce Karna (Deny if no limits)
resource "azurerm_resource_policy_assignment" "enforce_pod_limits" {
  for_each             = var.aks
  name                 = "enforce-pod-limits"
  resource_id          = azurerm_kubernetes_cluster.aks[each.key].id
  policy_definition_id = "/providers/Microsoft.Authorization/policyDefinitions/e345eecc-fa47-480f-9e88-67dcc122b164"
  display_name         = "Enforce Pod Resource Requests & Limits"

  parameters = jsonencode({
    effect = {
      value = "Deny"
    }
  })
}