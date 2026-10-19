variable "subnets" {
    type = map(object({
        name = string 
        location = string
        resource_group_name = string
        virtual_network_name = string
        address_prefixes = list(string)
    }))
  
}