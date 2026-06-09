variable "virtual_networks" {
  type = map(any)
}

variable "resource_groups_output" {
  type = map(any)
  description = "Resource groups output from parent module"
}
