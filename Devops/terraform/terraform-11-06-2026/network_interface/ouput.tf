output "network_interfaces" {
  description = "Map of created network interfaces"
  value = {
    for key, network_interface in azurerm_network_interface.nic : key => {
      id                  = network_interface.id
      name                = network_interface.name
      resource_group_name = network_interface.resource_group_name
      location            = network_interface.location
      ip_configuration    = network_interface.ip_configuration
    }
  }
}