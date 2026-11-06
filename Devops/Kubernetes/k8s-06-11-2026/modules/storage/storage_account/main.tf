resource "azurerm_storage_account" "main" {
  for_each = var.accounts

  name                            = each.value.name
  resource_group_name             = each.value.resource_group_name
  location                        = each.value.location
  account_tier                    = "Standard"
  account_replication_type        = "LRS"
  public_network_access           = "Disabled"
  allow_nested_items_to_be_public = false
  shared_access_key_enabled       = false
  https_traffic_only_enabled      = true
  min_tls_version                 = "TLS1_2"
}
