dir=$(pwd)
CI=true
cd $dir/mockit-routes && npm test .
cd $dir/client && CI=true npm test
cd $dir/server && npm test