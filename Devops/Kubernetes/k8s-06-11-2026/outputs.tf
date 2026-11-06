output "key_vault_name" {
  description = "Key Vault name. Add the VM password secret before enabling VM deployment."
  value       = module.key_vault.name["main"]
}

output "storage_account_name" {
  description = "Storage account name."
  value       = try(module.storage_account.name["storage"], null)
}

output "vm_private_ip" {
  description = "Private IP of the Windows VM."
  value       = try(module.network_interface.private_ip["vm"], null)
}

output "blob_private_endpoint_ip" {
  description = "Private IP of the Blob private endpoint."
  value       = try(module.private_endpoints.private_ips["blob"], null)
}
