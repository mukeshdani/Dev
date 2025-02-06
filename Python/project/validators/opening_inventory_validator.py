from utils.required_enum_sheets import OpeningInventoryColumns
from .base_validator import Validator

class OpeningInventoryValidator(Validator):
    def validate(self):
        required_columns = [
            OpeningInventoryColumns.PLANT,
            OpeningInventoryColumns.INVENTORY_SOURCE,
            OpeningInventoryColumns.SOURCE_TYPE,
            OpeningInventoryColumns.FUEL_TYPE,
            OpeningInventoryColumns.USAGE,
            OpeningInventoryColumns.QUANTITY_MT,
            OpeningInventoryColumns.ASH_PERCENTAGE,
            OpeningInventoryColumns.MOISTURE_PERCENTAGE,
            OpeningInventoryColumns.SULPHUR_PERCENTAGE,
            OpeningInventoryColumns.GCV_ADB_KCAL_KG,
            OpeningInventoryColumns.COST_PAISE_1000_KCAL
        ]
        
        if not self.validate_headers(required_columns):
            return self.errors

        self.delete_invalid_rows(OpeningInventoryColumns.QUANTITY_MT.value)
        self.validate_string(OpeningInventoryColumns.PLANT.value)
        self.validate_string(OpeningInventoryColumns.INVENTORY_SOURCE.value)
        self.validate_column(OpeningInventoryColumns.SOURCE_TYPE.value, self.is_non_empty_string)
        self.validate_column(OpeningInventoryColumns.FUEL_TYPE.value, self.is_non_empty_string)
        self.validate_column(OpeningInventoryColumns.USAGE.value, self.is_non_empty_string)
        self.validate_numeric(OpeningInventoryColumns.QUANTITY_MT.value)
        self.validate_common_range(OpeningInventoryColumns.ASH_PERCENTAGE.value)
        self.validate_common_range(OpeningInventoryColumns.MOISTURE_PERCENTAGE.value)
        self.validate_common_range(OpeningInventoryColumns.SULPHUR_PERCENTAGE.value)
        self.validate_column(OpeningInventoryColumns.GCV_ADB_KCAL_KG.value, self.is_positive_number)
        self.validate_column(OpeningInventoryColumns.COST_PAISE_1000_KCAL.value, self.is_positive_number)
        return self.errors
