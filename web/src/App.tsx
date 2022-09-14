import { MagnifyingGlassPlus } from 'phosphor-react';

import "./styles/main.css";

import logo from "./assets/logo.svg";

export function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="NLW esport logo" />

      <h1 className="text-6xl text-white font-black mt-20 ">
        Seu <span className="gradient-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="" className="relative rounded-lg overflow-hidden">
          <img
            src="/game-1.png"
            alt=""
            className="hover:scale-125 transition-all"
          />

          <div className="w-full pt-16 pb-4 px-4 gradient-card absolute bottom-0 left-0 right-0">
            <span className="font-bold text-white block">
              League of legends
            </span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img
            src="/game-2.png"
            alt=""
            className="hover:scale-125 transition-all"
          />

          <div className="w-full pt-16 pb-4 px-4 gradient-card absolute bottom-0 left-0 right-0">
            <span className="font-bold text-white block">Dota</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img
            src="/game-3.png"
            alt=""
            className="hover:scale-125 transition-all"
          />

          <div className="w-full pt-16 pb-4 px-4 gradient-card absolute bottom-0 left-0 right-0">
            <span className="font-bold text-white block">Counter Strike</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img
            src="/game-4.png"
            alt=""
            className="hover:scale-125 transition-all"
          />

          <div className="w-full pt-16 pb-4 px-4 gradient-card absolute bottom-0 left-0 right-0">
            <span className="font-bold text-white block">Apex</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img
            src="/game-5.png"
            alt=""
            className="hover:scale-125 transition-all"
          />

          <div className="w-full pt-16 pb-4 px-4 gradient-card absolute bottom-0 left-0 right-0">
            <span className="font-bold text-white block">Fortinite</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img
            src="/game-6.png"
            alt=""
            className="hover:scale-125 transition-all"
          />

          <div className="w-full pt-16 pb-4 px-4 gradient-card absolute bottom-0 left-0 right-0">
            <span className="font-bold text-white block">
              World of Warcraft
            </span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="gradient-border pt-1 mt-8 self-stretch rounded-lg overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between">
          <div className="flex flex-col">
            <strong className="text-2xl text-white font-black">Não encontrou seu duo?</strong>
            <span className="text-zinc-400">Publique um anúncio para encontrar novos players!</span>
          </div>
          <button className="py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 transition-all flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  );
}
