#!/bin/bash

# Install everything the server needs
sudo yum update -y
sudo yum install -y docker
sudo service docker start
