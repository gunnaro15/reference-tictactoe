#!/bin/bash

# Set the environment variable NODE_PATH=.
export NODE_PATH=.
# Remove the build folder 
npm run clean 
# Create a new build folder
npm run createbuild 
# Run build in the client directory
npm run buildclient 

# Move files we need to the build folder
mv client/build build/static 
cp -R server build/server 
mkdir -p build/client/src 
cp -r client/src/common build/client/src 
cp run.js build
