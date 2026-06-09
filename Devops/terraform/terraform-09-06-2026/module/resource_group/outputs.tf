output "name" {
  value = { for k, rg in azurerm_resource_group.rgs : k => rg.name }
}

output "id" {
  value = { for k, rg in azurerm_resource_group.rgs : k => rg.id }
}
