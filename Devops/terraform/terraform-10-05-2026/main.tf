terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.72.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg1" {
  name     = var.var1
  location = var.location
}


resource "azurerm_resource_group" "rg2" {
  name     = var.var2
  location = var.location
}


resource "azurerm_resource_group" "rg3" {
  name     = var.var3
  location = var.location
}

resource "azurerm_resource_group" "rg4" {
  name     = var.var4
  location = var.location
}

resource "azurerm_resource_group" "rg5" {
  name     = var.var5
  location = var.location
}