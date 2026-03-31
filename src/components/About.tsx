import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const chars = gsap.utils.toArray('.char');
    
    gsap.from(chars, {
      opacity: 0.1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      }
    });
  }, { scope: containerRef });

  const text = "We are a boutique design agency dedicated to the art of digital craftsmanship. Our philosophy is simple: every pixel has a purpose, and every interaction should feel like a discovery. We blend technical precision with organic aesthetics to create award-winning experiences that resonate deeply with users.";

  return (
    <section ref={containerRef} id="about" className="min-h-screen py-32 px-8 md:px-24 flex items-center justify-center bg-bg">
      <div ref={textRef} className="max-w-5xl">
        <span className="text-xs uppercase tracking-[0.5em] mb-12 block opacity-50">Our Philosophy</span>
        <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] tracking-tight italic">
          {text.split(" ").map((word, i) => (
            <span key={i} className="char inline-block mr-4">
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
