output "id" {
  value = { for key, nic in azurerm_network_interface.main : key => nic.id }
}

output "private_ip" {
  value = { for key, nic in azurerm_network_interface.main : key => nic.private_ip_address }
}
