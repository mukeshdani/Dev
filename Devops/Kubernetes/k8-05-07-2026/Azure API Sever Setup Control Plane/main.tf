resource "azurerm_resource_group" "pmd-k8-group" {
  name     = "k8-group"
  location = "East US"
}

resource "azurerm_kubernetes_cluster" "pmd-k8-cluster" {
  name                = "pmd-k8-cluster"
  location            = azurerm_resource_group.pmd-k8-group.location
  resource_group_name = azurerm_resource_group.pmd-k8-group.name
  dns_prefix          = "pmdk8"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2s_v7"
  }

  identity {
    type = "SystemAssigned"
  }
}