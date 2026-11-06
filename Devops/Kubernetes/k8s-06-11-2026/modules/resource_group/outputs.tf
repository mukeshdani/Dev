output "id" {
  value = { for key, group in azurerm_resource_group.main : key => group.id }
}

output "name" {
  value = { for key, group in azurerm_resource_group.main : key => group.name }
}

output "location" {
  value = { for key, group in azurerm_resource_group.main : key => group.location }
}
