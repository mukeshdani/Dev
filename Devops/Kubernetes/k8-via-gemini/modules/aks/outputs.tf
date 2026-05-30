output "cluster_id" {
  value = azurerm_kubernetes_cluster.this.id
}

output "kube_config" {
  value     = azurerm_kubernetes_cluster.this.kube_config_raw
  sensitive = true
}

output "principal_id" {
  value = azurerm_kubernetes_cluster.this.identity[0].principal_id
}
