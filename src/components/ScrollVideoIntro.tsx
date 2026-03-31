import { RefObject, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollVideoIntroProps = {
  contentRef: RefObject<HTMLDivElement | null>;
};

export function ScrollVideoIntro({ contentRef }: ScrollVideoIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoDurationRef = useRef(0);
  const targetTimeRef = useRef(0);
  const lastAppliedTimeRef = useRef(-1);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      const content = contentRef.current;

      if (!section || !video) {
        return;
      }

      if (content) {
        gsap.set(content, { autoAlpha: 0 });
      }
      gsap.set(section, { autoAlpha: 1 });

      const smoothToTarget = gsap.quickTo(targetTimeRef, 'current', {
        duration: 0.12,
        ease: 'power1.out',
      });

      const applyVideoTime = () => {
        const duration = videoDurationRef.current;
        if (!duration || video.readyState < 2) {
          return;
        }

        const safeEnd = Math.max(duration - 0.05, 0);
        const nextTime = Math.min(Math.max(targetTimeRef.current, 0), safeEnd);

        // Skip tiny seeks; frequent micro-updates cause decode thrashing.
        if (Math.abs(lastAppliedTimeRef.current - nextTime) < 1 / 30) {
          return;
        }

        video.currentTime = nextTime;
        lastAppliedTimeRef.current = nextTime;
      };

      const syncDuration = () => {
        if (Number.isFinite(video.duration) && video.duration > 0) {
          videoDurationRef.current = video.duration;
          targetTimeRef.current = 0;
          lastAppliedTimeRef.current = -1;

          // Prime the decoder so scrubbing updates frames reliably, especially on Safari/iOS.
          video.currentTime = 0.001;
          void video.play().then(() => video.pause()).catch(() => {
            // Ignore autoplay restrictions; manual currentTime updates still work when allowed.
          });

          ScrollTrigger.refresh();
        }
      };

      video.addEventListener('loadedmetadata', syncDuration);
      video.addEventListener('durationchange', syncDuration);

      const scrubTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const duration = videoDurationRef.current;
          if (!duration) {
            return;
          }

          const targetTime = self.progress * Math.max(duration - 0.05, 0);
          smoothToTarget(targetTime);
          applyVideoTime();
        },
      });

      const tickerUpdate = () => {
        applyVideoTime();
      };

      gsap.ticker.add(tickerUpdate);

      let fadeTimeline: gsap.core.Timeline | null = null;

      if (content) {
        fadeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'bottom-=30% bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        fadeTimeline
          .to(section, { autoAlpha: 0, ease: 'none' }, 0)
          .to(content, { autoAlpha: 1, ease: 'none' }, 0);
      }

      return () => {
        video.removeEventListener('loadedmetadata', syncDuration);
        video.removeEventListener('durationchange', syncDuration);
        gsap.ticker.remove(tickerUpdate);
        fadeTimeline?.kill();
        scrubTrigger.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="intro" className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/Intro_animation_video_202603312112.mp4"
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-14 flex justify-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-fg/70">Scroll to play</p>
        </div>
      </div>
    </section>
  );
}