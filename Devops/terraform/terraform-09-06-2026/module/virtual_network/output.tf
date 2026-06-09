output "name" {
  value = { for k, vnet in azurerm_virtual_network.vnets : k => vnet.name }
}

output "id" {
  value = { for k, vnet in azurerm_virtual_network.vnets : k => vnet.id }
}
