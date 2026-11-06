output "ids" {
  value = { for key, nsg in azurerm_network_security_group.main : key => nsg.id }
}
