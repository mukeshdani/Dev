variable "users" {
  type = list
}

output "printfirst" {
  value = var.users[1]
}



