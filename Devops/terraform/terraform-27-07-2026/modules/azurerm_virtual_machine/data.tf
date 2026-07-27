data "azurerm_resource_group" "rgs" {
    for_each = var.vm
    name = each.value.RG_name
}

data "azurerm_network_interface" "nic" {
    for_each = var.vm
    name = each.value.nic_name
    resource_group_name = data.azurerm_resource_group.rgs[each.key].name
}

data "azurerm_key_vault" "kv" {
    for_each = var.vm
  name                = each.value.key_vault_name
  resource_group_name = each.value.RG_name
}

data "azurerm_key_vault_secret" "admin_user" {
    for_each     = var.vm
  name         = "vm-admin-username"
  key_vault_id = data.azurerm_key_vault.kv[each.key].id
}

data "azurerm_key_vault_secret" "admin_password" {
    for_each     = var.vm
  name         = "vm-admin-password"
  key_vault_id = data.azurerm_key_vault.kv[each.key].id
}