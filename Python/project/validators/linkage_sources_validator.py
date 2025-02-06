from utils.required_enum_sheets import LinkageSourcesColumns
from .base_validator import Validator

class LinkageSourcesValidator(Validator):
    def validate(self):
        required_columns = [
            LinkageSourcesColumns.SOURCE,
            LinkageSourcesColumns.FUEL_TYPE,
            LinkageSourcesColumns.USAGE,
            LinkageSourcesColumns.SOURCE_CAPACITY_MT,
            LinkageSourcesColumns.TIME_PERIOD,
            LinkageSourcesColumns.PLANT,
            LinkageSourcesColumns.ASH_PERCENTAGE,
            LinkageSourcesColumns.MOISTURE_PERCENTAGE,
            LinkageSourcesColumns.SULPHUR_PERCENTAGE,
            LinkageSourcesColumns.GCV_ADB_KCAL_KG,
            LinkageSourcesColumns.COST_PAISE_1000_KCAL
        ]
        
        if not self.validate_headers(required_columns):
            return self.errors

        self.delete_invalid_rows(LinkageSourcesColumns.SOURCE_CAPACITY_MT.value)
        
        self.validate_string(LinkageSourcesColumns.SOURCE.value)
        self.validate_column(LinkageSourcesColumns.FUEL_TYPE.value, self.is_non_empty_string)
        self.validate_column(LinkageSourcesColumns.USAGE.value, self.is_non_empty_string)
        self.validate_numeric(LinkageSourcesColumns.SOURCE_CAPACITY_MT.value)
        self.validate_date(LinkageSourcesColumns.TIME_PERIOD.value)
        self.validate_string(LinkageSourcesColumns.PLANT.value)
        self.validate_common_range(LinkageSourcesColumns.ASH_PERCENTAGE.value)
        self.validate_common_range(LinkageSourcesColumns.MOISTURE_PERCENTAGE.value)
        self.validate_common_range(LinkageSourcesColumns.SULPHUR_PERCENTAGE.value)
        self.validate_column(LinkageSourcesColumns.GCV_ADB_KCAL_KG.value, self.is_positive_number)
        self.validate_column(LinkageSourcesColumns.COST_PAISE_1000_KCAL.value, self.is_positive_number)
        return self.errors
