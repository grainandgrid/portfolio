import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Ethereal",
    category: "Brand Identity",
    image: "https://picsum.photos/seed/ethereal/1200/1600",
    video: "/videos/Intro_animation_video_202603312112.mp4",
  },
  {
    title: "Onyx",
    category: "Digital Product",
    image: "https://picsum.photos/seed/onyx/1200/1600",
    video: undefined,
  },
  {
    title: "Lumina",
    category: "Art Direction",
    image: "https://picsum.photos/seed/lumina/1200/1600",
    video: undefined,
  },
  {
    title: "Vortex",
    category: "Motion Design",
    image: "https://picsum.photos/seed/vortex/1200/1600",
    video: undefined,
  },
];

export function WorkGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.project-card');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + horizontalRef.current?.offsetWidth,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="work" className="bg-bg overflow-hidden">
      <div ref={horizontalRef} className="flex h-screen w-[400vw]">
        {PROJECTS.map((project, i) => (
          <div 
            key={i} 
            className="project-card relative w-screen h-screen flex items-center justify-center p-8 md:p-24"
          >
            <div className="relative w-full h-full group overflow-hidden rounded-2xl">
              {project.video ? (
                <video
                  src={project.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
              ) : (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-sm uppercase tracking-widest mb-2">{project.category}</span>
                    <h2 className="text-6xl md:text-8xl font-serif italic">{project.title}</h2>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
