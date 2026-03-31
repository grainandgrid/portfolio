import { motion } from 'motion/react';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference"
    >
      <div className="text-xl font-serif tracking-tighter uppercase">
        Grain & Grid
      </div>
      
      <div className="flex gap-12 text-sm uppercase tracking-widest font-medium">
        <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
        <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
        <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
      </div>
      
      <div className="text-sm font-medium">
        EST. 2024
      </div>
    </motion.nav>
  );
}
