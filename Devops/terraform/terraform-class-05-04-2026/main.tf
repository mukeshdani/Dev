terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.66.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "pmd-group" {
  name     = "meri-pmd-rg"
  location = "centralindia"
}


resource "azurerm_storage_account" "pmd-storage" {
  name                     = "meripmdstorage"
  resource_group_name      = azurerm_resource_group.pmd-group.name
  location                 = azurerm_resource_group.pmd-group.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}