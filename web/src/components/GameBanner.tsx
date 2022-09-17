interface GameBanneProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner({ bannerUrl, title, adsCount } : GameBanneProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img
        src={bannerUrl}
        alt={title}
        className="hover:scale-125 transition-all"
      />

      <div className="w-full pt-16 pb-4 px-4 gradient-card absolute bottom-0 left-0 right-0">
        <span className="font-bold text-white block">{title}</span>
        <span className="text-zinc-300 text-sm block mt-1">{adsCount} anúncio(s)</span>
      </div>
    </a>
  );
}
