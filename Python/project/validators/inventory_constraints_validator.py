from utils.required_enum_sheets import InventoryConstraintsColumns
from utils.error_messages import ErrorMessages, format_error_message
from .base_validator import Validator

class InventoryConstraintsValidator(Validator):
    def validate(self):
        required_columns = [
            InventoryConstraintsColumns.PLANT,
            InventoryConstraintsColumns.TIME_PERIOD,
            InventoryConstraintsColumns.FUEL_TYPE,
            InventoryConstraintsColumns.SAFETY_STOCK_MT,
            InventoryConstraintsColumns.MAX_STOCK_MT
        ]
        
        if not self.validate_headers(required_columns):
            return self.errors

        self.df[InventoryConstraintsColumns.SAFETY_STOCK_MT.value] = self.df[InventoryConstraintsColumns.SAFETY_STOCK_MT.value].fillna(0)
        self.delete_invalid_rows(InventoryConstraintsColumns.SAFETY_STOCK_MT.value)
        self.df[InventoryConstraintsColumns.MAX_STOCK_MT.value] = self.df[InventoryConstraintsColumns.MAX_STOCK_MT.value].fillna(0)
        self.delete_invalid_rows(InventoryConstraintsColumns.MAX_STOCK_MT.value)
        
        self.validate_string(InventoryConstraintsColumns.PLANT.value)
        self.validate_date(InventoryConstraintsColumns.TIME_PERIOD.value)
        self.validate_column(InventoryConstraintsColumns.FUEL_TYPE.value, self.is_non_empty_string)
        self.validate_column(InventoryConstraintsColumns.SAFETY_STOCK_MT.value, self.is_non_negative)
        self.validate_column(InventoryConstraintsColumns.MAX_STOCK_MT.value, self.is_non_negative)
        self.check_constraints()
        return self.errors

    def check_constraints(self):
        constraint_violation_rows = self.df[~(self.df[InventoryConstraintsColumns.MAX_STOCK_MT.value] >= self.df[InventoryConstraintsColumns.SAFETY_STOCK_MT.value])]
        constraint_violation_rows.apply(lambda row: self.add_error(
            row.name, 
            ErrorMessages.CONSTRAINT_VIOLATION_TYPE, 
            format_error_message(ErrorMessages.CONSTRAINT_VIOLATION, max_column=InventoryConstraintsColumns.MAX_STOCK_MT.value, min_column=InventoryConstraintsColumns.SAFETY_STOCK_MT.value), 
            f"{format_error_message(ErrorMessages.MAX_STOCK_DETAILS, max_stock=row[InventoryConstraintsColumns.MAX_STOCK_MT.value])}, {format_error_message(ErrorMessages.SAFETY_STOCK_DETAILS, safety_stock=row[InventoryConstraintsColumns.SAFETY_STOCK_MT.value])}"
        ), axis=1)
