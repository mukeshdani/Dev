terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.70.0"
    }
  }
    backend "azurerm" {
      resource_group_name  = "pmd-state-management"
      storage_account_name = "pmdstorageaccount"
      container_name       = "tfstate"
      key                  = "terraform.tfstate"
  }

}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "pmd1" {
  name     = "pmd-state-management"
  location = "eastus"
}

resource "azurerm_resource_group" "pmd2" {
  name     = "pmd-state-management2"
  location = "eastus"
}


resource "azurerm_storage_account" "pmd_storage" {
  name                     = "pmdstorageaccount"
  resource_group_name      = azurerm_resource_group.pmd1.name
  location                 = azurerm_resource_group.pmd1.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "pmd_container" {
  name               = "tfstate"
  storage_account_id = azurerm_storage_account.pmd_storage.id
}