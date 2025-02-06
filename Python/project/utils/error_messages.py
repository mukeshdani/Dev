class ErrorMessages:
    MISSING_COLUMNS = "Missing columns: {columns}"
    INVALID_DATA = "Invalid data in {column}"
    INVALID_FORMAT = "Invalid format in {column}"
    SHEETS_MISSING = "Sheets missing: {sheets}"
    EXCEL_VALID = "Excel file is valid"
    NO_FILE_PART = "No file part in the request"
    NOT_EXCEL_FILE = "The uploaded file is not an Excel file"
    ALL_DATA_VALID = "All data is valid"
    VALID_FILE = "The uploaded file is valid"
    CONSTRAINT_VIOLATION = "{max_column} must be greater than or equal to {min_column}"
    CONSTRAINT_VIOLATION_TYPE = "Constraint Violation"
    MAX_STOCK_DETAILS = "MAX STOCK: {max_stock}"
    SAFETY_STOCK_DETAILS = "SAFETY STOCK: {safety_stock}"
    INVALID_FORMAT_TYPE = "Invalid Format"
    INVALID_DATA_TYPE = "Invalid Data"
    MISSING_COLUMNS_TYPE = "Missing Columns"
    STRING_FORMAT_ISSUE = "String format issue in {column}: leading/trailing spaces or empty string"

def format_error_message(message, **kwargs):
    return message.format(**kwargs)
