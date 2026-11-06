resource "azurerm_windows_virtual_machine" "main" {
  for_each = var.virtual_machines

  name                = each.value.name
  computer_name       = each.value.computer_name
  resource_group_name = each.value.resource_group_name
  location            = each.value.location
  size                = each.value.size
  admin_username      = each.value.admin_username
  admin_password      = var.admin_passwords[each.key]
  network_interface_ids = [
    each.value.network_interface_id,
  ]

  identity {
    type = "SystemAssigned"
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = each.value.os_disk_type
  }

  source_image_reference {
    publisher = each.value.image.publisher
    offer     = each.value.image.offer
    sku       = each.value.image.sku
    version   = each.value.image.version
  }
}
