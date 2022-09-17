import './styles/main.css'
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from './components/GameBanner';
import { useEffect, useState } from 'react';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

export interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios.get('http://localhost:3333/games')
      .then(response => setGames(response.data))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20 bg-nlw-gradient bg-clip-text'>
        Seu <span className='text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16 '>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              adsCount={game._count.ads}
              bannerUrl={game.bannerUrl}
              title={game.title}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  )
}

export default App
