resource "azurerm_resource_group" "rg1" {
  name = "pmd-rg-state"
  location = "eastus"
}

resource "azurerm_storage_account" "stg1" {
  name = "pmdstgstate"
  resource_group_name = azurerm_resource_group.rg1.name # implicit dependency
  location = azurerm_resource_group.rg1.location
  account_tier = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "stgcontainer1" {
  depends_on = [ azurerm_storage_account.stg1 ]
  name = "tfstate"
  storage_account_id = azurerm_storage_account.stg1.id
  container_access_type = "private"
}