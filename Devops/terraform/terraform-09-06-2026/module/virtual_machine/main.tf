resource "azurerm_virtual_machine" "vms" {

    name = "vm_name"
    resource_group_name = "rg_name"
    Location = "location"
    network_interface_ids = [azurerm_network_interface.nic.id]
    vm_size = "St"
    virtual_network_id = azurerm_virtual_network.vnet.id
    subnet_id = azurerm_subnet.subnet.id
  
}