resource "azurerm_private_dns_zone" "main" {
  for_each = var.zones

  name                = each.value.name
  resource_group_name = each.value.resource_group_name
}
