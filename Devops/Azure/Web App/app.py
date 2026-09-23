from flask import Flask, render_template_string, request

app = Flask(__name__)

# Simple HTML UI Dashboard Design
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Azure Python App Test</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 450px;
            width: 100%;
        }
        h1 {
            color: #0078d4;
            margin-bottom: 10px;
        }
        p {
            color: #555;
            font-size: 16px;
        }
        .success-badge {
            background-color: #dff6dd;
            color: #107c41;
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            font-weight: bold;
            margin-bottom: 25px;
        }
        input[type="text"] {
            width: 80%;
            padding: 12px;
            border: 2px solid #ccd1d9;
            border-radius: 6px;
            font-size: 16px;
            margin-bottom: 15px;
            outline: none;
        }
        input[type="text"]:focus {
            border-color: #0078d4;
        }
        button {
            background-color: #0078d4;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 6px;
            cursor: pointer;
            width: 86%;
            font-weight: bold;
        }
        button:hover {
            background-color: #005a9e;
        }
        .result {
            margin-top: 25px;
            padding: 15px;
            background-color: #f0f4f8;
            border-left: 5px solid #0078d4;
            text-align: left;
            border-radius: 4px;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>DigitalFinOps</h1>
    <div class="success-badge">✓ Python Web App Live</div>
    <p>Aapka simple HTML UI successfully Azure par chal raha hai!</p>
    
    <form method="POST">
        <input type="text" name="username" placeholder="Apna naam likhein..." required>
        <button type="submit">Test Web App</button>
    </form>

    {% if name %}
    <div class="result">
        <strong>Response:</strong> Hello {{ name }}! Aapki Python Flask app Azure cloud par sahi se kaam kar rahi hai.
    </div>
    {% endif %}
</div>

</body>
</html>
"""

@app.route('/', methods=['GET', 'POST'])
def home():
    name = None
    if request.method == 'POST':
        name = request.form.get('username')
    return render_template_string(HTML_TEMPLATE, name=name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
