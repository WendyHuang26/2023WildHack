from flask import Flask, request, jsonify, url_for
from flask_sqlalchemy import SQLAlchemy
import os
import uuid
import json
import requests
import werkzeug

from flask_uploads import UploadSet, IMAGES, configure_uploads

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///image_db.sqlite3'
app.config['UPLOADED_IMAGES_DEST'] = 'uploaded_images'  # Folder to store uploaded images

db = SQLAlchemy(app)

images = UploadSet('images', IMAGES)
configure_uploads(app, images)

# Define the Image model
class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    detected_object = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f"<Image {self.id}: {self.url}, Detected Object: {self.detected_object}>"

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Image URL Database Server!"

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'photo' not in request.files:
        return jsonify({"error": "No image file in the request"}), 400

    photo = request.files['photo']

    # Generate a secure filename using uuid
    _, file_extension = os.path.splitext(photo.filename)
    filename = f"{uuid.uuid4().hex}{file_extension}"

    # Save the file to the upload folder
    upload_folder = app.config['UPLOADED_IMAGES_DEST']
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, filename)
    photo.save(file_path)

    # Generate public URL for the uploaded image
    image_url = url_for('static', filename=f"uploaded_images/{filename}", _external=True)

    # Perform object detection on the uploaded image
    detection_result = perform_object_detection_helper(image_url)
    detected_object = detection_result.get("Object detected")

    # Save the image URL and detected object to the database
    new_image = Image(url=image_url, detected_object=detected_object)
    db.session.add(new_image)
    db.session.commit()

    return jsonify({"id": new_image.id, "url": new_image.url, "detected_object": detected_object}), 201


def extract_most_confident_label(detection_results):
    if detection_results:
        most_confident_result = detection_results[0]
        label = most_confident_result.get("label")
        return label
    else:
        return None

# Perform object detection
def perform_object_detection_helper(url):
    try:
        if not url:
            return {"error": "Invalid or missing URL"}

        detection_results = object_detection_api(url)

        most_confident_label = extract_most_confident_label(detection_results)

        if most_confident_label:
            return {"Object detected": most_confident_label}
        else:
            return {"error": "No detection results found"}

    except Exception as e:
        return {"error": str(e)}

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
def perform_object_detection_route():
    data = request.get_json()
    url = data.get('url')
    detection_result = perform_object_detection_helper(url)

    if "error" in detection_result:
        return jsonify(detection_result), 400
    else:
        return jsonify(detection_result)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

