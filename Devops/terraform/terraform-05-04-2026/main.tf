terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {

  }
}

resource "azurerm_resource_group" "mkd-rg-india" {
  name     = "mukesh-rg-india"
  location = "East US"
}

resource "azurerm_storage_account" "mkd-stg-india" {
  name                     = "mkdstgindia"
  resource_group_name      = azurerm_resource_group.mkd-rg-india.name
  location                 = azurerm_resource_group.mkd-rg-india.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  static_website {
    index_document     = "index.html"
    error_404_document = "404.html"
  }
}

resource "azurerm_storage_container" "mkd-container" {
  name                  = "mkd-files-container"
  storage_account_name  = azurerm_storage_account.mkd-stg-india.name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "mkd-blob" {
  name                   = "index.html"
  storage_account_name   = azurerm_storage_account.mkd-stg-india.name
  storage_container_name = azurerm_storage_container.mkd-container.name
  type                   = "Block"
  source_content         = "<html><body><h1>Welcome to Mukesh's Storage Account Static Website</h1></body></html>"
}

resource "azurerm_storage_blob" "mkd-blob-404" {
  name                   = "404.html"
  storage_account_name   = azurerm_storage_account.mkd-stg-india.name
  storage_container_name = azurerm_storage_container.mkd-container.name
  type                   = "Block"
  source_content         = "<html><body><h1>404 - Page Not Found</h1></body></html>"
}

