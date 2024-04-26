variable "age" {
  type = number
}
variable "agename" {
  type = string
}
output "nameage" {
  value = "My name is ${var.agename} , and my age is ${var.age} ."
}

