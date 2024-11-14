import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getLatestMachine, getMostPlayedMachine } from '../../api/axiosMachine';
import { MachineforBanner } from '../../types/Machine';
import '../../assets/scss/machine/MachineBanner.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

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
        const [latest, mostPlayed] = await Promise.all([
          getLatestMachine(),
          getMostPlayedMachine(),
        ]);
        setLatestMachine(latest);
        setMostPlayedMachine(mostPlayed);
      } catch (err: any) {
        console.error('Error fetching machines for banner:', err);
        setError('Failed to load machine banners.');
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: true,
  };

  if (loading) {
    return <p>Loading machine banners...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const renderMachineSlide = (machine: MachineforBanner, title: string) => (
    <div className="banner-slide" key={machine._id}>
      <h3>{title}</h3>
      <div className="machine-details">
        <h4>{machine.name}</h4>
        <p>Category: {machine.category}</p>
        <p>Rewards: {machine.exp}</p>
        <p>Rating: {machine.rating}</p>
        <p>Played: {machine.playerCount}</p>
        <button onClick={() => navigate(`/machine/${machine._id}`)}>View Details</button>
      </div>
    </div>
  );

  return (
    <div className="machine-banner-container">
      <Slider {...settings}>
        {latestMachine && renderMachineSlide(latestMachine, 'Latest Machine')}
        {mostPlayedMachine && renderMachineSlide(mostPlayedMachine, 'Most Played Machine')}
      </Slider>
    </div>
  );
};

export default MachineBanner;