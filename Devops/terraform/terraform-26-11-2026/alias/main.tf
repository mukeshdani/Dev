terraform {
  required_providers {
    azurerm ={
        source = "hashicorp/azurerm"
        version = "5.1.0"
    }
  }
}

provider "azurerm" {
  features {}
}