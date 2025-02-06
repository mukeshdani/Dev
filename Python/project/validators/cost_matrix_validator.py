from utils.required_enum_sheets import CostMatrixColumns
from .base_validator import Validator

class CostMatrixValidator(Validator):
    def validate(self):
        required_columns = [
            CostMatrixColumns.SOURCE,
            CostMatrixColumns.SOURCE_TYPE,
            CostMatrixColumns.FUEL_TYPE,
            CostMatrixColumns.USAGE,
            CostMatrixColumns.TIME_PERIOD,
            CostMatrixColumns.PLANT,
            CostMatrixColumns.COST_PAISE_1000_KCAL
        ]
        
        if not self.validate_headers(required_columns):
            return self.errors

        self.validate_string(CostMatrixColumns.SOURCE.value)
        self.validate_column(CostMatrixColumns.SOURCE_TYPE.value, self.is_non_empty_string)
        self.validate_column(CostMatrixColumns.FUEL_TYPE.value, self.is_non_empty_string)
        self.validate_column(CostMatrixColumns.USAGE.value, self.is_non_empty_string)
        self.validate_date(CostMatrixColumns.TIME_PERIOD.value)
        self.validate_string(CostMatrixColumns.PLANT.value)
        self.validate_numeric(CostMatrixColumns.COST_PAISE_1000_KCAL.value)
        return self.errors
