#!/bin/bash
sudo apt-get install -y amazon-ec2-utils

INSTANCE_ID=$(ec2-metadata -i | cut -d' ' -f2)
VPN_IP=$(ip addr show tun0 | grep 'inet ' | awk '{print $2}' | cut -d'/' -f1)

curl -X POST -H "Content-Type: application/json" -d '{
  "userId": "'"$USER_ID"'",
  "instanceId": "'"$INSTANCE_ID"'",
  "vpnIp": "'"$VPN_IP"'"
}' https://api.hackthisout.o-r.kr/api/inst/receive-vpn-ip
