from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import json
import requests

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///image_db.sqlite3'
db = SQLAlchemy(app)
#HI
# Define the Image model
class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f"<Image {self.id}: {self.url}>"

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Image URL Database Server!"

# Route to store an image URL
@app.route('/store_image_url', methods=['POST'])
def store_image_url():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({"error": "Invalid or missing URL"}), 400

    new_image = Image(url=url)
    db.session.add(new_image)
    db.session.commit()
    return jsonify({"id": new_image.id, "url": new_image.url}), 201

# Function to call the object detection API
def object_detection_api(image_url):
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjQ4MWEwMjAtODI0ZC00NTc5LTgwY2UtZDQyZWRkYTNlOTY0IiwidHlwZSI6ImFwaV90b2tlbiJ9.FjYY9W_uf_G_zDhsuL9I2yguFjEa1Nx4mGEsuZmKhS8",
    }
    url = "https://api.edenai.run/v2/image/object_detection"

    json_payload = {
        "providers": "google, amazon",
        "file_url": image_url
    }

    response = requests.post(url, json=json_payload, headers=headers)

    result = json.loads(response.text)
    return result["google"]["items"]


# Route to perform object detection
@app.route('/object_detection', methods=['POST'])
def perform_object_detection():
    try:
        data = request.get_json()
        url = data.get('url')
        if not url:
            return jsonify({"error": "Invalid or missing URL"}), 400

        detection_results = object_detection_api(url)
        print(detection_results)
        return detection_results
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
