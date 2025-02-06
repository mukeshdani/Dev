from flask import Flask, request, jsonify
from utils.file_utils import ExcelValidator

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    excel_validator = ExcelValidator(request.files.get('file'))
    response, status_code = excel_validator.validation()
    return jsonify(response), status_code

if __name__ == '__main__':
    app.run(debug=True)
