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

resource "azurerm_resource_group" "rg1" {
  name     = "rg-update-2"
  location = "centralindia"
}

resource "azurerm_resource_group" "rg2" {
  name     = "rg-2"
  location = "eastus"
}
