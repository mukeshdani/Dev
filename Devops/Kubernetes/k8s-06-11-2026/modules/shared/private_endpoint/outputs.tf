output "private_ips" {
  value = {
    for key, endpoint in azurerm_private_endpoint.main : key => endpoint.private_service_connection[0].private_ip_address
  }
}
