import pandas as pd
import mimetypes
from utils.error_messages import ErrorMessages, format_error_message
from utils.response_handler import ResponseHandler
from utils.required_enum_sheets import RequiredSheets
from validators.clinker_demand_validator import ClinkerDemandValidator
from validators.linkage_sources_validator import LinkageSourcesValidator
from validators.other_sources_validator import OtherSourcesValidator
from validators.cost_matrix_validator import CostMatrixValidator
from validators.opening_inventory_validator import OpeningInventoryValidator
from validators.inventory_constraints_validator import InventoryConstraintsValidator

validator_mapping = {
    RequiredSheets.CLINKER_DEMAND.value: ClinkerDemandValidator,
    RequiredSheets.LINKAGE_SOURCES.value: LinkageSourcesValidator,
    RequiredSheets.OTHER_SOURCES.value: OtherSourcesValidator,
    RequiredSheets.COST_MATRIX.value: CostMatrixValidator,
    RequiredSheets.OPENING_INVENTORY.value: OpeningInventoryValidator,
    RequiredSheets.INVENTORY_CONSTRAINTS.value: InventoryConstraintsValidator
}

class ExcelValidator:
    def __init__(self, file):
        self.file = file

    def validate_file(self):
        if not self.file:
            return ResponseHandler.error(ErrorMessages.NO_FILE_PART)
        
        if not self.file.filename.endswith('.xlsx'):
            return ResponseHandler.error(ErrorMessages.NOT_EXCEL_FILE)
        
        mime_type, _ = mimetypes.guess_type(self.file.filename)
        if mime_type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return ResponseHandler.error(ErrorMessages.NOT_EXCEL_FILE)
        
        return ResponseHandler.success(ErrorMessages.VALID_FILE)

    def validate_excel(self):
        try:
            excel_data = pd.ExcelFile(self.file.stream)
        except Exception as e:
            return ResponseHandler.error(str(e))
        
        missing_sheets = {sheet.value for sheet in RequiredSheets} - set(excel_data.sheet_names)
        if missing_sheets:
            return ResponseHandler.error(format_error_message(ErrorMessages.SHEETS_MISSING, sheets=", ".join(missing_sheets)))
        
        return ResponseHandler.success(ErrorMessages.EXCEL_VALID)

    def validate_data(self):
        excel_data = pd.ExcelFile(self.file.stream)
        errors = []

        def validate_sheet(sheet_name):
            df = pd.read_excel(self.file.stream, sheet_name=sheet_name)
            validator_class = validator_mapping.get(sheet_name)
            if validator_class:
                validator = validator_class(df, sheet_name)
                return validator.validate()
            return []

        errors.extend([error for error in map(validate_sheet, validator_mapping.keys()) if error])

        if errors:
            return ResponseHandler.error(errors)
        return ResponseHandler.success(ErrorMessages.ALL_DATA_VALID)

    def validation(self):
        response, status_code = self.validate_file()
        if status_code == 200:
            response, status_code = self.validate_excel()
        if status_code == 200:
            response, status_code = self.validate_data()
        return response, status_code
