module "reource_group" {
  source   = "./modules/resource_group"
  name     = "prod-rg"
  location = "Central India"
}

module "subnet"{
    source = "./modules/subnet"
    name = "subnet1"
    resource_group_name = module.reource_group.rg_name
}

locals {
    subnet_id = module.subnet.subnet_id
}

locals {
  resource_group_id = module.reource_group.rg_id
}
