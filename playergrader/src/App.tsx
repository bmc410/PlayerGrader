import React, { useEffect } from 'react';
import './App.css';
import { useAtom } from 'jotai';
import { playerAtom, Player } from './models/playerstate';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { activeSlideAtom } from './models/slidestate';

function App() {
  const [players, setPlayers] = useAtom(playerAtom);
  const [activeSlideIndex, setActiveSlideIndex] = useAtom(activeSlideAtom); // Use the atom


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('players.json'); // Update the path if needed
          const data = await response.json();
          setPlayers(data);
        } catch (error) {
          console.error('Error fetching player data:', error);
        }
      };
  
      fetchData();
    }, []);

  const handleSwiperSlideChange = (swiper: any) => {
    let player = getPlayerById(swiper.activeIndex + 1)
    console.log(JSON.stringify(player)); // Update active slide index
  };

  const addPlayer = (newPlayer: Player) => {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  const getPlayerById = (id: number): Player | undefined => {
    return players.find(player => player.id === id);
  };

  return (
     <div>
      <Swiper 
        loop={true} 
        onSlideChange={handleSwiperSlideChange} 
      >
      {players.map((player, index) => (
          <SwiperSlide key={player.id} onClick={() => console.log(index)}>
            <div style={{paddingLeft: '20px'}} className="swiper-slide-content">
              <p>{player.firstName} {player.lastName}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;
