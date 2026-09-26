module "ars" {
  source = "../child_module/rg"

  providers = {
    azurerm = azurerm.azure_prod
  }
}

module "ars2" {
  source = "../child_module/gcp_project"

  providers = {
    gcp = gcp.gcp_prod
  }
}

# git cherry-pick c1
# git cherry-pick c1

# git merging commands

# git rebase

# git merge 

# git pull

# working branch

