output "id" {
  value = { for key, vault in azurerm_key_vault.main : key => vault.id }
}

output "name" {
  value = { for key, vault in azurerm_key_vault.main : key => vault.name }
}
