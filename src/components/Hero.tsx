import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LiquidGlass } from './LiquidGlass';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 2 } });

    tl.from(titleRef.current, {
      y: 200,
      skewY: 10,
      opacity: 0,
      delay: 0.5,
    })
    .from(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      rotate: -5,
    }, "-=1.5");

    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 200,
      opacity: 0.5,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <LiquidGlass />
      
      <div className="relative z-10 text-center px-4">
        <div className="mb-12 overflow-hidden">
          <img 
            ref={logoRef}
            src="https://ais-dev-dihn5inn7jkchlh2cnh6ju-7708100814.asia-southeast1.run.app/logo.png" 
            alt="Grain & Grid Logo" 
            className="w-64 md:w-96 mx-auto drop-shadow-2xl"
          />
        </div>
        
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="text-6xl md:text-[12vw] leading-[0.9] tracking-tighter uppercase font-serif italic">
            Design <br /> <span className="not-italic font-sans font-black">Excellence</span>
          </h1>
        </div>
        
        <p className="mt-8 text-sm md:text-base uppercase tracking-[0.3em] font-medium opacity-60">
          Crafting Digital Experiences with Precision
        </p>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-fg/50" />
      </div>
    </section>
  );
}
