data "azurerm_client_config" "current" {}

data "azurerm_resource_group" "rg" {
  for_each = var.azurekeyvalut
  name = each.value.rg_name
}

resource "azurerm_key_vault" "azureKeyVault" {
  for_each = var.azurekeyvalut
  name                        = each.key
  location                    = data.azurerm_resource_group.rg[each.key].location
  resource_group_name         = data.azurerm_resource_group.rg[each.key].name
  rbac_authorization_enabled  = each.value.rbac_authorization_enabled
  enabled_for_disk_encryption = each.value.enabled_for_disk_encryption
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = each.value.soft_delete_retention_days
  purge_protection_enabled    = each.value.purge_protection_enabled

  sku_name = each.value.sku_name

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get",
    ]

    secret_permissions = [
      "Get",
    ]

    storage_permissions = [
      "Get",
    ]
  }
}