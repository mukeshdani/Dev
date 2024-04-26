variable "userage"{
    type = map 
    default = {
        "gaurav" = 22 
        "saurav" = 20
    }
}

//Sttaic 
output "userage" {
  value = " My name is gaurav and  my age is ${lookup(var.userage , "gaurav")}"
}


//dynamic 

variable "username" {
  type = string
}

output "userage2" {
   value = "My name is ${var.username} , and my age is ${lookup(var.userage , "${var.username}")}"
}



