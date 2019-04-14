dir=$(pwd)
cd $dir/mockit-routes && docker build -t mockit-routes .
cd $dir/client && docker build -t mockit-client .
cd $dir/server && docker build -t mockit-server .
docker-compose up -d