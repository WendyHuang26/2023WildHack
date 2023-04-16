import requests
import json


def test_object_detection_route(Iurl):
    # Replace the following URL with the URL of your running Flask app
    url = "http://localhost:5000/object_detection"

    # Replace the following image URL with a valid image URL for testing
    image_url = Iurl

    payload = {
        "url": image_url
    }

    headers = {"Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        print("Object detection results:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"Error {response.status_code}: {response.text}")


if __name__ == "__main__":
    test_object_detection_route("https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg")
