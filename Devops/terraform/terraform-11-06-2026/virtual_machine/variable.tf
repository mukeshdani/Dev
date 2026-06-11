variable "virtual_machine_configuration" {
  description = "The name of the virtual machine."
   type    = map(any)
}
variable "network_interfaces" {
  description = "Map of network interfaces to create"
  type        = map(any)
}