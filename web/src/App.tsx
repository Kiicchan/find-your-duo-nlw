import './styles/main.css'
import logoImg from "./assets/logo-nlw-esports.svg";
import { MagnifyingGlassPlus } from "phosphor-react";

function App() {
  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20 bg-nlw-gradient bg-clip-text'>
        Seu <span className='text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {Array(6).fill(0).map((_, index) => {
          return (
            <a key={index} href="#" className='relative rounded-lg overflow-hidden'>
              <img src={`/image ${index + 1}.png`} alt="" />

              <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0'>
                <strong className='font-bold text-white block'>Jogo do balacobaco</strong>
                <span className='text-zinc-300 text-sm block'>3 anúncios</span>
              </div>
            </a>
          )
        })}
      </div>

      <div className='pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className='py-3 px-4 bg-violet-500 text-white rounded-md flex items-center gap-3 hover:bg-violet-600'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
