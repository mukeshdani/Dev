import logging
from data_processors.validators.base_validator import BaseValidator
import pandas as pd
logger = logging.getLogger(__name__)


class DemandValidator(BaseValidator):

    SHEET = 'Demand'
    VALID_HEADER = ['Date (dd/mm/yy hh:mm:ss n)', "Station Name", "Demand"]
    OUT_HEADER = ["index", "date", "station_name", "demand"]

    MANDATORY_COLS = ['Date (dd/mm/yy hh:mm:ss n)', "Station Name"]

    NUMBER_TYPE_COLS = ['Demand']

    STRING_TYPE_COLS = ['Station Name']

    DATETIME_TYPE_COLS = ['Date (dd/mm/yy hh:mm:ss n)']

    IN_TO_OUT_HEADER_MAP = {
        "Date (dd/mm/yy hh:mm:ss n)": "date",
        "Station Name": "station_name",
        "Demand": "demand"
    }

    def __init__(self, validator):
        self.problems = []
        logger.info(f"::: Validate {DemandValidator.SHEET} :::")
        self.df = validator.df_dict.get(self.SHEET)
        self.new_df = pd.DataFrame(index=self.df.index)
        self.header = self.df.columns.to_list()
        self.rid = validator.rid

    def validate_header(self):
        return BaseValidator.validate_header(self)

    def type_validator(self):
        BaseValidator.string_type_validator(self, self.STRING_TYPE_COLS)

        BaseValidator.number_type_validator(self, self.NUMBER_TYPE_COLS)
        BaseValidator.datetime_type_validator(self, self.DATETIME_TYPE_COLS, _format="%d/%m/%y %H:%M:%S")

        BaseValidator.positive_number_validator(self, ['Demand'])

    def process(self):
        self.type_validator()

    def resample_df(self):
        _df = self.df.set_index('Date (dd/mm/yy hh:mm:ss n)')
        self.df = _df.groupby('Station Name').resample('1H')['Demand'].sum().reset_index()

    def value_changes(self):
        # For Case Insensitive
        self.df['Date (dd/mm/yy hh:mm:ss n)'] = pd.to_datetime(self.df['Date (dd/mm/yy hh:mm:ss n)'], format='%d/%m/%y %H:%M:%S')
        # print(self.df.head())
        # print(self.df.dtypes())
        # print(1/0)
        self.resample_df()

        # order_id
        self.df['index'] = self.df.index

        self.df['Demand'] = self.df['Demand'].fillna(0)



    def sanitize(self):
        self.value_changes()
        self.new_df = self.df
        self.new_df.rename(columns=self.IN_TO_OUT_HEADER_MAP, inplace=True)
        self.new_df = self.new_df[self.OUT_HEADER]
        logger.info(f"({self.SHEET} sanitize) columns: {self.new_df.columns.to_list()}")




