

resource "azurerm_virtual_machine" "vm"{
    for_each = var.vm
    name = each.key
    resource_group_name = data.azurerm_resource_group.rgs[each.key].name
    location = data.azurerm_resource_group.rgs[each.key].location
    network_interface_ids = [data.azurerm_network_interface.nic[each.key].id]
    vm_size = each.value.vm_size

    storage_os_disk {
        name = each.value.os_disk_name
        caching = each.value.os_disk_caching
        create_option = each.value.os_disk_create_option
        managed_disk_type = each.value.os_disk_managed_disk_type
    }

    storage_image_reference {
        publisher = each.value.image_publisher
        offer = each.value.image_offer
        sku = each.value.image_sku
        version = each.value.image_version
    }

    os_profile {
        computer_name = each.value.computer_name
        admin_username = each.value.admin_username
        admin_password = each.value.admin_password
    }

    os_profile_linux_config {
        disable_password_authentication = each.value.disable_password_authentication
    }
}