terraform { 
    required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
            version = "4.80.0"
        }
    }

    # backend "azurerm"{
    #     resource_group_name = "rg_name"
    #     storage_account_name = "storage_name"
    #     container_name = "c_name"
    #     key = ""
    # }
}

provider "azurerm" {
    features {}
}