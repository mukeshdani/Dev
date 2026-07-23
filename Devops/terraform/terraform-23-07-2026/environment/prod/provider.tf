terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.81.0"
    }
  }

  # backend "azurerm"{
  #     resource_group_name = ""
  #     storage_group_name = ""
  #     container_name = ""
  #     key = ""
  # }
}

provider "azurerm" {
  features {}
}