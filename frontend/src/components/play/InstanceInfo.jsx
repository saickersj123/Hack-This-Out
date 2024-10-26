import React from 'react';

const InstanceInfo = (instanceStatus, vpnIp) => {
    return (
        //display instance info
        <div>
            {/* instance status as red icon if stopped, yellow icon if pending, green icon if running */}
            <h4 style={{ color: instanceStatus 
                === 'stopped' ? 'red' 
                : instanceStatus === 'pending' ? 'yellow' 
                : 'green' }}>
                    Instance Status: {instanceStatus}
            </h4>
            {/* vpn ip */}
            <h4>Vpn IP: {vpnIp}</h4>
        </div>
    );
};

export default InstanceInfo;