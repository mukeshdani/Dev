output "resource_group_name" {
  description = "The dynamically provisioned Azure Resource Group name"
  value       = azurerm_resource_group.your_rg_resource_name.name
}

output "aks_cluster_name" {
  description = "The dynamically provisioned Azure Kubernetes Service cluster name"
  value       = azurerm_kubernetes_cluster.your_aks_resource_name.name
}
