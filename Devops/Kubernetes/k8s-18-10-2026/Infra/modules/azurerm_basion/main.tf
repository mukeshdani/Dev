data "azurerm_subnet" "subnet" {
  for_each = var.bastions
  name                 = each.value.subnet_name
  virtual_network_name = each.value.virtual_network_name
  resource_group_name  = each.value.resource_group_name
}

data "azurerm_public_ip" "public_ip" {
  for_each = var.bastions
  name                = each.value.public_ip_name
  resource_group_name = each.value.resource_group_name
}


resource "azurerm_bastion_host" "example" {
  for_each = var.bastions
  name                = each.value.name 
  location            = each.value.location
  resource_group_name = each.value.resource_group_name

  ip_configuration {
    name                 = "configuration"
    subnet_id            = data.azurerm_subnet.subnet[each.key].id
    public_ip_address_id = data.azurerm_public_ip.public_ip[each.key].id
  }
}