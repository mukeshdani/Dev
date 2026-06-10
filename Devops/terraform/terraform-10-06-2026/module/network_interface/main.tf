resource "azurerm_network_interface" "nic" {
  for_each            = var.network_interfaces
  name                = each.value.name
  location            = each.value.location
  resource_group_name = each.value.resource_group_name

  ip_configuration {
    name                          = each.value.ip_configuration[0].name
    subnet_id                     = local.subnets_by_name[each.value.subnet_name].id
    private_ip_address_allocation = "Dynamic"
  }
}

locals {
  subnets_by_name = {
    for _, subnet in var.subnets : subnet.name => subnet
  }
}