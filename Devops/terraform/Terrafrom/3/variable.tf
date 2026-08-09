variable username {}
output printname{
    value= var.username
}

output "name" {
  value  = "hello ${var.username}"
}
