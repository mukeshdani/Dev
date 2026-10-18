resource "azurerm_resource_group" "rgs"{
    for_each  = var.rgs
    name = each.value.name
    location = each.value.location

    tags = merge(
        local.common_tags,
           {for k, v in {
                environment = try(each.value.environment, null)
                managed_by = try(each.value.managed_by, null)
                cost_center = try(each.value.cost_center, null)
                owner = try(each.value.owner, null)
            } : k => v if v != null && v != ""
           }
    )

    lifecycle{
        # prevent_destroy (Accidental Deletion Rokne ke Liye)
        # ignore_changes (Drift/External Changes Ignore Karne ke Liye)
        # create_before_destroy (Zero Downtime Re-creation ke Liye)
        # replace_triggered_by (Kisi Doosre Resource ke Change par Recreate Karna)
        # Custom Preconditions & Postconditions (Validation Checks)
        # A: precondition (Pehle Check)
        # B: postcondition (Baad Mein Check)
        prevent_destroy = true

        ignore_changes = [
            tags,
        ]
    }
}