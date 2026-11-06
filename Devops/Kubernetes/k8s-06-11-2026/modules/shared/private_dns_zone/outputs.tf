output "ids" {
  value = { for key, zone in azurerm_private_dns_zone.main : key => zone.id }
}
