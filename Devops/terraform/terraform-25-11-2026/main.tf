# variable "source_env"{
#     default = "hashicorp/azurerm"
# }
# variable "version_env"{
#     default = "5.1.0"
# }

terraform {
  required_providers {
    azurerm = {
        source = "hashicorp/azurerm"
        version = "5.1.0"
    }
  }
}

provider "azurerm" {
  features {
  }
}


variable "rg_name1"{}
variable "rg_name2"{
    default = "default-rg"
}

locals {
  common_tags = {
    Project     = "Digital_MKD"
    Environment = "DEV"
    ManagedBy   = "Mukesh_Dani"
  }
}

resource "azurerm_resource_group" "rg_dev" {
  name     = var.rg_name1
  location = "East US"
  tags = local.common_tags
}

resource "azurerm_resource_group" "rg_prod" {
  name     = var.rg_name2
  location = "West US"
  tags = local.common_tags
}

