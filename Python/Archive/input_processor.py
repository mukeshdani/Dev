import logging
import pandas as pd

from common.exceptions import ValidationError
from data_processors.output_processor import OutputProcessor

from data_processors.validators.base_validator import BaseValidator
logging.basicConfig(level=1)
logger = logging.getLogger(__name__)
from data_processors.validators.demand_validator import DemandValidator
from data_processors.validators.distance_matrix_validator import DistanceMatrixValidator
from data_processors.validators.stations_validator import StationsValidator
from data_processors.validators.vehicles_validator import VehiclesValidator
from data_processors.validators.transporter_validator import TransporterValidator

class InputValidator:

    VALID_INPUT_FILE_SHEETS = []

    demand_validator_obj: DemandValidator = None
    distance_matrix_validator_obj: DistanceMatrixValidator = None

    def __init__(self, rid, input_df_dict, **filters) -> None:
        self.input_df_dict = input_df_dict
        self._rid = rid
        self.problems = list()

        self.base_validator = BaseValidator(df_dict=input_df_dict, rid=self._rid)
        self.vehicles_validator = VehiclesValidator(self.base_validator)
        self.distance_matrix_validator = DistanceMatrixValidator(self.base_validator)
        self.demand_validator = DemandValidator(self.base_validator)
        self.stations_validator = StationsValidator(self.base_validator)
        self.transporter_validator = TransporterValidator(self.base_validator)

    def raise_problems(self):
        if self.problems:
            raise ValidationError(problems=self.problems)

    def validate_headers(self):
        valid = True
        if not self.vehicles_validator.validate_header():
            self.problems.extend(self.vehicles_validator.problems)
            valid = False

        if not self.distance_matrix_validator.validate_header():
            self.problems.extend(self.distance_matrix_validator.problems)
            valid = False

        if not self.demand_validator.validate_header():
            self.problems.extend(self.demand_validator.problems)
            valid = False

        if not self.stations_validator.validate_header():
            self.problems.extend(self.stations_validator.problems)
            valid = False

        if not self.transporter_validator.validate_header():
            self.problems.extend(self.transporter_validator.problems)
            valid = False
        return valid

    def validate_mandatory_fields(self):
        valid = True
        if not self.base_validator.check_MandatoryField(self.vehicles_validator):
            self.problems.extend(self.vehicles_validator.problems)
            valid = False

        if not self.base_validator.check_MandatoryField(self.distance_matrix_validator):
            self.problems.extend(self.distance_matrix_validator.problems)
            valid = False

        if not self.base_validator.check_MandatoryField(self.demand_validator):
            self.problems.extend(self.demand_validator.problems)
            valid = False

        if not self.base_validator.check_MandatoryField(self.stations_validator):
            self.problems.extend(self.stations_validator.problems)
            valid = False

        if not self.base_validator.check_MandatoryField(self.transporter_validator):
            self.problems.extend(self.transporter_validator.problems)
            valid = False
        return valid

    def validate_sheets(self):
        if not self.validate_headers():
            self.raise_problems()

        if not self.validate_mandatory_fields():
            self.raise_problems()

        self.demand_validator.process()

        self.problems.extend(self.demand_validator.problems)

        # raise problems
        self.raise_problems()

        self.sanitize_sheets()
        logger.info(f"Sheets Validated for rid: {self._rid}")

    def sanitize_sheets(self):

        self.vehicles_validator.sanitize()
        self.distance_matrix_validator.sanitize()
        self.distance_matrix_validator.sanitize()
        self.demand_validator.sanitize()
        self.stations_validator.sanitize()
        self.transporter_validator.sanitize()

class Demands:
    _demand_index_map = {}
    _time_period_index_value_map = {}
    _date_index_to_time_period_indexes_map = {}
    _time_period_index_to_date_index_map = {}


    def __init__(self, df):
        self.df = df
        self.set_demand_index_map()
        self.set_time_period_index_map()

    def set_time_period_index_map(self):
        time_period_index_map = {}
        # print(self.df.head())
        unique_dates = self.df['date'].unique()
        # print(unique_dates)
        time_period_index_map = {idx: dt.strftime("%d/%m/%Y %H:%M:%S") for idx, dt in enumerate(unique_dates)}
        self._time_period_index_value_map = time_period_index_map
        self._date_index_to_time_period_indexes_map = self.get_date_index_to_time_period_indexes_map()
        self._time_period_index_to_date_index_map = self.get_time_period_index_to_date_index_map()

    def get_date_index_to_time_period_indexes_map(self):
        time_period_index_to_day_index_map = {}
        time_period_map = self._time_period_index_value_map.copy()

        parsed_date_list = []
        date_index_to_datetime_indexes = {}
        from datetime import datetime
        for datetime_idx, datetime_val in time_period_map.items():
            _datetime = datetime.strptime(datetime_val, "%d/%m/%Y %H:%M:%S")
            date = _datetime.strftime("%d/%m/%Y")
            if date not in parsed_date_list:
                parsed_date_list.append(date)
            date_index = parsed_date_list.index(date)

            if date_index not in date_index_to_datetime_indexes.keys():
                date_index_to_datetime_indexes[date_index] = []
            if datetime_idx not in date_index_to_datetime_indexes[date_index]:
                date_index_to_datetime_indexes[date_index].append(datetime_idx)

        return date_index_to_datetime_indexes

    def get_time_period_index_to_date_index_map(self):
        return {date_time_idx: date_idx for date_idx, date_time_idx_list in self._date_index_to_time_period_indexes_map.items() for date_time_idx in date_time_idx_list}

    def set_demand_index_map(self):
        demand_index_map = {}
        for row in self.df.to_dict(orient="records"):
            row_idx = row.get('index')
            if row_idx is None or row_idx in demand_index_map.keys():
                continue
            _row = row.copy()
            _row['date'] = _row['date'].strftime("%d/%m/%Y %H:%M:%S")
            _row.pop('index')
            demand_index_map[row_idx] = _row

        self._demand_index_map = demand_index_map

    @property
    def index_to_demand_map(self):
        return self._demand_index_map

    @property
    def time_index_to_value_map(self):
        return self._time_period_index_value_map

    @property
    def time_value_to_index_map(self):
        return {v: k for k, v in self._time_period_index_value_map.items()}

    @property
    def date_index_to_time_period_indexes_map(self):
        return self._date_index_to_time_period_indexes_map

    @property
    def time_period_index_to_date_index_map(self):
        return self._time_period_index_to_date_index_map

class Vehicles:
    _vehicle_index_map = {}
    _transporter_name_to_vehicles_map = {}

    def __init__(self, df):
        self.df = df
        self.set_vehicle_index_map()
        self.set_transporter_name_to_vehicles_map()

    def set_vehicle_index_map(self):
        vehicle_index_map = {}
        for row in self.df.to_dict(orient="records"):
            row_idx = row.get('index')
            if row_idx is None or row_idx in vehicle_index_map.keys():
                continue
            _row = row.copy()
            _row.pop('index')
            vehicle_index_map[row_idx] = _row

        self._vehicle_index_map = vehicle_index_map

    def set_transporter_name_to_vehicles_map(self):
        transporter_name_to_vehicles_map = {}
        _df = self.df.copy()
        groups = _df.groupby('transporter_name')
        transporter_name_to_vehicles_map = {transporter_name: group.to_dict(orient='records') for transporter_name, group in groups if not group.empty }
        self._transporter_name_to_vehicles_map = transporter_name_to_vehicles_map

    @property
    def all_vehicles(self):
        return self.df.to_dict(orient='records')
    @property
    def index_to_vehicle_map(self):
        return self._vehicle_index_map

    @property
    def transporter_name_to_vehicles_map(self):
        return self._transporter_name_to_vehicles_map

class Stations:
    _station_index_map = {}
    _station_idx_to_name_map = {}
    _mother_station_idx_to_name_map = {}
    _mother_to_daughter_stations_map = {}

    def __init__(self, df):
        self.df = df
        self.set_station_index_map()
        self.set_station_index_to_name_map()
        self.set_mother_station_idx_to_name_map()
        self.set_mother_to_daughter_stations_map()

    def set_mother_to_daughter_stations_map(self):
        # todo GA groupby
        mother_to_daughter_stations_map = {}
        _df = self.df.copy()
        for _, mother_station in  self._mother_station_idx_to_name_map.items():

            if mother_station not in mother_to_daughter_stations_map.keys():
                mother_to_daughter_stations_map[mother_station] = list()

            mother_station_bool = _df['mother_station'] == mother_station
            remove_mother_station = _df['station'] != mother_station
            filter_bool = mother_station_bool & remove_mother_station
            daughter_stations = _df[filter_bool]['station'].to_list()

            mother_to_daughter_stations_map[mother_station].extend(daughter_stations)

        self._mother_to_daughter_stations_map = mother_to_daughter_stations_map

    def set_station_index_to_name_map(self):
        _df = self.df.copy()
        index_dicts = _df.set_index('index').to_dict('index')
        station_idx_to_name_map = {idx: data_dict.get('station') for idx, data_dict in index_dicts.items() if data_dict.get('station')}
        self._station_idx_to_name_map = station_idx_to_name_map

    def set_mother_station_idx_to_name_map(self):
        _df = self.df.copy()
        mother_station_filter_bool = _df['mother_station'] == _df['station']
        _df = _df[mother_station_filter_bool]
        _mother_stations = _df['mother_station'].unique()

        station_idx_to_name_map = {idx: mother_station for idx, mother_station in enumerate(_mother_stations)}
        self._mother_station_idx_to_name_map = station_idx_to_name_map

    def set_station_index_map(self):
        station_index_map = {}
        for row in self.df.to_dict(orient="records"):
            row_idx = row.get('index')
            if row_idx is None or row_idx in station_index_map.keys():
                continue
            _row = row.copy()
            _row.pop('index')
            station_index_map[row_idx] = _row

        self._station_index_map = station_index_map

    @property
    def index_to_station_map(self):
        return self._station_index_map

    @property
    def mother_station_idx_to_name_map(self):
        return self._mother_station_idx_to_name_map

    @property
    def mother_to_daughter_stations_map(self):
        return self._mother_to_daughter_stations_map

    @property
    def station_name_to_idx_map(self):
        return {station.get('station'): idx for idx, station in self.index_to_station_map.items() if station.get('station')}

class DistanceMatrix:
    _distance_matrix_index_map = {}

    def __init__(self, df):
        self.df = df
        self.set_distance_matrix_index_map()

    def set_distance_matrix_index_map(self):
        distance_matrix_index_map = {}
        for row in self.df.to_dict(orient="records"):
            row_idx = row.get('daughter_station')
            if row_idx is None or row_idx in distance_matrix_index_map.keys():
                continue
            _row = row.copy()
            _row.pop('daughter_station')
            distance_matrix_index_map[row_idx] = _row

        self._distance_matrix_index_map = distance_matrix_index_map

    @property
    def daughter_station_distance_map(self):
        return self._distance_matrix_index_map

class Transporters:
    _transporter_name_map = {}
    _station_to_transporter_names_map = {}

    def __init__(self, df):
        self.df = df
        self.set_transporter_index_map()
        self.set_station_to_transporter_names_map()

    def set_station_to_transporter_names_map(self):
        station_to_transporter_names_map = {}
        for row in self.df.to_dict(orient="records"):
            transporter_name = row.get('transporter_name')
            stations_mapped = str(row.get('stations_mapped','')).strip().split(',') or []
            for station in stations_mapped:
                if station not in station_to_transporter_names_map.keys():
                    station_to_transporter_names_map[station] = []
                if transporter_name not in station_to_transporter_names_map.keys():
                    station_to_transporter_names_map[station].append(transporter_name)

        self._station_to_transporter_names_map = station_to_transporter_names_map

    def set_transporter_index_map(self):
        transporter_index_map = {}
        for row in self.df.to_dict(orient="records"):
            row_idx = row.get('transporter_name')
            if row_idx is None or row_idx in transporter_index_map.keys():
                continue
            _row = row.copy()
            _row.pop('transporter_name')
            transporter_index_map[row_idx] = _row

        self._transporter_name_map = transporter_index_map

    @property
    def transporter_name_to_transporter_map(self):
        return self._transporter_name_map
    @property
    def station_to_transporter_names_map(self):
        return self._station_to_transporter_names_map

class DataModel:

    def __init__(self, input_validator: InputValidator, rid='', job_config={}):
        self.job_config = job_config
        self.rid = rid
        self.demands = Demands(df=input_validator.demand_validator.new_df)
        self.stations = Stations(df=input_validator.stations_validator.new_df)
        self.vehicles = Vehicles(df=input_validator.vehicles_validator.new_df)
        self.distance_matrix = DistanceMatrix(df=input_validator.distance_matrix_validator.new_df)
        self.transporters = Transporters(df=input_validator.transporter_validator.new_df)

class ModelInputProcessor:
    rid = None

    model_input_dict = {}

    def __init__(self, data_model: DataModel):
        self.data_model = data_model
        self.model_input_dict = self.get_model_input_dict()

    def get_daughter_station_vehicles_list(self, daughter_station):

        transporters_mapped = self.data_model.transporters.station_to_transporter_names_map.get(daughter_station, None)
        vehicles = []
        if not transporters_mapped is None:

            for transporter_name in transporters_mapped:
                _transporter_vehicles = self.data_model.vehicles.transporter_name_to_vehicles_map.get(transporter_name, [])
                _transporter_vehicles = [veh for veh in _transporter_vehicles if veh not in vehicles]
                vehicles.extend(_transporter_vehicles)
            vehicles = vehicles
        else:
            # if transporters_mapped is None then All Vehicles
            vehicles = self.data_model.vehicles.all_vehicles
        return vehicles

    def get_model_data(self):

        def validate_model_data_row(row):
            mandatory_cols = ['time_period_idx', 'mother_station_idx', 'date_idx']
            for col in mandatory_cols:
                if row.get(col) is None:
                    return False
            if len(row.get('demand_list')) == 0:
                logger.info(f'validate_model_data_row : skipping : {row}')
                return False
            return True

        def validate_demand_dict(demand_dict):
            mandatory_cols = ['daughter_station_idx', 'demand_idx', 'demand', 'distance']
            for col in mandatory_cols:
                if demand_dict.get(col) is None:
                    return False
            if len(demand_dict.get('vehicles_idx_list')) == 0:
                logger.info(f'validate_demand_dict : skipping : {demand_dict}')
                return False
            return True

        model_data_rows = []
        demand_dict_template = dict(
            daughter_station_idx=None,
            demand_idx=None,
            demand=None,
            distance=None,
            vehicles_idx_list=[]
        )
        model_data_row_template = dict(
            time_period_idx=None,
            date_idx=None,
            mother_station_idx=None,
            demand_list=[]
        )
        parsed_time_period = []
        # print(f'demand_idxs: {self.data_model.demands.index_to_demand_map.keys()}')
        for time_period_idx in self.data_model.demands.time_value_to_index_map.values():
            for mother_station_idx, mother_station in self.data_model.stations.mother_station_idx_to_name_map.items():
                mother_station_dict = self.data_model.stations.index_to_station_map.get(mother_station_idx)
                # print(mother_station_idx, mother_station)
                demand_dict_list = []
                for demand_idx, demand_dict in self.data_model.demands.index_to_demand_map.items():
                    # if demand_idx == 2:
                    #     break
                    # print(demand_dict)
                    demand_time_period_idx = self.data_model.demands.time_value_to_index_map.get(demand_dict.get('date'))
                    if demand_time_period_idx != time_period_idx:
                        continue
                    # if time_period_idx in parsed_time_period:
                    #     continue
                    # parsed_time_period.append(time_period_idx)
                    demand_daughter_station = demand_dict.get('station_name')


                    if mother_station == demand_daughter_station:
                        continue

                    if demand_daughter_station in self.data_model.stations.mother_to_daughter_stations_map.get(mother_station, []):
                        # if daughter_station != demand_daughter_station:
                        #     continue
                        # print(demand_daughter_station)
                        # daughter_station_dict = self.stations.index_to_station_map.get(demand_station)

                        daughter_distance_matrix_dict = self.data_model.distance_matrix.daughter_station_distance_map.get(demand_daughter_station, {})

                        vehicles_list = self.get_daughter_station_vehicles_list(demand_daughter_station)
                        # print(vehicles_list)
                        _demand_dict = demand_dict_template.copy()
                        _demand_dict['daughter_station_idx'] = self.data_model.stations.station_name_to_idx_map.get(demand_daughter_station)
                        _demand_dict['demand_idx'] = demand_idx
                        _demand_dict['demand'] = demand_dict.get('demand')
                        _demand_dict['distance'] = daughter_distance_matrix_dict.get('rt_distance_km', 0)
                        _demand_dict['vehicles_idx_list'] = [vehicle.get('index') for vehicle in vehicles_list if vehicle.get('index', None) != None]

                        if validate_demand_dict(_demand_dict):
                            demand_dict_list.append(_demand_dict)


                _model_data_row = model_data_row_template.copy()
                _model_data_row['mother_station_idx'] = mother_station_idx
                _model_data_row['time_period_idx'] = time_period_idx
                _model_data_row['date_idx'] = self.data_model.demands.time_period_index_to_date_index_map.get(time_period_idx, None)


                _model_data_row['demand_list'] = demand_dict_list

                if validate_model_data_row(_model_data_row):
                    model_data_rows.append(_model_data_row)
        # print(1/0)
        return model_data_rows

    def get_model_input_dict(self):
        return dict(
            job_id=self.data_model.rid,
            job_config=self.data_model.job_config,
            demand_index_map=self.data_model.demands.index_to_demand_map,
            station_index_map=self.data_model.stations.index_to_station_map,
            vehicles_index_map=self.data_model.vehicles.index_to_vehicle_map,
            daughter_station_distance_map=self.data_model.distance_matrix.daughter_station_distance_map,
            transporter_name_map=self.data_model.transporters.transporter_name_to_transporter_map,
            time_period_index_map=self.data_model.demands.time_index_to_value_map,
            date_to_time_period_index_map=self.data_model.demands.date_index_to_time_period_indexes_map,
            model_data=self.get_model_data()
        )

    def save_model_input_json(self, filename='model_input', filepath='.'):
        import json
        import os
        _file_name = filename + '.json'
        _file_name = os.path.join(filepath, _file_name)
        with open(_file_name, 'w') as fp:
            json.dump(self.model_input_dict, fp, indent=4)
        print(f'save_model_input_json : MODEL INPUT SAVED AT : {_file_name}')




class InputProcessor:
    rid = None
    data_model = None


    def __init__(self, rid, input_file_path=None, input_df_dict=None, job_config={}, **filters):
        self.rid = rid
        self.job_config = job_config
        if input_file_path is None and input_df_dict is None:
            raise Exception("No Input Data Provided")
        if input_file_path:
            input_df_dict = pd.read_excel(input_file_path, sheet_name=None)

        self.input_validator = InputValidator(
            rid=self.rid,
            input_df_dict=input_df_dict,
            **filters
        )

    def post_validation_initalization(self):
        self.data_model = DataModel(input_validator=self.input_validator, rid=self.rid, job_config=self.job_config)

    def validate_file(self):
        self.input_validator.validate_sheets()

    def post_process_data(self):
        if self.data_model is None:
            return
        model_input_processor = ModelInputProcessor(data_model=self.data_model)
        model_input_processor.save_model_input_json()

    def process_output(self, solver_data):
        if self.data_model is None or solver_data is None:
            return
        output_processor = OutputProcessor(data_model=self.data_model, solver_output=solver_data)
        output_processor.process()
        from common.utils import list_to_df
        import os
        output_file_dir = '_files/output'
        output_filename = f'{self.rid}_ATGL_Demand_Allocation_output.xlsx'
        output_file_path = os.path.join(output_file_dir, output_filename)
        with pd.ExcelWriter(output_file_path) as writer:
            list_to_df(output_processor.output_list).copy().to_excel(writer, sheet_name='Results', index=False)












