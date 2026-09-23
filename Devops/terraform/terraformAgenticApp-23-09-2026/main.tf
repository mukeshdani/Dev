terraform {
    required_providers {
        azurerm = {
            source  = "hashicorp/azurerm"
            version = "~> 3.0"
        }
    }

    backend "azurerm" {
        resource_group_name  = "rg-agenticai"
        storage_account_name = "generativestorage"
        container_name       = "generativecontainer"
        key                  = "dev.terraform.tfstate"
    }
}

provider "azurerm" {
    features {}
}

variable "rg_name" {
    description = "The name of the resource group."
    type        = string
    default     = "rg-terraform"
}
variable "rg_location" {
    description = "The location of the resource group."
    type        = string
    default     = "East US"
}

resource "azurerm_resource_group" "rg1" {
    name     = var.rg_name
    location = var.rg_location
}