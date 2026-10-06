terraform {
  required_providers {
    azurerm = {
        source = "hashicorp/azurerm"
        version = "5.7.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "mukesh-rg"
  location = "East US"
}