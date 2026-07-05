module "resource_group" {
    source = "../../resource_module/azure_resources/resource_group"
    rgs = var.rgs
}

module "virtual_network" {
    source = "../../resource_module/azure_resources/virtual_network"
    vnet = var.vnet
    rg_details = module.resource_group.rg_output
    depends_on = [module.resource_group]
}