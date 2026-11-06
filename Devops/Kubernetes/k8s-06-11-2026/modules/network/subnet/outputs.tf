output "ids" {
  value = { for key, subnet in azurerm_subnet.main : key => subnet.id }
}
