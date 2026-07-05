module "resource_group" {
    source = "../../resource_module/azure_resources/resource_group"
    rgs = module.resource_group.rgs
}