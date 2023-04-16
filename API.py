import json
import requests

def object_detection(image_url):
    headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzQxMTY5YTQtNjZkNC00YzI0LThkNTUtMzY1OTg5YjliY2YxIiwidHlwZSI6ImFwaV90b2tlbiJ9.TDvT6bvbDQURRaaAhZy2fQctG6cN1tTEanR9e6sm0w8"}

    url = "https://api.edenai.run/v2/image/object_detection"
    json_payload = {"providers": "microsoft", "file_url": image_url}

    response = requests.post(url, json=json_payload, headers=headers)

    result = json.loads(response.text)
    print(result["microsoft"]["items"])
