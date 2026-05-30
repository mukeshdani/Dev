output "acr_id" {
  description = "The ID of the Container Registry"
  value       = azurerm_container_registry.this.id
}

output "acr_login_server" {
  description = "The URL that can be used to log into the container registry"
  value       = azurerm_container_registry.this.login_server
}
