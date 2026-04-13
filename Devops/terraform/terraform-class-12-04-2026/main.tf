terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.68.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource local_file mukesh {
     filename = "automation.txt"
     content = "testing content" 
}

