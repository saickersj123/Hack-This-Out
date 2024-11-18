import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { ContestBannerItem } from '../../types/Contest';
import '../../assets/scss/contest/ContestBanner.scss';
import { useNavigate } from 'react-router-dom';
import { Paper, Button, Avatar } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { getAvatarColorIndex, avatarBackgroundColors } from '../../utils/avatars';
import { formatRemainingTime } from '../../utils/dateUtils';
import { getLatestContest } from '../../api/axiosContest';
import { getStartedContest } from '../../api/axiosContest';
import LoadingIcon from '../public/LoadingIcon';
import ErrorIcon from '../public/ErrorIcon';

const ContestBanner: React.FC = () => {
  const [latestContest, setLatestContest] = useState<ContestBannerItem | null>(null);
  const [startedContest, setStartedContest] = useState<ContestBannerItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setLoading(true);
        const latest = await getLatestContest();
        const started = await getStartedContest();
        setLatestContest(latest.contest);
        setStartedContest(started.contests[0]);
      } catch (err: any) {
        console.error('Error fetching machines for banner:', err);
        setError('Failed to load machine banners.');
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    return <ErrorIcon />;
  }

  const contests = [
    { ...latestContest!, title: 'Latest Contest' },
    { ...startedContest!, title: 'Active Contest' },
  ];

  return (
    <div className="contest-banner-container">
      <Carousel
        className='carousel'
        navButtonsAlwaysVisible
        indicators={false}
        autoPlay
        interval={10000}
        animation="slide"
        swipe
        navButtonsProps={{
          style: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
          },
        }}
        navButtonsWrapperProps={{
          style: {
            height: '100%',
            bottom: '0',
          },
        }}
        NextIcon={<ArrowForwardIos />}
        PrevIcon={<ArrowBackIos />}
      >
        {contests.map((contest) => {
          const avatarColorIndex = getAvatarColorIndex(contest.name);
          const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
          return (
            <Paper key={contest._id} className="banner-slide">
              <div className="banner-contents">
                <h3>{contest.title}</h3>
                <Avatar className='contest-avatar'
                  variant="rounded"
                  sx={{
                    backgroundColor: avatarBgColor
                  }}
                >
                  {contest.name.charAt(0).toUpperCase()}
                </Avatar>
                <h4>{contest.name}</h4>
                {new Date(contest.startTime) > new Date() ? (
                  <p className='ramaining-time'>시작까지 - {formatRemainingTime(contest.startTime)}</p>
                ) : (
                  <p className='ramaining-time'>종료까지 - {formatRemainingTime(contest.endTime)}</p>
                )}
                <div className='contest_reward_box'>
                  <p className='banner-exp'>Reward :</p>
                  <p className='exp'>{contest.contestExp} EXP</p>
                </div>
                <Button
                  className='go-to-machine-btn'
                  variant="contained"
                  onClick={() => navigate(`/contest/${contest._id}`)}
                >
                  Go to Contest
                </Button>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ContestBanner;