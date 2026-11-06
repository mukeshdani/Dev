variable "links" {
  type = map(object({
    name               = string
    zone_key           = string
    virtual_network_id = string
  }))
}

variable "private_dns_zone_ids" {
  type = map(string)
}
