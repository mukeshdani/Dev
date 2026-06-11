variable "network_interfaces" {
  description = "Map of network interfaces to create"
  type        = map(any)
}

variable "subnets" {
  description = "Map of created subnets"
  type        = map(any)
}