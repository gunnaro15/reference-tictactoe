#!/bin/bash

# Provision a new server
export INSTANCE=$(aws ec2 run-instances --image-id ami-9398d3e0 --security-group-ids sg-2db63a4b --count 1 --instance-type t2.micro --key-name gunnar-key-pair --query 'Instances[0].InstanceId' | tr -d '"')
export ADDRESS=$(aws ec2 describe-instances --instance-ids $INSTANCE --query 'Reservations[0].Instances[0].PublicIpAddress' | tr -d '"')

# Store the variables
rm -f test_address.txt
echo $ADDRESS >> test_address.txt
rm -f instance.txt
echo $INSTANCE >> instance.txt
rm -f ../client/src/test_env.js
echo "module.exports = '$ADDRESS';" >> ../client/src/test_env.js

status='unknown'
while [ ! "${status}" == "ok" ]
do
   echo Checking status of host, currently ${status}
   status=$(ssh -i "~/gunnar-key-pair.pem"  -o StrictHostKeyChecking=no -o BatchMode=yes -o ConnectTimeout=5 ec2-user@$ADDRESS echo ok 2>&1)
   sleep 2
done

echo "Address: $ADDRESS"
