output "id" {
  value = { for key, account in azurerm_storage_account.main : key => account.id }
}

output "name" {
  value = { for key, account in azurerm_storage_account.main : key => account.name }
}
