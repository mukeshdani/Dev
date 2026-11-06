resource "azurerm_role_assignment" "main" {
  for_each = var.assignments

  scope                = each.value.scope_id
  role_definition_name = each.value.role_definition_name
  principal_id         = each.value.principal_id
  principal_type       = each.value.principal_type
}
