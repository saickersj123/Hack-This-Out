#!/bin/bash

# GET VPN IP
VPN_IP=$(ip addr show tun0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1)

# Post your ip to web server
curl -X POST -d "ip=$VPN_IP" http://hackthisout.com/report_ip
