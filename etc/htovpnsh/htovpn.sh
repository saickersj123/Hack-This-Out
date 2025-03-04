#!/bin/bash
PROFILE="/var/hto/hto_client.ovpn"

sudo openvpn --config "$PROFILE"
