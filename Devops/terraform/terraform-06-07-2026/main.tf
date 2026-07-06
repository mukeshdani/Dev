terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.80.0"
    }
  }
}

provider "azurerm" {
  features {}
}

variable "locationWalaVarible"{}

resource "azurerm_resource_group" "bl1" {
  name     = "rg1"
  location = var.locationWalaVarible
}

resource "azurerm_resource_group" "bl2" {
  name     = "rg2"
  location = var.locationWalaVarible
}

resource "azurerm_resource_group" "bl3" {
  name     = "rg3"
  location = var.locationWalaVarible
}


