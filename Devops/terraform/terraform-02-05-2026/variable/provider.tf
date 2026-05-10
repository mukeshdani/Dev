terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.71.0"
    }
  }

  backend "azurerm" {
    resource_group_name = "pmd-resource-group"
    storage_account_name = "pmdstorageaccount"
    container_name = "pmdstoragecontainer"
    key = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

