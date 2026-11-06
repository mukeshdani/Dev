variable "assignments" {
  type = map(object({
    scope_id             = string
    role_definition_name = string
    principal_id         = string
    principal_type       = optional(string)
  }))
}
