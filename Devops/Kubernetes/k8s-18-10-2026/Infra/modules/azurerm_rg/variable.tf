variable "rgs" {
  type = map(object({
    name        = string
    location    = string
    environment = optional(string)
    managed_by  = optional(string)
  }))

  # Validation 1: Location Check
  validation {
    condition = alltrue([
      for rg in values(var.rgs) : contains(["East US", "West Europe", "Southeast Asia"], rg.location)
    ])
    error_message = "Location must be either 'East US', 'West Europe', or 'Southeast Asia'."
  }

  # Validation 2: Name prefix check ('rg-')
  validation {
    condition = alltrue([
      for rg in values(var.rgs) : startswith(lower(rg.name), "rg-")
    ])
    error_message = "Resource Group name must start with 'rg-'."
  }
}