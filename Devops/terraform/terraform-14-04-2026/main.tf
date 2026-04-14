terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.46.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg1" {
  name     = "rg-1-1"
  location = "East US"
}

resource "azurerm_resource_group" "rg2" {
  name     = "rg-1-2"
  location = "East US"
}

resource "azurerm_resource_group" "rg3" {
  name     = "rg-1-3"
  location = "East US"
}

resource "azurerm_resource_group" "rg4" {
  name     = "rg-1-4"
  location = "East US"
}