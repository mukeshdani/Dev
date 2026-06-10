output "subnet_ids" {
  # This creates a map of subnet names to their Azure IDs
  value = { for s in azurerm_subnet.subnet : s.name => s.id }
}