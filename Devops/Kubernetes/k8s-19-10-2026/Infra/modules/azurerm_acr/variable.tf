variable "acrs"{
    description = "A map of ACRs to create"
    type        = map(object({
        name                = string
        resource_group_name = string
        location            = string
        sku                 = string
    }))
}