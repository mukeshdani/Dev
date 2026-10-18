run "verify_dev_deployment_case1" {
  command = plan
  
  variables {
    rgs = {
      rg_dev = {
        name        = "Rg-dev-app"
        location    = "East US"
        environment = "dev"
        managed_by  = "terraform"
      }
    }
  }

  assert {
    condition     = length(module.rgs.resource_group) > 0
    error_message = "Kam se kam ek resource group plan mein hona chahiye."
  }
  assert {
    condition = alltrue([
      for rg in values(module.rgs.resource_group) : startswith(lower(rg.name), "rg-")
    ])
    error_message = "Sabhi resource group ke naam 'rg-' se shuru hone chahiye."
  }
}

run "verify_dev_deployment_case2" {
  command = plan
  
  variables {
    rgs = {
      rg_dev = {
        name        = "rg-dev-app"
        location    = "East US"
        environment = "dev"
        managed_by  = "terraform"
      }
    }
  }

  assert {
    condition     = length(module.rgs.resource_group) > 0
    error_message = "Kam se kam ek resource group plan mein hona chahiye."
  }
  assert {
    condition = alltrue([
      for rg in values(module.rgs.resource_group) : startswith(rg.name, "rg-")
    ])
    error_message = "Sabhi resource group ke naam 'rg-' se shuru hone chahiye."
  }
}

run "verify_dev_deployment_case3" {
  command = plan
  
  variables {
    rgs = {
      rg_dev = {
        name        = "rg-dev-app"
        location    = "East US"
        environment = "dev"
        managed_by  = "terraform"
      }
    }
  }

  assert {
    condition     = length(module.rgs.resource_group) > 0
    error_message = "Kam se kam ek resource group plan mein hona chahiye."
  }
  assert {
    condition = alltrue([
      for rg in values(module.rgs.resource_group) : startswith(rg.name, "rg-")
    ])
    error_message = "Sabhi resource group ke naam 'rg-' se shuru hone chahiye."
  }
}