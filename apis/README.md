# Consume API Clustering #
curl --location 'http://127.0.0.1:5000/predict' \
--header 'Content-Type: application/json' \
--data '{

    "clients": [
        {
            "client": 1,
            "income":70,
            "score":50
        },
        {
            "client": 2,
            "income":100,
            "score":80
        }
    ]
}'

# Run on Container #
podman build -t model_api:latest .
podman run --name model_api -p 8081:8080 -e FLASK_APP=clustering_api.py model_api:latest