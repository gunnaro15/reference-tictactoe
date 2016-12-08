#!/bin/bash

curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose
chmod +x ./docker-compose
sudo ./docker-compose up -d
