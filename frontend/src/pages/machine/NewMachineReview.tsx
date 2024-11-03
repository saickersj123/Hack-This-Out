import React from 'react';
import MachineReviewForm from '../../components/machine/MachineReviewForm';
import { useParams } from 'react-router-dom';
import Main from '../../components/main/Main';
const NewMachineReview: React.FC = () => {
    const { machineId } = useParams();
    return (
        <Main>
            <MachineReviewForm machineId={machineId || ''} onReviewAdded={() => {}} />
        </Main>
    );
};

export default NewMachineReview;