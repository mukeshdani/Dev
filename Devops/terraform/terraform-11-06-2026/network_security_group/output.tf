output "network_security_groups" {
    description = "List of network security groups created"
    value = { for key, nsg in azurerm_network_security_group.nsg : key => {
        id                 = nsg.id
        name               = nsg.name
        location           = nsg.location
        resource_group_name = nsg.resource_group_name
    }}
}