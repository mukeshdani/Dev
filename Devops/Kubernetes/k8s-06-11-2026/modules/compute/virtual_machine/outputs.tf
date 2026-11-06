output "principal_id" {
  value = { for key, vm in azurerm_windows_virtual_machine.main : key => vm.identity[0].principal_id }
}
