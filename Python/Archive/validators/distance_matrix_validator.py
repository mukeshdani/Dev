import logging
from data_processors.validators.base_validator import BaseValidator
import pandas as pd
logger = logging.getLogger(__name__)


class DistanceMatrixValidator(BaseValidator):

    SHEET = 'Distance Matrix'
    VALID_HEADER = ['Daughter Station', "RTKM"]
    OUT_HEADER = ["index", "daughter_station", "rt_distance_km"]

    MANDATORY_COLS = ['Daughter Station', "RTKM"]

    NUMBER_TYPE_COLS = ['RTKM']

    STRING_TYPE_COLS = ['Daughter Station']

    IN_TO_OUT_HEADER_MAP = {
        "Daughter Station": "daughter_station",
        "RTKM": "rt_distance_km"
    }

    def __init__(self, validator):
        self.problems = []
        logger.info(f"::: Validate {self.SHEET} :::")
        self.df = validator.df_dict.get(self.SHEET)
        self.new_df = pd.DataFrame(index=self.df.index)
        self.header = self.df.columns.to_list()
        self.rid = validator.rid

    def validate_header(self):
        return BaseValidator.validate_header(self)

    def type_validator(self):
        BaseValidator.string_type_validator(self, self.STRING_TYPE_COLS)

        BaseValidator.number_type_validator(self, self.NUMBER_TYPE_COLS)

        BaseValidator.positive_number_validator(self, ['RTKM'])

    def process(self):
        self.type_validator()

    def value_changes(self):
        # For Case Insensitive

        # order_id
        self.df['index'] = self.df.index

    def sanitize(self):
        self.value_changes()
        self.new_df = pd.concat((self.df, self.new_df), axis=1)
        self.new_df.rename(columns=self.IN_TO_OUT_HEADER_MAP, inplace=True)
        self.new_df = self.new_df[self.OUT_HEADER]
        logger.info(f"({self.SHEET} sanitize) columns: {self.new_df.columns.to_list()}")




