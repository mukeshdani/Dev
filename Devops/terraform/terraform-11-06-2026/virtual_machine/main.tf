resource "azurerm_virtual_machine" "winvm" {
  for_each              = var.virtual_machine_configuration
  name                  = each.value.name
  location              = each.value.location
  resource_group_name   = each.value.resource_group_name
  network_interface_ids = [local.nic_by_name[each.value.network_interface_name].id]
  vm_size               = each.value.vm_size

  storage_image_reference {
    publisher = each.value.storage_image_reference.publisher
    offer     = each.value.storage_image_reference.offer
    sku       = each.value.storage_image_reference.sku
    version   = each.value.storage_image_reference.version
  }

  storage_os_disk {
    name              = each.value.storage_os_disk.name
    caching           = each.value.storage_os_disk.caching
    create_option     = each.value.storage_os_disk.create_option
    managed_disk_type = each.value.storage_os_disk.managed_disk_type
  }

  os_profile {
    computer_name  = each.value.os_profile.computer_name
    admin_username = each.value.os_profile.admin_username
    admin_password = each.value.os_profile.admin_password
  }
  
  os_profile_windows_config {
    provision_vm_agent        = each.value.os_profile_windows_config.provision_vm_agent
    enable_automatic_upgrades = each.value.os_profile_windows_config.enable_automatic_upgrades
  }

  tags = each.value.tags
}

locals {
  nic_by_name = {
    for _, nic in var.network_interfaces : nic.name => nic
  }
}
