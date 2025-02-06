from utils.required_enum_sheets import OtherSourcesColumns
from .base_validator import Validator

class OtherSourcesValidator(Validator):
    def validate(self):
        required_columns = [
            OtherSourcesColumns.SOURCE,
            OtherSourcesColumns.SOURCE_TYPE,
            OtherSourcesColumns.FUEL_TYPE,
            OtherSourcesColumns.USAGE,
            OtherSourcesColumns.SOURCE_CAPACITY_MT,
            OtherSourcesColumns.TIME_PERIOD,
            OtherSourcesColumns.ASH_PERCENTAGE,
            OtherSourcesColumns.MOISTURE_PERCENTAGE,
            OtherSourcesColumns.SULPHUR_PERCENTAGE,
            OtherSourcesColumns.GCV_ADB_KCAL_KG
        ]
        
        if not self.validate_headers(required_columns):
            return self.errors

        self.delete_invalid_rows(OtherSourcesColumns.SOURCE_CAPACITY_MT.value)
        self.validate_string(OtherSourcesColumns.SOURCE.value)
        self.validate_column(OtherSourcesColumns.SOURCE_TYPE.value, self.is_non_empty_string)
        self.validate_column(OtherSourcesColumns.FUEL_TYPE.value, self.is_non_empty_string)
        self.validate_column(OtherSourcesColumns.USAGE.value, self.is_non_empty_string)
        self.validate_numeric(OtherSourcesColumns.SOURCE_CAPACITY_MT.value)
        self.validate_date(OtherSourcesColumns.TIME_PERIOD.value)
        self.validate_common_range(OtherSourcesColumns.ASH_PERCENTAGE.value)
        self.validate_common_range(OtherSourcesColumns.MOISTURE_PERCENTAGE.value)
        self.validate_common_range(OtherSourcesColumns.SULPHUR_PERCENTAGE.value)
        self.validate_column(OtherSourcesColumns.GCV_ADB_KCAL_KG.value, self.is_positive_number)
        return self.errors
