terraform {
    required_providers {
      azurerm = {
         source = "hashicorp/azurerm"
         version = "5.1.0"
      }
    }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg02" {
  name     = "rg1"
  location = "eastus"
}

output "rg02_id" {
  value = azurerm_resource_group.rg02.id
  sensitive = true
}

data "azurerm_resource_group" "rg02" {
  name = "rg123"
}

output "rg03_id" {
  value = data.azurerm_resource_group.rg02.id
}




