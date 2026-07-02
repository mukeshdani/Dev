terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=4.79.0"
    }
  }
}


// Pattern 2

provider "azurerm" {
  features {}
}


// Pattern 3


# resource "azurerm_resource_group" "resourceblockidentier1" {
#   name     = "rg1"
#   location = "Central US"
# }


