import pandas as pd
from utils.error_messages import ErrorMessages, format_error_message

class Validator:
    def __init__(self, df, sheet_name):
        self.df = df
        self.sheet_name = sheet_name
        self.errors = []

    def validate(self):
        raise NotImplementedError("Subclasses should implement this method")

    def is_non_empty_string(self, x):
        return isinstance(x, str) and x.strip() != ''

    def is_non_negative(self, x):
        return pd.notnull(x) and x >= 0

    def is_positive_number(self, x):
        return isinstance(x, (int, float)) and x > 0

    def is_int_or_float(self, x):
        return isinstance(x, (int, float))

    def add_error(self, row_index, error_type, error_message, error_details):
        self.errors.append({
            'sheet': self.sheet_name,
            'row': int(row_index + 2),
            'type': error_type,
            'message': error_message,
            'details': str(error_details)
        })

    def validate_string(self, column_name):
        self.df[column_name] = self.df[column_name].astype(str)
        invalid_mask = (
            ~self.df[column_name].apply(self.is_non_empty_string) |
            (self.df[column_name] != self.df[column_name].str.strip()) |
            (self.df[column_name].str.strip() == '')
        )
        invalid_rows = self.df[invalid_mask]
        self._add_errors(invalid_rows, column_name, ErrorMessages.INVALID_FORMAT_TYPE, ErrorMessages.STRING_FORMAT_ISSUE)

    def validate_date(self, column_name, date_format='%b-%y'):
        self.df[column_name] = pd.to_datetime(self.df[column_name], format=date_format, errors='coerce')
        invalid_dates = self.df[self.df[column_name].isna()]
        self._add_errors(invalid_dates, column_name, ErrorMessages.INVALID_FORMAT_TYPE, ErrorMessages.INVALID_FORMAT)

    def validate_numeric(self, column_name):
        self.df[column_name] = pd.to_numeric(self.df[column_name], errors='coerce')
        invalid_rows = self.df[~self.df[column_name].apply(self.is_positive_number)]
        self._add_errors(invalid_rows, column_name, ErrorMessages.INVALID_DATA_TYPE, ErrorMessages.INVALID_DATA, min_value=0, max_value=100)

    def validate_column(self, column_name, condition):
        invalid_rows = self.df[~self.df[column_name].apply(condition)]
        self._add_errors(invalid_rows, column_name, ErrorMessages.INVALID_DATA_TYPE, ErrorMessages.INVALID_DATA, min_value=0, max_value=100)

    def validate_range(self, column_name, min_value=0, max_value=100):
        invalid_rows = self.df[~self.df[column_name].between(min_value, max_value)]
        self._add_errors(invalid_rows, column_name, ErrorMessages.INVALID_DATA_TYPE, ErrorMessages.INVALID_DATA, min_value=min_value, max_value=max_value)

    def validate_common_range(self, column_name):
        self.validate_range(column_name)

    def _add_errors(self, invalid_rows, column_name, error_type, error_message, min_value=0, max_value=100):
        for row_index in invalid_rows.index:
            self.add_error(
                row_index,
                error_type,
                format_error_message(error_message, column=column_name, min_value=min_value, max_value=max_value),
                self.df.at[row_index, column_name]
            )

    def validate_headers(self, required_columns):
        missing_columns = [col.value for col in required_columns if col.value not in self.df.columns]
        if missing_columns:
            error_message = format_error_message(ErrorMessages.MISSING_COLUMNS, columns=", ".join(missing_columns))
            self.errors.append({
                'sheet': self.sheet_name,
                'type': ErrorMessages.MISSING_COLUMNS_TYPE,
                'message': error_message,
                'details': ", ".join(missing_columns)
            })
            return False
        return True

    def delete_invalid_rows(self, column_name):
        self.df[column_name] = pd.to_numeric(self.df[column_name], errors='coerce')
        self.df = self.df[self.df[column_name].notna() & (self.df[column_name] > 0)]
