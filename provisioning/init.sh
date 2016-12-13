#!/bin/bash

# Install everything the server needs
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo yum install -y git

sudo su

curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum -y install nodejs

#git clone https://github.com/gunnaro15/reference-tictactoe.git
#cd reference-tictactoe

#curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose
#chmod +x ./docker-compose

#npm install
#sudo ./docker-compose up -d
#npm run apitest
