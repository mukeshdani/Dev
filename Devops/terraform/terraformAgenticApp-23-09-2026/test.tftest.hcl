# Global variables applied to all run blocks in this test file
variables {
  rg_name              = "rg-terraform"
}

run "verify_rg_defaults_and_naming" {
  command = plan

  variables {
    rg_name     = "rg-terraform"
    rg_location = "East US"
  }

  assert {
    condition     = startswith(azurerm_resource_group.rg1.name, "rg-terraform")
    error_message = "RG name is Not correct"
  }

  assert {
    condition     = azurerm_resource_group.rg1.location == "eastus"
    error_message = "Location Failure: Resource Group की लोकेशन East US होनी चाहिए।"
  }
}