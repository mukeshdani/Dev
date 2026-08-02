variable "rgs" {
    type = map(object({
        location = string
    }))

}
variable "k8s" {
    type = map(onject({
        rg_name = string
        dns_prefix = string
        default_node_pool_name = string
        default_node_pool_node_count = number
        default_node_pool_vm_size = string
        identity_type = string
    }))

}