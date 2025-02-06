from utils.required_enum_sheets import ClinkerDemandColumns
from .base_validator import Validator

class ClinkerDemandValidator(Validator):
    def validate(self):
        required_columns = [
            ClinkerDemandColumns.PLANT,
            ClinkerDemandColumns.TIME_PERIOD,
            ClinkerDemandColumns.DEMAND_MT,
            ClinkerDemandColumns.SPECIFIC_HEAT,
            ClinkerDemandColumns.AFR_PERCENTAGE,
            ClinkerDemandColumns.ALLOWABLE_ASH_CONTENT_PERCENTAGE
        ]
        
        if not self.validate_headers(required_columns):
            return self.errors

        self.delete_invalid_rows(ClinkerDemandColumns.DEMAND_MT.value)
        
        self.validate_string(ClinkerDemandColumns.PLANT.value)
        self.validate_date(ClinkerDemandColumns.TIME_PERIOD.value)
        self.validate_numeric(ClinkerDemandColumns.DEMAND_MT.value)
        self.validate_column(ClinkerDemandColumns.SPECIFIC_HEAT.value, self.is_int_or_float)
        self.validate_common_range(ClinkerDemandColumns.AFR_PERCENTAGE.value)
        self.validate_common_range(ClinkerDemandColumns.ALLOWABLE_ASH_CONTENT_PERCENTAGE.value)
        return self.errors
