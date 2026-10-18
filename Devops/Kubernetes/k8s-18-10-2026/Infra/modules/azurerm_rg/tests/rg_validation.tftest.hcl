run "verify_tags_filtering_and_mandatory_files" {
  command = plan

  variables {
    rgs = {
      rg_prod = {
        name        = "rg-production-app"
        location    = "East US"
        environment = "prod"
        managed_by  = "terraform"
      }
      rg_dev = {
        name        = "rg-development-app"
        location    = "East US"
        environment = "dev"
        managed_by  = ""
      }
    }
  }

  # Assert 1: Check Locations
  assert {
    condition = alltrue([
      for rg in var.rgs : contains(["East US", "West Europe", "Southeast Asia"], rg.location)
    ])
    error_message = "Location must be in either East US, West Europe, or Southeast Asia."
  }

  # Assert 2: Check Name Prefix 'rg-'
  assert {
    condition = alltrue([
      for rg in var.rgs : startswith(lower(rg.name), "rg-")
    ])
    error_message = "All Resource Group names must start with 'rg-'."
  }

  # Assert 3: Check Empty String Managed_By Tag Drop Hua Ya Nahi
  assert {
    condition     = !can(azurerm_resource_group.rgs["rg_dev"].tags["managed_by"])
    error_message = "Empty tag 'managed_by' must be dropped from tags map."
  }
}

run "expect_failure_on_invalid_region" {
  command = plan

  variables {
    rgs = {
      rg_invalid = {
        name        = "rg-invalid"
        location    = "unsupported-region-xyz"
        environment = "dev"
        managed_by  = "terraform"
      }
    }
  }

  expect_failures = [
    var.rgs,
  ]
}