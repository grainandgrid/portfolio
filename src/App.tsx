/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkGallery } from './components/WorkGallery';
import { Team } from './components/Team';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { ScrollVideoIntro } from './components/ScrollVideoIntro';

export default function App() {
  const mainContentRef = useRef<HTMLDivElement>(null);

  return (
    <SmoothScrollProvider>
      <main className="relative bg-bg">
        <ScrollVideoIntro contentRef={mainContentRef} />

        <div ref={mainContentRef}>
          <Navbar />
          <Hero />
          <WorkGallery />
          <Team />
          <About />
          <Footer />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
