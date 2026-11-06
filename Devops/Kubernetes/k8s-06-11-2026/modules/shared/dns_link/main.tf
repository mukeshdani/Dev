resource "azurerm_private_dns_zone_virtual_network_link" "main" {
  for_each = var.links

  name                 = each.value.name
  private_dns_zone_id  = var.private_dns_zone_ids[each.value.zone_key]
  virtual_network_id   = each.value.virtual_network_id
  registration_enabled = false
}
