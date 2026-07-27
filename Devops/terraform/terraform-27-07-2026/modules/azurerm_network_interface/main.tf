data "azurerm_resource_group" "rgs" {
  for_each = var.nic
  name = "pmd"
}
data "azurerm_subnet" "subnet" {
  for_each = var.nic
  name = each.value.subnet_name
  resource_group_name = data.azurerm_resource_group.rgs[each.key].name
  virtual_network_name = each.value.virtual_network_name
}

resource "azurerm_network_interface" "nic" {
  for_each = var.nic
  name = each.key
  resource_group_name = data.azurerm_resource_group.rgs[each.key].name
  location = data.azurerm_resource_group.rgs[each.key].location
  ip_configuration {
    name                          = each.value.ip_configuration_name
    subnet_id                     = data.azurerm_subnet.subnet[each.key].id
    private_ip_address_allocation = each.value.private_ip_address_allocation
  }
}