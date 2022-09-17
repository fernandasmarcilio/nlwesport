import { useEffect, useState } from 'react';
import { api } from './lib/api';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import logo from "./assets/logo.svg";
import "./styles/main.css";
import { CreateAdModal } from './components/CreateAdModal';

interface Games {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  }
}

export function App() {
  const [games, setGames] = useState<Games[]>([]);

  useEffect(() => {
    api.get('/games').then(response => {
      setGames(response.data);
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="NLW esport logo" />

      <h1 className="text-6xl text-white font-black mt-20 ">
        Seu <span className="gradient-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner 
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>


      <CreateAdModal>
        <CreateAdBanner />

      </CreateAdModal>

    </div>
  );
}
