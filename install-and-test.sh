dir=$(pwd)
CI=true
cd $dir/mockit-routes && npm install && npm test .
cd $dir/client && npm install && CI=true npm test -- --coverage
cd $dir/server && npm install && npm test