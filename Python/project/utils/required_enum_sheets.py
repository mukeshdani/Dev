from enum import Enum


class RequiredSheets(Enum):
    CLINKER_DEMAND = 'ClinkerDemand'
    LINKAGE_SOURCES = 'LinkageSources'
    OTHER_SOURCES = 'OtherSources'
    COST_MATRIX = 'CostMatrix'
    OPENING_INVENTORY = 'OpeningInventory'
    INVENTORY_CONSTRAINTS = 'InventoryConstraints'
    QUALITY_CONSTRAINTS = 'QualityConstraints'
    SOURCE_CONSTRAINTS = 'SourceConstraints'

class ClinkerDemandColumns(Enum):
    PLANT = 'PLANT'
    TIME_PERIOD = 'TIME PERIOD (MMM-YY)'
    DEMAND_MT = 'DEMAND (MT)'
    SPECIFIC_HEAT = 'SPECIFIC HEAT (Kcal/Kg)'
    AFR_PERCENTAGE = 'AFR (%)'
    ALLOWABLE_ASH_CONTENT_PERCENTAGE = 'ALLOWABLE ASH CONTENT (%)'

class LinkageSourcesColumns(Enum):
    SOURCE = 'SOURCE'
    FUEL_TYPE = 'FUEL TYPE'
    USAGE = 'USAGE'
    SOURCE_CAPACITY_MT = 'SOURCE CAPACITY (MT)'
    TIME_PERIOD = 'TIME PERIOD (MMM-YY)'
    PLANT = 'PLANT'
    ASH_PERCENTAGE = 'ASH (%)'
    MOISTURE_PERCENTAGE = 'MOISTURE (%)'
    SULPHUR_PERCENTAGE = 'SULPHUR (%)'
    GCV_ADB_KCAL_KG = 'GCV(ADB) (Kcal/Kg)'
    COST_PAISE_1000_KCAL = 'COST (paise/1000 Kcal)'

class CostMatrixColumns(Enum):
    SOURCE = 'SOURCE'
    SOURCE_TYPE = 'SOURCE TYPE'
    FUEL_TYPE = 'FUEL TYPE'
    USAGE = 'USAGE'
    TIME_PERIOD = 'TIME PERIOD (MMM-YY)'
    PLANT = 'PLANT'
    COST_PAISE_1000_KCAL = 'COST (paise/1000 Kcal)'

class InventoryConstraintsColumns(Enum):
    PLANT = 'PLANT'
    TIME_PERIOD = 'TIME PERIOD (MMM-YY)'
    FUEL_TYPE = 'FUEL TYPE'
    SAFETY_STOCK_MT = 'SAFETY STOCK (MT)'
    MAX_STOCK_MT = 'MAX STOCK (MT)'

class OpeningInventoryColumns(Enum):
    PLANT = 'PLANT'
    INVENTORY_SOURCE = 'INVENTORY SOURCE'
    SOURCE_TYPE = 'SOURCE TYPE'
    FUEL_TYPE = 'FUEL TYPE'
    USAGE = 'USAGE'
    QUANTITY_MT = 'QUANTITY (MT)'
    ASH_PERCENTAGE = 'ASH (%)'
    MOISTURE_PERCENTAGE = 'MOISTURE (%)'
    SULPHUR_PERCENTAGE = 'SULPHUR (%)'
    GCV_ADB_KCAL_KG = 'GCV(ADB) (Kcal/Kg)'
    COST_PAISE_1000_KCAL = 'COST (paise/ 1000 Kcal)'

class OtherSourcesColumns(Enum):
    SOURCE = 'SOURCE'
    SOURCE_TYPE = 'SOURCE TYPE'
    FUEL_TYPE = 'FUEL TYPE'
    USAGE = 'USAGE'
    SOURCE_CAPACITY_MT = 'SOURCE CAPACITY (MT)'
    TIME_PERIOD = 'TIME PERIOD (MMM-YY)'
    ASH_PERCENTAGE = 'ASH (%)'
    MOISTURE_PERCENTAGE = 'MOISTURE (%)'
    SULPHUR_PERCENTAGE = 'SULPHUR (%)'
    GCV_ADB_KCAL_KG = 'GCV(ADB) (Kcal/Kg)'
