import { exec } from 'child_process';
import path from 'path';

const EASYRSA_PATH = '/home/ubuntu/openvpn-ca'; // Update with your actual path
const OPENVPN_PROFILE_DIR = path.join(__dirname, '../../profiles');

interface GenerateProfileParams {
  clientName: string;
}

export const generateOpenVPNProfile = ({ clientName }: GenerateProfileParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Navigate to Easy-RSA directory
    const commands = `
      cd ${EASYRSA_PATH}
      ./easyrsa gen-req ${clientName} nopass
      ./easyrsa sign-req client ${clientName}
      cat ${EASYRSA_PATH}/pki/ca.crt ${EASYRSA_PATH}/pki/issued/${clientName}.crt ${EASYRSA_PATH}/pki/private/${clientName}.key > ${OPENVPN_PROFILE_DIR}/${clientName}.ovpn
      echo 'client
      dev tun
      proto udp
      remote ${process.env.VPN_SERVER_IP} 1194
      resolv-retry infinite
      route-nopull
      nobind
      persist-key
      persist-tun
      remote-cert-tls server
      cipher AES-256-CBC
      key-direction 1
      <ca>
      $(cat ${EASYRSA_PATH}/pki/ca.crt)
      </ca>
      <cert>
      $(cat ${EASYRSA_PATH}/pki/issued/${clientName}.crt)
      </cert>
      <key>
      $(cat ${EASYRSA_PATH}/pki/private/${clientName}.key)
      </key>
      <tls-auth>
      $(cat ${EASYRSA_PATH}/pki/ta.key)
      </tls-auth>' >> ${OPENVPN_PROFILE_DIR}/${clientName}.ovpn
    `;

    exec(commands, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating OpenVPN profile: ${stderr}`);
        reject(`Failed to generate profile for ${clientName}`);
      } else {
        resolve(`${clientName}.ovpn`);
      }
    });
  });
};