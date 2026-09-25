terraform {
  required_providers {
    azurerm = {
        source = "value"
        version = "value"
    }
    gcp = {
        source = "value"
        version = "value"
    }
  }
}

provider "azurerm" {
  alias = "azure_prod"
  features {}
}

provider "gcp" {
  alias = "gcp_prod"
  features {}
}