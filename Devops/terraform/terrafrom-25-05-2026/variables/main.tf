terraform {
  required_providers {
    azurerm = {
        source = "hashicorp/azurerm"
        version = "3.47.0"
    }
  }
}


provider "azurerm" {
  features {}
}

variable rg1 {}

resource "azurerm_resource_group" "rg1" {
  name     = var.rg1
  location = "eastus"
}
