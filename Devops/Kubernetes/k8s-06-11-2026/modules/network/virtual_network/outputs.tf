output "ids" {
  value = { for key, vnet in azurerm_virtual_network.main : key => vnet.id }
}
