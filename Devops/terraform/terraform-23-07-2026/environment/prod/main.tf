module "resourec_group" {
  source = "../../modules/azurerm_resource_group"
  rgs    = var.rgs
}

module "virtual_network"{
    source = "../../modules/azurerm_virtual_network"
    vnet = var.vnet
}

module "subnet"{
    source = "../../modules/azurerm_subnet"
    subnet = var.subnet
}

module "public_ip"{
    source = "../../modules/azurerm_public_ip"
    pip = var.pip
}

module "network_interface"{
    source = "../../modules/azurerm_network_interface"
    nic = var.nic
}

module "virtual_machine"{
    source = "../../modules/azurerm_virtual_machine"
    vm = var.vm
}