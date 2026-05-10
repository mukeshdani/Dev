
resource "azurerm_resource_group" "rg1" {
  name     = var.rg1
  location = "eastus"
}

resource "azurerm_storage_account" "stoareccount" {
  name                     = "pmdstorageaccount"
  resource_group_name      = azurerm_resource_group.rg1.name
  location                 = azurerm_resource_group.rg1.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "storagecontainer" {
  name                  = "pmdstoragecontainer"
  storage_account_id    = azurerm_storage_account.stoareccount.id
  container_access_type = "private"
}