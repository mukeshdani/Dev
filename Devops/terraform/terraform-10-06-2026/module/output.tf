output "resource_groups" {
  description = "Resource groups created by the module"
  value       = module.resource_group_production.resource_groups
}
output "virtual_networks" {
  description = "Virtual networks created by the module"
  value       = module.virtual_network_production.virtual_networks
}
output "subnets" {
  description = "Subnets created by the module"
  value       = module.subnet_production.subnets
}
output "network_interfaces" {
  description = "Network interfaces created by the module"
  value       = module.network_interface_production.network_interfaces
}