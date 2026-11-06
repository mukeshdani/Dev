resource "azurerm_subnet_network_security_group_association" "main" {
  for_each = var.security_groups

  subnet_id                 = var.subnet_ids[each.value.subnet_key]
  network_security_group_id = var.nsg_ids[each.key]
}
