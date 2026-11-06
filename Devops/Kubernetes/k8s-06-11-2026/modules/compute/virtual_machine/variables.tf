variable "virtual_machines" {
  type = map(object({
    name                 = string
    computer_name        = string
    size                 = string
    location             = string
    resource_group_name  = string
    network_interface_id = string
    admin_username       = string
    os_disk_type         = string
    image = object({
      publisher = string
      offer     = string
      sku       = string
      version   = string
    })
  }))
}

variable "admin_passwords" {
  type      = map(string)
  sensitive = true
}
