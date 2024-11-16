import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { getLatestMachine, getMostPlayedMachine } from '../../api/axiosMachine';
import { MachineforBanner } from '../../types/Machine';
import '../../assets/scss/machine/MachineBanner.scss';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Paper, Button, Avatar } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { getAvatarColorIndex, avatarBackgroundColors } from '../../utils/avatars';

const MachineBanner: React.FC = () => {
  const [latestMachine, setLatestMachine] = useState<MachineforBanner | null>(null);
  const [mostPlayedMachine, setMostPlayedMachine] = useState<MachineforBanner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setLoading(true);
        const latest = await getLatestMachine();
        const mostPlayed = await getMostPlayedMachine();
        setLatestMachine(latest.machine);
        setMostPlayedMachine(mostPlayed.machine);
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
    return <p>Loading machine banners...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const machines = [
    { ...latestMachine!, title: 'Latest Machine' },
    { ...mostPlayedMachine!, title: 'Most Played Machine' },
  ];

  return (
    <div className="machine-banner-container">
      <Carousel
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
            height: '213px',
            bottom: '0',
          },
        }}
        NextIcon={<ArrowForwardIos />}
        PrevIcon={<ArrowBackIos />}
      >
        {machines.map((machine) => {
          const avatarColorIndex = getAvatarColorIndex(machine.name);
          const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
          return (
            <Paper key={machine._id} className="banner-slide">
              <div className="banner-contents">
                <h3>{machine.title}</h3>
                <Avatar className='machine-avatar'
                  variant="rounded"
                  sx={{
                    backgroundColor: avatarBgColor
                  }}
                >
                  {machine.name.charAt(0).toUpperCase()}
                </Avatar>
                <h4>{machine.name}</h4>
                <p className='banner-category'>Category: {machine.category}</p>
                <p className='banner-exp'>Rewards: {machine.exp} EXP</p>
                <Box
                  sx={{
                    display: 'flex',
                    marginTop: '4px',
                    width: '200px'
                  }}
                >
                  <Rating
                    name={`read-only-rating-${machine._id}`}
                    value={Number(machine.rating)}
                    precision={0.5}
                    readOnly
                  />
                  <span style={{ marginLeft: '8px', color: 'white' }}>{machine.rating.toFixed(1)}</span>
                </Box>
                <p>Played: {machine.playerCount}</p>
                <Button
                  sx={{
                    width: '200px',
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/machine/${machine._id}`)}

                >
                  Go to Machine
                </Button>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MachineBanner;