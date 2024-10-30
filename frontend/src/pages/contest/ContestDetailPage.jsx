import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContestDetail from '../../components/contest/ContestDetail';
import Main from '../../components/main/Main';
import { getContestDetails } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ContestDetailPage = () => {
    const [contestDetail, setContestDetail] = useState({ machines: [] });
    const [isLoading, setIsLoading] = useState(true);
    const { contestId } = useParams();
    const navigate = useNavigate();
    //fetch contest detail
    useEffect(() => {
        const fetchContestDetail = async () => {
            try {
                //const response = await getActiveContestDetails(contestId);
                const response = await getContestDetails(contestId);
                setContestDetail(response.contest);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching contest details:', error.message || error);
            }
        };

        fetchContestDetail();
    }, [contestId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Main>
            <ContestDetail contestDetail={contestDetail} />
            <button onClick={() => navigate(`/contest/${contestDetail._id}/participate`)}>Participate</button>
        </Main>
    );
};

export default ContestDetailPage;