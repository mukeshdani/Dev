run "verify_dev_deployment" {
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
}