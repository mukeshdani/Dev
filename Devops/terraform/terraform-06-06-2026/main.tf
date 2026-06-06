terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.70.0"
    }
  }
}

provider "azurerm" {
  features {}
}

variable "location" {}

resource "azurerm_resource_group" "rg1" {
  name     = "example-resources"
  location = var.location
}
resource "azurerm_resource_group" "rg2" {
  name     = "example-resourcessssssssss"
  location = var.location
}

