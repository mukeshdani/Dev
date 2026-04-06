terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.67.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "mukeshdani" {
  name     = "mukeshdani"
  location = "eastus"
}

resource "azurerm_resource_group" "B18-MuekshDani" {
  name     = "B18-MukeshDani-RG"
  location = "eastus"
}

