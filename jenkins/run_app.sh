#!/bin/bash

# Install docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose
chmod +x ./docker-compose

# Run docker-compose
sudo ./docker-compose up -d

# Run api tests
echo "Running api tests"
npm run apitest
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm apitest failed with exit code " $rc
    exit $rc
fi
