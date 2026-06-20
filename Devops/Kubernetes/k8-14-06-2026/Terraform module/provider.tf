terraform {
  required_providers {
    azurerm = {
        source = "hashicorp/azurerm"
        version = "4.77.0"
    }
  }
#   backend "azurerm"{
#     resource_group_name   = "rg-terraform-state"
#     storage_account_name  = "stterraformstate"
#     container_name        = "tfstate"
#     key                   = "terraform.tfstate"
#   }
}

provider "azurerm" {
  features {
    
  }
}