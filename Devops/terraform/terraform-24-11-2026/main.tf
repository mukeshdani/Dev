variable "azurerm_source" {
  type        = string
  default     = "hashicorp/azurerm"
  description = "Provider registry source"
}

variable "azurerm_version" {
  type        = string
  default     = "4.8.0"
  description = "Provider version constraint"
}

# versions.tf
terraform {
  required_version = ">= 1.17.0"

  required_providers {
    azurerm = {
      source  = var.azurerm_source
      version = var.azurerm_version
    }
    aws = {
      source  = var.aws_source
      version = var.aws_version
    }
    gcp = {
      source  = var.gcp_source
      version = var.gcp_version
    }
  }

    backend "azurerm" {
        resource_group_name  = "rg_test"
        storage_account_name = "stgblob0101"
        container_name       = "blobtest"
        key                  = "terraform.tfstate"
    }
}

# 3 environment
# 1 - 3.1.0
# 2 - 3.2.0
# 3 - 3.3.0

provider "azurerm" {
  features {}
  subscription_id = "1j11kj1hbk1h1kh11h1o"
}
provider "azurerm" {
  alias           = "dev"
  features {}
  subscription_id = "sgsishoshods9dd9d99sssssssssssss9999"
}
provider "azurerm" {
  alias           = "prod"
  features {}
  subscription_id = "sgsishoshods9dd9d999999"
}
provider "gcp" {
  alias           = "gcp_prod"
  features {}
  project_id = "sgsishoshods9dd9d999999"
}
provider "aws" {
  alias           = "aws_prod"
}

resource "azurerm_resource_group" "app_rg" {
  provider = azurerm.dev
  name     = "rg-app-prod"
  location = "Central India"
}

resource "azurerm_resource_group" "hub_rg" {
  provider = azurerm.prod
  name     = "rg-networking-hub"
  location = "Central India"
}

resource "aws_s3_bucket" "app_bucket" {
  provider = aws.aws_prod
  bucket   = "app-prod-bucket"
  acl      = "private"
}