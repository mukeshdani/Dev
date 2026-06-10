resource "azurerm_resource_group" "rgs" {
    for_each = var.resource_groups
    name = each.value.name
    location = each.value.location
}

resource "azurerm_virtual_network" "vnet"{
    for_each = var.virtual_networks
    name = each.value.name
    resource_group_name = each.value.resource_group_name
    location = each.value.location
    address_space = each.value.address_space
    depends_on = [azurerm_resource_group.rgs]
}

resource "azurerm_subnet" "subnets"{
    for_each = var.subnets
    name = each.value.name
    resource_group_name = each.value.resource_group_name
    virtual_network_name = each.value.virtual_network_name
    address_prefixes = each.value.address_prefixes
    depends_on = [azurerm_virtual_network.vnet]
}

resource "azurerm_network_interface" "nic" {
  for_each = var.network_interfaces
  name                = each.value.name
  location            = each.value.location
  resource_group_name = each.value.resource_group_name

  depends_on = [azurerm_subnet.subnets]

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnets[each.value.subnet_name].id
    private_ip_address_allocation = each.value.ip_configuration.private_ip_address_allocation
  }
}

resource "azurerm_network_security_group" "nsg"{
    for_each = var.network_security_groups
    name = each.value.name
    location = each.value.location
    resource_group_name = each.value.resource_group_name
    depends_on = [azurerm_resource_group.rgs]
}

resource "azurerm_virtual_machine" "main" {
  for_each = var.virtual_machines
  name                  = each.value.name
  location              = each.value.location
  resource_group_name   = each.value.resource_group_name
  network_interface_ids = [azurerm_network_interface.nic[each.value.network_interface_name].id]
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
  os_profile_linux_config {
    disable_password_authentication = false
  }
  os_profile {
    computer_name  = each.value.os_profile.computer_name
    admin_username = each.value.os_profile.admin_username
    admin_password = each.value.os_profile.admin_password
  }
  depends_on = [azurerm_network_interface.nic]
}


