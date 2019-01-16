cd api
docker build -t mockit-api .
cd ..
cd mock-server
docker build -t mockit-mock-server .
cd ..
cd ui
docker build -t mockit-ui .
cd ..
docker-compose up -d