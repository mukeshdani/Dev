
data "network_interface" "example" {
  for_each = var.vms
  name                = each.value.nic_name
  resource_group_name = each.value.resource_group_name
}

data "azurerm_key_vault" "keyvault" {
  for_each = var.vms
  name                = each.value.keyvault_name
  resource_group_name = each.value.resource_group_name
}

data "azurerm_key_vault_secret" "username" {
  for_each = var.vms
  name         = each.value.username
  key_vault_id = data.azurerm_key_vault.keyvault[each.key].id
}

data "azurerm_key_vault_secret" "password" {
  for_each = var.vms
  name         = each.value.password
  key_vault_id = data.azurerm_key_vault.keyvault[each.key].id
}

resource "azurerm_linux_virtual_machine" "vms" {
  for_each = var.vms
  name                = each.value.name
  resource_group_name = each.value.resource_group_name
  location            = each.value.location
  size                = each.value.size
  admin_username      = data.azurerm_key_vault_secret.username[each.key].value
  admin_password      = data.azurerm_key_vault_secret.password[each.key].value
  
  network_interface_ids = [
    data.network_interface.example[each.key].id,
  ]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}
