variable "endpoints" {
  type = map(object({
    name                = string
    connection_name     = string
    dns_zone_group_name = string
    location            = string
    resource_group_name = string
    subnet_id           = string
    target_resource_id  = string
    subresource_name    = string
    private_dns_zone_id = string
  }))
}
