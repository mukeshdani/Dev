terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.68.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "resource_identifier_name_1" {
  name     = "actual_resource_group_name_implicit"
  location = "West Europe"
}

resource "azurerm_storage_account" "resource_identifier_name_2" {
  name                     = "implicitdependency"
  resource_group_name      = azurerm_resource_group.resource_identifier_name_1.name
  location                 = azurerm_resource_group.resource_identifier_name_1.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}