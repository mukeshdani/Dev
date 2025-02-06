from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Define the required sheets and columns
required_sheets = {
    'ClinkerDemand': ['PLANT', 'TIME PERIOD (MMM-YY)', 'DEMAND (MT)', 'SPECIFIC HEAT (Kcal/Kg)', 'AFR (%)', 'ALLOWABLE ASH CONTENT (%)'],
    'LinkageSources': ['SOURCE', 'FUEL TYPE', 'USAGE', 'SOURCE CAPACITY (MT)', 'TIME PERIOD (MMM-YY)', 'PLANT', 'ASH (%)', 'MOISTURE (%)', 'SULPHUR (%)', 'GCV(ADB) (Kcal/Kg)', 'COST (paise/1000 Kcal)'],
    'OtherSources': ['SOURCE', 'SOURCE TYPE', 'FUEL TYPE', 'USAGE', 'SOURCE CAPACITY (MT)', 'TIME PERIOD (MMM-YY)', 'ASH (%)', 'MOISTURE (%)', 'SULPHUR (%)', 'GCV(ADB) (Kcal/Kg)'],
    'CostMatrix': ['SOURCE', 'SOURCE TYPE', 'FUEL TYPE', 'USAGE', 'TIME PERIOD (MMM-YY)', 'PLANT', 'COST (paise/1000 Kcal)'],
    'OpeningInventory': ['PLANT', 'INVENTORY SOURCE', 'SOURCE TYPE', 'FUEL TYPE', 'USAGE', 'QUANTITY (MT)', 'ASH (%)', 'MOISTURE (%)', 'SULPHUR (%)', 'GCV(ADB) (Kcal/Kg)', 'COST (paise/ 1000 Kcal)'],
    'InventoryConstraints': ['PLANT', 'TIME PERIOD (MMM-YY)', 'FUEL TYPE', 'SAFETY STOCK (MT)', 'MAX STOCK (MT)'],
    'QualityConstraints': ['PLANT', 'TIME PERIOD (MMM-YY)', 'QUALITY PARAMETER', 'BOUND TYPEID', 'VALUE TYPEID', 'VALUE'],
    'SourceConstraints': ['SOURCE', 'SOURCE TYPE', 'FUEL TYPE', 'PLANT', 'TIME PERIOD (MMM-YY)', 'BOUND TYPEID', 'VALUE TYPEID', 'VALUE']
}

def validate_excel(file_path):
    try:
        excel_data = pd.ExcelFile(file_path)
    except Exception as e:
        return {'error': str(e)}, 400
    
    # Check for required sheets
    for sheet_name in required_sheets.keys():
        if sheet_name not in excel_data.sheet_names:
            return {'error': f'Sheet {sheet_name} is missing'}, 400
        
        # Check for required columns in each sheet
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        for column in required_sheets[sheet_name]:
            if column not in df.columns:
                return {'error': f'Column {column} is missing in sheet {sheet_name}'}, 400
    
    # If all checks pass, return success message
    return {'message': 'Excel file is valid'}, 200

def delete_invalid_rows(file_path):
    excel_data = pd.ExcelFile(file_path)
    
    for sheet_name in excel_data.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        if sheet_name == 'ClinkerDemand':
            df['DEMAND (MT)'] = pd.to_numeric(df['DEMAND (MT)'], errors='coerce')
            df = df[df['DEMAND (MT)'].apply(lambda x: pd.notnull(x) and x > 0)]
        
        elif sheet_name == 'LinkageSources':
            df['SOURCE CAPACITY (MT)'] = pd.to_numeric(df['SOURCE CAPACITY (MT)'], errors='coerce')
            df = df[df['SOURCE CAPACITY (MT)'].apply(lambda x: pd.notnull(x) and x > 0)]
        
        elif sheet_name == 'OtherSources':
            df['SOURCE CAPACITY (MT)'] = pd.to_numeric(df['SOURCE CAPACITY (MT)'], errors='coerce')
            df = df[df['SOURCE CAPACITY (MT)'].apply(lambda x: pd.notnull(x) and x > 0)]
        
        elif sheet_name == 'OpeningInventory':
            df['QUANTITY (MT)'] = pd.to_numeric(df['QUANTITY (MT)'], errors='coerce')
            df = df[df['QUANTITY (MT)'].apply(lambda x: pd.notnull(x) and x >= 0)]
        
        elif sheet_name == 'InventoryConstraints':
            df['SAFETY STOCK (MT)'] = pd.to_numeric(df['SAFETY STOCK (MT)'], errors='coerce')
            df['MAX STOCK (MT)'] = pd.to_numeric(df['MAX STOCK (MT)'], errors='coerce')
            df = df[df['SAFETY STOCK (MT)'].apply(lambda x: pd.notnull(x) and x >= 0)]
            df = df[df['MAX STOCK (MT)'].apply(lambda x: pd.notnull(x) and x >= 0)]
            df = df[df['MAX STOCK (MT)'] >= df['SAFETY STOCK (MT)']]

def validate_data(file_path):
    errors = []
    excel_data = pd.ExcelFile(file_path)
    
    # Iterate through each sheet and validate data
    for sheet_name in excel_data.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        if sheet_name == 'ClinkerDemand':
            # # Validate 'PLANT' column
            # Validate 'PLANT' column
            if not df['PLANT'].apply(lambda x: isinstance(x, str) and x == x.strip()).all():
                #  errors.append(f'Invalid data in PLANT column of sheet {sheet_name}')
                 invalid_rows = df[~df['PLANT'].apply(lambda x: isinstance(x, str) and x.strip() == x)]
                 for index, row in invalid_rows.iterrows():
                     errors.append((sheet_name, index + 2, 'Invalid Format', 'Invalid data in PLANT column', row['PLANT']))

            
            # Validate 'TIME PERIOD (MMM-YY)' column
            try:
                df['TIME PERIOD (MMM-YY)'] = pd.to_datetime(df['TIME PERIOD (MMM-YY)'], format='%b-%y')
            except ValueError:
                 errors.append(f'Invalid date format in TIME PERIOD (MMM-YY) column of sheet {sheet_name}')
            
            # Validate 'DEMAND (MT)' column
            print("-------------testing 0---------------------")
            df['DEMAND (MT)'] = pd.to_numeric(df['DEMAND (MT)'], errors='coerce')
            df = df[df['DEMAND (MT)'].apply(lambda x: pd.notnull(x) and x > 0)]
            if not df['DEMAND (MT)'].apply(lambda x: isinstance(x, (int, float)) and x > 0).all():
                 errors.append(f'Invalid data in DEMAND (MT) column of sheet {sheet_name}')
            
            # Validate 'SPECIFIC HEAT (Kcal/Kg)' column
            df['SPECIFIC HEAT (Kcal/Kg)'] = df['SPECIFIC HEAT (Kcal/Kg)'].fillna(0)
            if not df['SPECIFIC HEAT (Kcal/Kg)'].apply(lambda x: isinstance(x, (int, float))).all():
                 errors.append(f'Invalid data in SPECIFIC HEAT (Kcal/Kg) column of sheet {sheet_name}')
            
            # Validate 'AFR (%)' column
            df['AFR (%)'] = df['AFR (%)'].fillna(0)
            if not df['AFR (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                errors.append(f'Invalid data in AFR (%) column of sheet {sheet_name}')
            
            # Validate 'ALLOWABLE ASH CONTENT (%)' column
            df['ALLOWABLE ASH CONTENT (%)'] = df['ALLOWABLE ASH CONTENT (%)'].fillna(0)
            if not df['ALLOWABLE ASH CONTENT (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in ALLOWABLE ASH CONTENT (%) column of sheet {sheet_name}')
        
        elif sheet_name == 'LinkageSources':
            # Validate 'SOURCE' column
            if not df['SOURCE'].apply(lambda x: isinstance(x, str) and x == x.strip()).all():
                 errors.append(f'Invalid data in SOURCE column of sheet {sheet_name}')
            
            # Validate 'FUEL TYPE' column
            df['FUEL TYPE'] = df['FUEL TYPE'].str.strip().str.upper()
            if not df['FUEL TYPE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in FUEL TYPE column of sheet {sheet_name}')
            
            # Validate 'USAGE' column
            df['USAGE'] = df['USAGE'].str.strip().str.upper()
            if not df['USAGE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in USAGE column of sheet {sheet_name}')
            
            # Validate 'SOURCE CAPACITY (MT)' column
            df = df[df['SOURCE CAPACITY (MT)'].apply(lambda x: pd.notnull(x) and x > 0)]
            if not df['SOURCE CAPACITY (MT)'].apply(lambda x: isinstance(x, (int, float)) and x > 0).all():
                 errors.append(f'Invalid data in SOURCE CAPACITY (MT) column of sheet {sheet_name}')
            
            # Validate 'TIME PERIOD (MMM-YY)' column
            try:
                df['TIME PERIOD (MMM-YY)'] = pd.to_datetime(df['TIME PERIOD (MMM-YY)'], format='%b-%y')
            except ValueError:
                 errors.append(f'Invalid date format in TIME PERIOD (MMM-YY) column of sheet {sheet_name}')
            
            # Validate 'PLANT' column
            if not df['PLANT'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in PLANT column of sheet {sheet_name}')
            
            # Validate 'ASH (%)' column
            df['ASH (%)'] = df['ASH (%)'].fillna(0)
            if not df['ASH (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in ASH (%) column of sheet {sheet_name}')
            
            # Validate 'MOISTURE (%)' column
            df['MOISTURE (%)'] = df['MOISTURE (%)'].fillna(0)
            if not df['MOISTURE (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in MOISTURE (%) column of sheet {sheet_name}')
            
            # Validate 'SULPHUR (%)' column
            df['SULPHUR (%)'] = df['SULPHUR (%)'].fillna(0)
            if not df['SULPHUR (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in SULPHUR (%) column of sheet {sheet_name}')
            
            # Validate 'GCV(ADB) (Kcal/Kg)' column
            df['GCV(ADB) (Kcal/Kg)'] = df['GCV(ADB) (Kcal/Kg)'].fillna(0)
            if not df['GCV(ADB) (Kcal/Kg)'].apply(lambda x: isinstance(x, (int, float)) and x > 0).all():
                 errors.append(f'Invalid data in GCV(ADB) (Kcal/Kg) column of sheet {sheet_name}')
            
            # Validate 'COST (paise/1000 Kcal)' column
            df['COST (paise/1000 Kcal)'] = df['COST (paise/1000 Kcal)'].fillna(0)
            if not df['COST (paise/1000 Kcal)'].apply(lambda x: isinstance(x, (int, float)) and x > 0).all():
                 errors.append(f'Invalid data in COST (paise/1000 Kcal) column of sheet {sheet_name}')
        
        elif sheet_name == 'OtherSources':
            # Validate 'SOURCE' column
            if not df['SOURCE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in SOURCE column of sheet {sheet_name}')
            
            # Validate 'SOURCE TYPE' column
            df['SOURCE TYPE'] = df['SOURCE TYPE'].str.strip().str.upper()
            if not df['SOURCE TYPE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in SOURCE TYPE column of sheet {sheet_name}')
            
            # Validate 'FUEL TYPE' column
            df['FUEL TYPE'] = df['FUEL TYPE'].str.strip().str.upper()
            if not df['FUEL TYPE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in FUEL TYPE column of sheet {sheet_name}')
            
            # Validate 'USAGE' column
            df['USAGE'] = df['USAGE'].str.strip().str.upper()
            if not df['USAGE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in USAGE column of sheet {sheet_name}')
            
            # Validate 'SOURCE CAPACITY (MT)' column
            df = df[df['SOURCE CAPACITY (MT)'].apply(lambda x: pd.notnull(x) and x > 0)]
            if not df['SOURCE CAPACITY (MT)'].apply(lambda x: isinstance(x, (int, float)) and x > 0).all():
                 errors.append(f'Invalid data in SOURCE CAPACITY (MT) column of sheet {sheet_name}')
            
            # Validate 'TIME PERIOD (MMM-YY)' column
            try:
                df['TIME PERIOD (MMM-YY)'] = pd.to_datetime(df['TIME PERIOD (MMM-YY)'], format='%b-%y')
            except ValueError:
                 errors.append(f'Invalid date format in TIME PERIOD (MMM-YY) column of sheet {sheet_name}')
            
            # Validate 'ASH (%)' column
            df['ASH (%)'] = df['ASH (%)'].fillna(0)
            if not df['ASH (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in ASH (%) column of sheet {sheet_name}')
            
            # Validate 'MOISTURE (%)' column
            df['MOISTURE (%)'] = df['MOISTURE (%)'].fillna(0)
            if not df['MOISTURE (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in MOISTURE (%) column of sheet {sheet_name}')
            
            # Validate 'SULPHUR (%)' column
            df['SULPHUR (%)'] = df['SULPHUR (%)'].fillna(0)
            if not df['SULPHUR (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in SULPHUR (%) column of sheet {sheet_name}')
            
            # Validate 'GCV(ADB) (Kcal/Kg)' column
            df['GCV(ADB) (Kcal/Kg)'] = df['GCV(ADB) (Kcal/Kg)'].fillna(0)
            if not df['GCV(ADB) (Kcal/Kg)'].apply(lambda x: isinstance(x, (int, float)) and x > 0).all():
                 errors.append('Invalid data in GCV(ADB) (Kcal/Kg) column of sheet OtherSources')
    
        elif sheet_name == 'CostMatrix':
            # Validate 'SOURCE' column
            if not df['SOURCE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in SOURCE column of sheet {sheet_name}')
            
            # Validate 'SOURCE TYPE' column
            df['SOURCE TYPE'] = df['SOURCE TYPE'].str.strip().str.upper()
            if not df['SOURCE TYPE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in SOURCE TYPE column of sheet {sheet_name}')
            
            # Validate 'FUEL TYPE' column
            df['FUEL TYPE'] = df['FUEL TYPE'].str.strip().str.upper()
            if not df['FUEL TYPE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in FUEL TYPE column of sheet {sheet_name}')
            
            # Validate 'USAGE' column
            df['USAGE'] = df['USAGE'].str.strip().str.upper()
            if not df['USAGE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in USAGE column of sheet {sheet_name}')
            
            # Validate 'TIME PERIOD (MMM-YY)' column
            try:
                df['TIME PERIOD (MMM-YY)'] = pd.to_datetime(df['TIME PERIOD (MMM-YY)'], format='%b-%y')
            except ValueError:
                 errors.append(f'Invalid date format in TIME PERIOD (MMM-YY) column of sheet {sheet_name}')
            
            # Validate 'PLANT' column
            if not df['PLANT'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                errors.append(f'Invalid data in PLANT column of sheet {sheet_name}')
            
            # Validate 'COST (paise/1000 Kcal)' column
            df['COST (paise/1000 Kcal)'] = df['COST (paise/1000 Kcal)'].fillna(0)
            if not df['COST (paise/1000 Kcal)'].apply(lambda x: isinstance(x, (int, float)) and x > 0).all():
                 errors.append(f'Invalid data in COST (paise/1000 Kcal) column of sheet {sheet_name}')
            
        elif sheet_name == 'OpeningInventory':
            # Validate 'PLANT' column
            if not df['PLANT'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in PLANT column of sheet {sheet_name}')
            
            # Validate 'INVENTORY SOURCE' column
            if not df['INVENTORY SOURCE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in INVENTORY SOURCE column of sheet {sheet_name}')
            
            # Validate 'SOURCE TYPE' column
            df['SOURCE TYPE'] = df['SOURCE TYPE'].str.strip().str.upper()
            if not df['SOURCE TYPE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in SOURCE TYPE column of sheet {sheet_name}')
            
            # Validate 'FUEL TYPE' column
            df['FUEL TYPE'] = df['FUEL TYPE'].str.strip().str.upper()
            if not df['FUEL TYPE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in FUEL TYPE column of sheet {sheet_name}')
            
            # Validate 'USAGE' column
            df['USAGE'] = df['USAGE'].str.strip().str.upper()
            if not df['USAGE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in USAGE column of sheet {sheet_name}')
            
            # Validate 'QUANTITY (MT)' column
            df = df[df['QUANTITY (MT)'].apply(lambda x: pd.notnull(x) and x >= 0)]
            if not df['QUANTITY (MT)'].apply(lambda x: isinstance(x, (int, float)) and x >= 0).all():
                 errors.append(f'Invalid data in QUANTITY (MT) column of sheet {sheet_name}')
            
            # Validate 'ASH (%)' column
            df['ASH (%)'] = df['ASH (%)'].fillna(0)
            if not df['ASH (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in ASH (%) column of sheet {sheet_name}')
            
            # Validate 'MOISTURE (%)' column
            df['MOISTURE (%)'] = df['MOISTURE (%)'].fillna(0)
            if not df['MOISTURE (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in MOISTURE (%) column of sheet {sheet_name}')
            
            # Validate 'SULPHUR (%)' column
            df['SULPHUR (%)'] = df['SULPHUR (%)'].fillna(0)
            if not df['SULPHUR (%)'].apply(lambda x: isinstance(x, (int, float)) and 0 <= x <= 100).all():
                 errors.append(f'Invalid data in SULPHUR (%) column of sheet {sheet_name}')
            
            # Validate 'GCV(ADB) (Kcal/Kg)' column
            df['GCV(ADB) (Kcal/Kg)'] = df['GCV(ADB) (Kcal/Kg)'].fillna(0)
            if not df['GCV(ADB) (Kcal/Kg)'].apply(lambda x: isinstance(x, (int, float)) and x > 0).all():
                 errors.append(f'Invalid data in GCV(ADB) (Kcal/Kg) column of sheet {sheet_name}')
            
            # Validate 'COST (paise/ 1000 Kcal)' column
            df['COST (paise/ 1000 Kcal)'] = df['COST (paise/ 1000 Kcal)'].fillna(0)
            if not df['COST (paise/ 1000 Kcal)'].apply(lambda x: isinstance(x, (int, float)) and x > 0).all():
                 errors.append(f'Invalid data in COST (paise/ 1000 Kcal) column of sheet {sheet_name}')

        elif sheet_name == 'InventoryConstraints':
            # Validate 'PLANT' column
            if not df['PLANT'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in PLANT column of sheet {sheet_name}')
            
            # Validate 'TIME PERIOD (MMM-YY)' column
            try:
                df['TIME PERIOD (MMM-YY)'] = pd.to_datetime(df['TIME PERIOD (MMM-YY)'], format='%b-%y')
            except ValueError:
                 errors.append(f'Invalid date format in TIME PERIOD (MMM-YY) column of sheet {sheet_name}')
            
            # Validate 'FUEL TYPE' column
            df['FUEL TYPE'] = df['FUEL TYPE'].str.strip().str.upper()
            if not df['FUEL TYPE'].apply(lambda x: isinstance(x, str) and x.strip() != '').all():
                 errors.append(f'Invalid data in FUEL TYPE column of sheet {sheet_name}')
            
            # Validate 'SAFETY STOCK (MT)' column
            df['SAFETY STOCK (MT)'] = df['SAFETY STOCK (MT)'].fillna(0)
            df = df[df['SAFETY STOCK (MT)'].apply(lambda x: pd.notnull(x) and x >= 0)]
            if not df['SAFETY STOCK (MT)'].apply(lambda x: isinstance(x, (int, float)) and x >= 0).all():
                 errors.append(f'Invalid data in SAFETY STOCK (MT) column of sheet {sheet_name}')
            
            # Validate 'MAX STOCK (MT)' column
            df['MAX STOCK (MT)'] = df['MAX STOCK (MT)'].fillna(0)
            df = df[df['MAX STOCK (MT)'].apply(lambda x: pd.notnull(x) and x >= 0)]
            if not df['MAX STOCK (MT)'].apply(lambda x: isinstance(x, (int, float)) and x >= 0).all():
                 errors.append(f'Invalid data in MAX STOCK (MT) column of sheet {sheet_name}')
            
            # Check constraint: MAX STOCK (MT) >= SAFETY STOCK (MT)
            if not (df['MAX STOCK (MT)'] >= df['SAFETY STOCK (MT)']).all():
                 errors.append(f'Constraint violation: MAX STOCK (MT) must be greater than or equal to SAFETY STOCK (MT) in sheet {sheet_name}')

    if len(errors) != 0:
        delete_invalid_rows(file_path)
        return {'error': errors}, 400

    # If all data validations pass, return success message
    return {'message': 'All data is valid'}, 200


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    
    if not file.filename.endswith('.xlsx'):
        return jsonify({'error': 'The uploaded file is not an Excel file'}), 400
    
    file_path = file.stream
    
    result, status_code = validate_excel(file_path)
    if status_code != 200:
        return jsonify(result), status_code
    
    data_result, data_status_code = validate_data(file_path)
    return jsonify(data_result), data_status_code


if __name__ == '__main__':
    app.run(debug=True)
