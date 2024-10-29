import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MachineDetail from '../../components/machine/MachineDetail';
import Main from '../../components/main/Main';
import { getMachineDetails } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const MachineDetailPage = () => {
    const [machineDetail, setMachineDetail] = useState([]);
    const { machineId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    //fetch machine detail
    useEffect(() => {
        const fetchMachineDetail = async () => {
            try {
                //const response = await getMachineDetails(machineId);
                const response = await getMachineDetails(machineId);
                setMachineDetail(response.machine);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching machine details:', error.message || error);
            }
        };

        fetchMachineDetail();
    }, [machineId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <MachineDetail machineDetail={machineDetail} />
            <button onClick={() => navigate(`/machine/${machineDetail._id}/play`)}>Play</button>
        </Main>
    );
};

export default MachineDetailPage;