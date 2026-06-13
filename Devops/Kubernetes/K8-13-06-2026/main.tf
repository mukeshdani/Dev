terraform {
  required_providers {
    azurerm = {
        source = "hashicorp/azurerm"
        version = "4.77.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "mukeshrg" {
  name     = "pmd-k8-13-06-2026"
  location = "Central India"
}

resource "azurerm_kubernetes_cluster" "mukeshaks" {
  name                = "pmd-k8-13-06-2026"
  location            = azurerm_resource_group.mukeshrg.location
  resource_group_name = azurerm_resource_group.mukeshrg.name
  dns_prefix         = "pmdk8"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2as_v5"
  }

  identity {
    type = "SystemAssigned"
  }

  depends_on = [
    azurerm_resource_group.mukeshrg
  ]
}