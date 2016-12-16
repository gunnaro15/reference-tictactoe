#!/bin/bash

# Provision a new server
export INSTANCE=$(aws ec2 run-instances --image-id ami-9398d3e0 --security-group-ids sg-2db63a4b --count 1 --instance-type t2.micro --key-name gunnar-key-pair --query 'Instances[0].InstanceId' --user-data file://init.sh | tr -d '"')
export ADDRESS=$(aws ec2 describe-instances --instance-ids $INSTANCE --query 'Reservations[0].Instances[0].PublicIpAddress' | tr -d '"')

# Store the address
rm -f address.txt
echo $ADDRESS >> address.txt

status='unknown'
while [ ! "${status}" == "ok" ]
do
   echo Checking status of host, currently ${status}
   status=$(ssh -i "/Users/gunnarbirnir/Downloads/gunnar-key-pair.pem"  -o StrictHostKeyChecking=no -o BatchMode=yes -o ConnectTimeout=5 ec2-user@$ADDRESS echo ok 2>&1)
   sleep 2
done

echo "Address: $ADDRESS"
