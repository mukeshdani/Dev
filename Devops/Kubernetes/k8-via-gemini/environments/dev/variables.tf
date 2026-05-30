variable "project_name" {
  type    = string
  default = "k8gemini"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "location" {
  type    = string
  default = "East US"
}

variable "tags" {
  type = map(string)
  default = {
    Environment = "Dev"
    Project     = "K8-Via-Gemini"
    ManagedBy   = "Terraform"
  }
}

variable "additional_node_pools" {
  type = map(object({
    node_count          = number
    vm_size             = string
    enable_auto_scaling = bool
    min_count           = number
    max_count           = number
  }))
  default = {}
}
