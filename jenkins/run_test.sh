#!/bin/bash

# Install docker and docker-compose
sudo yum update -y
sudo yum install -y docker
sudo service docker start
curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose
chmod +x ./docker-compose

# Run docker-compose
sudo ./docker-compose up -d

# Make sure containers are ready
sleep 30
