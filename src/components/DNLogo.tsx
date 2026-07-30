import React from 'react';

interface DNLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isFr?: boolean;
  showText?: boolean;
  textClassName?: string;
  layout?: 'horizontal' | 'vertical';
}

export const DNLogoIcon: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const idSuffix = React.useId().replace(/:/g, '');

  return (
    <div className={`relative flex items-center justify-center shrink-0 group ${sizeMap[size]} ${className}`}>
      {/* Dynamic Multi-Color Radiant Aura Glow (Cobalt, Cyan, Golden Amber) */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#2563EB]/60 via-[#38BDF8]/50 to-[#F59E0B]/70 rounded-full blur-md opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
      
      <svg 
        className="w-full h-full relative z-10 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Facet 1: Royal Sapphire Blue (Top-Left Outer) */}
          <linearGradient id={`facet-sapphire-${idSuffix}`} x1="8" y1="28" x2="50" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Facet 2: Electric Cyan Azure (Top-Right Outer) */}
          <linearGradient id={`facet-cyan-${idSuffix}`} x1="50" y1="4" x2="92" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Facet 3: Luminous Golden Amber Base (Bottom Outer) - HIGH CONTRAST AGAINST DARK BACKGROUNDS */}
          <linearGradient id={`facet-goldbase-${idSuffix}`} x1="8" y1="76" x2="92" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Facet 4: Pure Diamond Platinum (Center Left Pyramid Face) */}
          <linearGradient id={`facet-diamond-${idSuffix}`} x1="50" y1="4" x2="25" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFF2D6" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          {/* Facet 5: Imperial Champagne Gold (Center Right Pyramid Face) */}
          <linearGradient id={`facet-champagne-${idSuffix}`} x1="50" y1="4" x2="75" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Facet 6: Glowing Copper Amber (Center Bottom Pyramid Face) */}
          <linearGradient id={`facet-copper-${idSuffix}`} x1="50" y1="52" x2="50" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* FACET 1: Top-Left Outer Facet (Royal Sapphire Blue) */}
        <path 
          d="M 8 28 L 50 4 L 8 76 Z" 
          fill={`url(#facet-sapphire-${idSuffix})`}
        />

        {/* FACET 2: Top-Right Outer Facet (Electric Cyan Azure) */}
        <path 
          d="M 92 28 L 50 4 L 92 76 Z" 
          fill={`url(#facet-cyan-${idSuffix})`}
        />

        {/* FACET 3: Bottom Outer Facet (Luminous Golden Amber - HIGH CONTRAST) */}
        <path 
          d="M 8 76 L 92 76 L 50 100 Z" 
          fill={`url(#facet-goldbase-${idSuffix})`}
        />

        {/* FACET 4: Central Pyramid - Left Face (Diamond Platinum White) */}
        <path 
          d="M 50 4 L 50 52 L 8 76 Z" 
          fill={`url(#facet-diamond-${idSuffix})`}
        />

        {/* FACET 5: Central Pyramid - Right Face (Imperial Champagne Gold) */}
        <path 
          d="M 50 4 L 92 76 L 50 52 Z" 
          fill={`url(#facet-champagne-${idSuffix})`}
        />

        {/* FACET 6: Central Pyramid - Bottom Face (Rich Copper Amber) */}
        <path 
          d="M 8 76 L 92 76 L 50 52 Z" 
          fill={`url(#facet-copper-${idSuffix})`}
        />

        {/* Crisp Architectural Bevel Strokes & Glint Highlights */}
        <path d="M 50 4 L 50 52" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.95" strokeLinecap="round" />
        <path d="M 8 76 L 50 52" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.85" />
        <path d="M 92 76 L 50 52" stroke="#FFF9EB" strokeWidth="0.8" strokeOpacity="0.85" />
        <path d="M 8 28 L 50 4 L 92 28" stroke="#7DD3FC" strokeWidth="0.6" strokeOpacity="0.75" />
        <path d="M 8 76 L 92 76" stroke="#FEF3C7" strokeWidth="0.8" strokeOpacity="0.9" />
      </svg>
    </div>
  );
};

export const DNLogo: React.FC<DNLogoProps> = ({ 
  className = '', 
  size = 'md', 
  isFr = false,
  showText = true,
  layout = 'horizontal',
  textClassName = '' 
}) => {
  const titleSizeMap = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
    xl: 'text-3xl md:text-4xl'
  };

  const subtitleSizeMap = {
    sm: 'text-[8.5px]',
    md: 'text-[9.5px]',
    lg: 'text-[11px]',
    xl: 'text-[12px]'
  };

  const subtitleText = 'Strategic Mineral Platform';

  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col items-center justify-center text-center' : 'flex-row items-center gap-3 text-left'} group ${className}`}>
      <DNLogoIcon size={size} />

      {showText && (
        <div className={`flex flex-col ${layout === 'vertical' ? 'items-center text-center' : 'items-start text-left'}`}>
          <div className={`flex items-center gap-1.5 ${layout === 'vertical' ? 'justify-center' : 'justify-start'}`}>
            <span className={`font-black tracking-wider uppercase text-white leading-none ${titleSizeMap[size]} ${textClassName}`}>
              DRC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2D6] via-[#FBBF24] to-[#F59E0B] font-black drop-shadow-sm">NEXUS</span>
            </span>
          </div>
          
          <div className={`flex items-center gap-1.5 mt-1.5 ${layout === 'vertical' ? 'justify-center' : 'justify-start'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] inline-block animate-pulse shrink-0" />
            <span className={`${subtitleSizeMap[size]} font-bold tracking-[0.2em] text-slate-300 uppercase leading-none`}>
              {subtitleText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DNLogo;
