import logging
import pandas as pd
from pandas.api.types import is_string_dtype
import re
from typing import List
from common.exceptions import ValidationError, InvalidRequest
from common import utils
from constants.app_constants import NUMBER_DTYPE_KIND

logger = logging.getLogger(__name__)


class BaseValidator:
    VALID_INPUT_SHEETS = ['Vehicles', 'Distance Matrix', 'Demand', 'Stations', 'Transporter']

    def __init__(self, df_dict=None, rid=None):
        logger.info(":: BaseValidator init::")
        # FileStorage Object
        # self.file = self.validate_file(file)
        self.df_dict = df_dict
        self.rid = rid
        self.validate_sheets()

    def validate_sheets(self):
        # open an Excel file and return a workbook
        if not set(BaseValidator.VALID_INPUT_SHEETS).issubset(set(self.df_dict.keys())):
            raise InvalidRequest(message=f"Sheet not found!, Valid Sheets: {BaseValidator.VALID_INPUT_SHEETS}")

    @staticmethod
    def validate_header(validator) -> bool:
        """
        Validate validator Headers
        """
        valid_header = validator.VALID_HEADER.copy()
        actual_header = validator.header.copy()
        if set(valid_header) != set(actual_header):
            rows = utils.get_header_error_response(valid_header, actual_header)
            message = f"Invalid {validator.SHEET} Headers!"
            validator.problems.extend(BaseValidator.add_problem([-1], rows, message, validator.SHEET))
            return False
        return True

    @staticmethod
    def add_problem(idx, rows, message, sheet):
        problem = []
        if not rows and len(idx) == 1:
            problem.append(dict(row_number=idx[0] + 2, row=dict(), message=message, sheet=sheet))
            return problem

        x = pd.DataFrame(rows).fillna("").to_json(orient="records")
        rows = pd.read_json(x, orient="records").to_dict(orient='records')
        for i, row in zip(idx, rows):
            # 2 = 0-indexing + header-row
            problem.append(dict(row_number=i + 2, row=row, message=message, sheet=sheet))
        return problem

    @staticmethod
    def check_MandatoryField(self):
        valid = True
        for col in self.MANDATORY_COLS:
            check_null = self.df[col].isnull()
            if not check_null.all() and check_null.any():
                idx = self.df[check_null].index.to_list()
                rows = self.df.loc[idx].to_dict(orient="records")
                message = f"Mandatory field ({col}) not provided"
                self.problems.extend(BaseValidator.add_problem(idx, rows, message, self.SHEET))
                valid = False
            elif check_null.all():
                message = f"Mandatory Column ({col}) not provided"
                self.problems.extend(BaseValidator.add_problem([-1], list(), message, self.SHEET))
                valid = False

    @staticmethod
    def number_type_validator(self, columns):
        invalid_cols = []
        for col_name in columns:
            if self.df[col_name].dtype.kind not in NUMBER_DTYPE_KIND:
                invalid_cols.append(col_name)

        if invalid_cols:
            message = f"Number Type Validation Failed for {','.join(invalid_cols)}"
            self.problems.extend(BaseValidator.add_problem([-1], dict(), message, self.SHEET))
            raise ValidationError(problems=self.problems)

    @staticmethod
    def string_type_validator(self, cols):
        invalid_cols = list()
        for col in cols:
            if not is_string_dtype(self.df[col]):
                invalid_cols.append(col)

        if invalid_cols:
            message = f"String Type Validation Failed for ({', '.join(invalid_cols)})"
            self.problems.extend(BaseValidator.add_problem([-1], dict(), message, self.SHEET))

    @staticmethod
    def datetime_type_validator(self, cols, _format=None):
        for col in cols:
            cols1 = self.df[pd.to_datetime(self.df[col], format=_format, errors='coerce', exact=True).isna()]
            indices = cols1.index.tolist()
            rows = self.df.loc[indices].to_dict(orient='records')

            if rows:
                message = f"Datetime Type Validation Failed for these rows"
                self.problems.extend(BaseValidator.add_problem(indices, rows, message, self.SHEET))

    @staticmethod
    def positive_number_validator(self, columns):
        error = False
        for column in columns:
            col_not_null = self.df[column].notnull()
            col = self.df[col_not_null][column]
            if (col < 0).any():
                indexes = col[col < 0].index
                rows = self.df.loc[indexes].to_dict(orient='records')
                message = f"{column} value should be >= 0"
                self.problems.extend(BaseValidator.add_problem(indexes, rows, message, self.SHEET))
                error = True
        if error:
            raise ValidationError(problems=self.problems)

    @staticmethod
    def strip_whitespace(string):
        string = re.sub(r"\s+", "", string, flags=re.UNICODE)
        return string

    @staticmethod
    def validate_comma_sep_string_col(column: pd.Series) -> pd.Series:
        col = column.copy()
        col = col.fillna('')
        col = col.apply(lambda x: BaseValidator.strip_whitespace(x))
        return col

    @staticmethod
    def df_to_csv(self):
        self.new_df.to_csv(f"{self.rid}_{self.SHEET}.csv", index=False)

    # def raise_errors(self):
    #     raise ValidationError(errors=self.errors)
    #
    # @property
    # def processed_df(validator):
    #     return validator.post_df

