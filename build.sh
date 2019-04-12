cd mockit-routes
docker build -t mockit-routes .
cd ..
cd client
docker build -t mockit-client .
cd ..
cd server
docker build -t mockit-server .
cd ..
docker-compose up -d