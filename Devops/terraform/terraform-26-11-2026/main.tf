terraform {
    required_providers {
      azurerm = {
         source = "hashicorp/azurerm"
         version = "5.1.0"
      }
    }
}

provider "azurerm" {
  features {}
}


variable "env" {
  default = "dev"
}
variable "Managed_by" {
  default = "terraform"
}
variable "location" {
  default = "east_us"
}
variable "resource" {
  default = "rg"
}


locals {
  rg_name = "${var.env}-${var.Managed_by}-${var.location}-${var.resource}"
}

locals {
    value = "rgs1_location"
}



resource "azurerm_resource_group" "rg02" {
  name     = local.rg_name
  location = local.value
}