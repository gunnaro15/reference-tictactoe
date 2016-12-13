#!/bin/bash

# Clean the dist folder
echo "Cleaning..."
rm -rf ./dist
mkdir -p dist/public

npm install

# Build the app with build.sh
echo "Building app"
./build.sh
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Build failed with exit code " $rc
    exit $rc
fi

# Run unit tests
echo "Running unit tests"
npm run test
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm test failed with exit code " $rc
    exit $rc
fi

# Create githash
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

# Put the githash into a file
cat > ./dist/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

# Put the githash into a .env file for docker-compose.yml
rm -f .env
echo "GIT_COMMIT=$(cat ./dist/githash.txt)" >> .env
echo "CURR_PORT=8080" >> .env 

# Put the githash into a .env file for jenkins
rm -f jenkins/.env
echo "GIT_COMMIT=$(cat ./dist/githash.txt)" >> jenkins/.env
echo "CURR_PORT=8080" >> jenkins/.env

# Create html file for retrieving version information
cat > ./dist/public/version.html << _EOF_
<!doctype html>
<head>
   <title>App version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_

# Move files to the build folder
cp ./run_fix.sh ./build/
cp ./package.json ./build/

# Build docker image
echo "Building docker image"
docker build -t gunnarbirnir/tictactoe:$GIT_COMMIT .
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

# Push to docker repository
docker push gunnarbirnir/tictactoe:$GIT_COMMIT
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker push failed " $rc
    exit $rc
fi
