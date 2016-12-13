#!/bin/bash

# Install docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose
chmod +x ./docker-compose

# Stop running containers and run docker-compose
#sudo docker stop $(sudo docker ps -a -q)
#sudo ./docker-compose down
sudo ./docker-compose up -d
