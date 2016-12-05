#!/bin/bash

sudo yum update -y
sudo yum install -y docker
sudo service docker start
curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose
chmod +x ./docker-compose
#sudo ./docker-compose up
