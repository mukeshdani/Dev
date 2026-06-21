resource "azurerm_network_security_group" "nsgs" {
    for_each = var.network_security_groups
  name = each.key
  location            = each.value.location
  resource_group_name = each.value.resource_group_name

  security_rule {
    name                       = each.value.security_rule.value.name
    priority                   = each.value.security_rule.value.priority
    direction                  = each.value.security_rule.value.direction
    access                     = each.value.security_rule.value.access
    protocol                   = each.value.security_rule.value.protocol
    source_port_range          = each.value.security_rule.value.source_port_range
    destination_port_range     = each.value.security_rule.value.destination_port_range
    source_address_prefix      = each.value.security_rule.value.source_address_prefix
    destination_address_prefix = each.value.security_rule.value.destination_address_prefix
  }
}