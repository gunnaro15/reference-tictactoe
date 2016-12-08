#!/bin/bash

#export INSTANCE=$(aws ec2 run-instances --image-id ami-9398d3e0 --security-group-ids sg-2db63a4b --count 1 --instance-type t2.micro --key-name gunnar-key-pair --query 'Instances[0].InstanceId' --user-data file://init.sh | tr -d '"')
#export ADDRESS=$(aws ec2 describe-instances --instance-ids $INSTANCE --query 'Reservations[0].Instances[0].PublicIpAddress' | tr -d '"')

rm -f .env
echo "GIT_COMMIT=$(cat ../dist/githash.txt)" >> .env
echo "CURR_PORT=8080" >> .env 

#sleep 100

#export ADDRESS=52.51.183.141

#scp -o StrictHostKeyChecking=no -i gunnar-key-pair.pem ../docker-compose.yml ec2-user@$ADDRESS:~/docker-compose.yml
#scp -o StrictHostKeyChecking=no -i gunnar-key-pair.pem .env ec2-user@$ADDRESS:~/.env
#scp -o StrictHostKeyChecking=no -i gunnar-key-pair.pem run_app.sh ec2-user@$ADDRESS:~/run_app.sh

#echo "Address: $ADDRESS"
