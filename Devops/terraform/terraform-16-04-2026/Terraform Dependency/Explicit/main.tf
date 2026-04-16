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
  name     = "actual_resource_group_name_Explicit"
  location = "West Europe"
}

resource "azurerm_storage_account" "resource_identifier_name_2" {
  depends_on = [ azurerm_resource_group.resource_identifier_name_1]
  name                     = "explicitdependency"
  resource_group_name      = "actual_resource_group_name_Explicit"
  location                 = "West Europe"
  account_tier             = "Standard"
  account_replication_type = "LRS"
}