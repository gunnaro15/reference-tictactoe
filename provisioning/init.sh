#!/bin/bash

# Install everything the server needs
sudo yum update -y
sudo yum install -y docker
sudo service docker start

curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose
chmod +x ./docker-compose

#curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
#yum -y install nodejs

#sudo yum install git -y
#git clone https://github.com/gunnaro15/reference-tictactoe.git
