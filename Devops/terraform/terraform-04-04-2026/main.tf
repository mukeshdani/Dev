terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "mkd-rg-india" {
  name     = "mukesh-rg-india"
  location = "East US"
}

resource "azurerm_storage_account" "mkd-stg-india" {
  name                    = "mkdstgindia"
    resource_group_name     = azurerm_resource_group.mkd-rg-india.name
    location                = azurerm_resource_group.mkd-rg-india.location
    account_tier            = "Standard"
    account_replication_type = "LRS"
}

resource "azurerm_storage_container" "mkd-container" {
  name                  = "mkd-files-container"
  storage_account_name  = azurerm_storage_account.mkd-stg-india.name
  container_access_type = "private"
}

