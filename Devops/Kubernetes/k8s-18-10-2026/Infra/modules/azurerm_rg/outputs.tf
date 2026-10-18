output "resource_group" {
    description = "A map of resource groups created. Each key is a unique identifier for the resource group, and the value is an object containing the name, location, and tags for the resource group"
    value = {
        for k, v in azurerm_resource_group.rgs : k => {
            id = v.id
            name = v.name
            location = v.location
            tags = v.tags
        }
    }
  
}