module "resource_group" {
  source = "./module"
  variables = {
    env        = "dev"
    Managed_by = "terraform"
    location   = "east_us"
    resource   = "rg"
  }
}

locals {
    reg_id = module.resource_group.rg02.id
}

