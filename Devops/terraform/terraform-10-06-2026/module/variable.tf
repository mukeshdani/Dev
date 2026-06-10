variable "resource_groups" {
  description = "Name of the resource group"
  type        = map(any)
}
variable "virtual_networks" {
  description = "Name of the virtual networks"
  type        = map(any)
}
variable "subnets" {
  description = "Map of subnets to create"
  type        = map(any)
}
variable "network_interfaces" {
  description = "Map of network interfaces to create"
  type        = map(any)
}