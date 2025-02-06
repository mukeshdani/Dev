import logging
from data_processors.validators.base_validator import BaseValidator
import pandas as pd
logger = logging.getLogger(__name__)


class TransporterValidator(BaseValidator):

    SHEET = 'Transporter'
    VALID_HEADER = ['Transporter Name', "Station Mapped", "GA"]
    OUT_HEADER = ["index", "transporter_name", 'stations_mapped', "ga"]

    MANDATORY_COLS = ['Transporter Name', "GA"]

    STRING_TYPE_COLS = ['Transporter Name', "Station Mapped", "GA"]

    IN_TO_OUT_HEADER_MAP = {
        "Transporter Name": "transporter_name",
        "Station Mapped": "stations_mapped",
        "GA": "ga"
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




