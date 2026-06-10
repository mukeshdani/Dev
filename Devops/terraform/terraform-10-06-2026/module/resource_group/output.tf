output "resource_groups" {
  description = "Map of created resource groups"
  value = {
    for key, resource_group in azurerm_resource_group.rgs : key => {
      id       = resource_group.id
      name     = resource_group.name
      location = resource_group.location
      tags     = resource_group.tags
    }
  }
}