terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "mkd-rg-india" {
  name     = "rg-using-terraform-07-03-2026"
  location = "East US"
}

resource "azurerm_resource_group" "mkd-rg-europe" {
  name     = "rg-using-terraform-europe-07-03-2026"
  location = "West Europe"
}

resource "azurerm_storage_account" "storage-india" {
  name                     = "stgusingterraformindia"
  resource_group_name      = azurerm_resource_group.mkd-rg-india.name
  location                 = azurerm_resource_group.mkd-rg-india.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_account" "storage-europe" {
  name                     = "stgusingterraeurop"
  resource_group_name      = azurerm_resource_group.mkd-rg-europe.name
  location                 = azurerm_resource_group.mkd-rg-europe.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "git_container" {
  name                  = "git-files-container"
  storage_account_name  = azurerm_storage_account.storage-india.name
  container_access_type = "private"
}

resource "null_resource" "clone_repo" {
  provisioner "local-exec" {
    command = "if exist temp_repo (rd /s /q temp_repo) & git clone https://github.com/devopsinsiders/StreamFlix.git temp_repo"
  }
}

resource "azurerm_storage_blob" "folder_files" {
  for_each               = fileset("${path.module}/temp_repo", "**/*")
  
  name                   = each.value
  storage_account_name   = azurerm_storage_account.storage-india.name
  storage_container_name = azurerm_storage_container.git_container.name
  type                   = "Block"
  source                 = "${path.module}/temp_repo/${each.value}"
  
  depends_on = [null_resource.clone_repo]
}

resource "null_resource" "upload_to_static_site" {
  provisioner "local-exec" {
    command = <<EOT
      if exist StreamFlix (rd /s /q StreamFlix)
      git clone https://github.com/devopsinsiders/StreamFlix.git
      az storage blob upload-batch --account-name ${azurerm_storage_account.storage-india.name} --auth-mode key -d "$web" -s "./StreamFlix"
    EOT
  }

  depends_on = [azurerm_storage_account.storage-india]
}