#!/bin/bash

# Provision a new server
export INSTANCE=$(aws ec2 run-instances --image-id ami-9398d3e0 --security-group-ids sg-2db63a4b --count 1 --instance-type t2.micro --key-name gunnar-key-pair --query 'Instances[0].InstanceId' --user-data file://init.sh | tr -d '"')
export ADDRESS=$(aws ec2 describe-instances --instance-ids $INSTANCE --query 'Reservations[0].Instances[0].PublicIpAddress' | tr -d '"')

# Store the address
rm -f address.txt
echo $ADDRESS >> address.txt

echo "Address: $ADDRESS" 

