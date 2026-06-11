output "subnets" {
  description = "Subnets created by the module"
  value = {
    for key, resource_group in azurerm_subnet.subnets : key => {
      id                   = resource_group.id
      name                 = resource_group.name
      resource_group_name  = resource_group.resource_group_name
      virtual_network_name = resource_group.virtual_network_name
      address_prefixes     = resource_group.address_prefixes
    }
  }
}