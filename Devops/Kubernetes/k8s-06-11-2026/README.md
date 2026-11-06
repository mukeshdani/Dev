# Private Storage and Key Vault

This Terraform configuration creates one resource group, two peered VNets, a private Key Vault, and (after the secret is prepared) a Windows VM and private Blob Storage. Neither service is publicly accessible. The Blob private-endpoint subnet permits HTTPS only from the VM's fixed private IP. Set resource names and deployment settings in `terraform.tfvars`; the names are not generated. Repeated VNets, subnets, peerings, security rules, DNS links, and optional modules use `for_each`.

## Module folders

- `modules/resource_group`: resource group
- `modules/network/virtual_network`, `subnet`, `vnet_peering`, `network_security_group`, `subnet_nsg_association`: separate network resources
- `modules/compute/network_interface`, `virtual_machine`: separate VM resources
- `modules/storage/storage_account`: Storage Account resource
- `modules/key_vault/key_vault`: Key Vault resource
- `modules/shared/private_endpoint`, `private_dns_zone`, `dns_link`, `role_assignment`: reusable modules called by both Storage and Key Vault with resource-specific inputs

Network, compute, Storage Account, and Key Vault each have separate folders. Shared resources such as private endpoints, private DNS zones/links, and role assignments are implemented once and reused by both Storage and Key Vault. `moved.tf` maps older combined-module Terraform addresses to the split modules for existing state migration.

Every repeatable Azure resource (resource groups, VNets, subnets, peerings, NSGs, NICs, VMs, Key Vaults, storage accounts, private DNS resources, endpoints, and role assignments) is map-driven with `for_each` and uses `each.value` inside the resource. The two `azurerm_client_config`/secret lookups are data sources, not managed resources; the secret lookup also uses `for_each`. Terraform still requires `var.*` to read module input maps—`each.value` is only available inside a `for_each` block.

## Deploy

Run Terraform from a machine that has private network and DNS access to the Key Vault private endpoint. In `terraform.tfvars`, change the `allow_terraform_runner_https` rule under `network_security_groups.key_vault_private_endpoint.rules` to match that machine's private source CIDR.

1. Configure a secure remote Terraform backend and authenticate to Azure. The Key Vault module grants the current Terraform identity the `Key Vault Secrets Officer` role; the identity must be allowed to create role assignments.
2. Create the network and private Key Vault:

   ```powershell
   terraform init
   terraform apply
   ```

3. From the private network, add the VM administrator password to the Key Vault. Use a password meeting Azure's Windows VM complexity requirements:

   ```powershell
   $vaultName = terraform output -raw key_vault_name
   $securePassword = Read-Host "Enter the VM administrator password" -AsSecureString
   $passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
   try {
     $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
     az keyvault secret set --vault-name $vaultName --name vm-admin-password --value $password --output none
     if ($LASTEXITCODE -ne 0) { throw "Could not set the Key Vault password secret." }
   }
   finally {
     [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
     Remove-Variable password, securePassword -ErrorAction SilentlyContinue
   }
   ```

4. Deploy the VM and storage account. Terraform reads the password over the private endpoint:

   ```powershell
   terraform apply -var="deploy_vm=true"
   ```

The secret value is marked sensitive, but Terraform and Azure still store the VM password in Terraform state. Protect the remote state with encryption and tightly scoped access. Do not commit state or plan files.
