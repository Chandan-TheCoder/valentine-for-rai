import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css'; // Assume basic Tailwind imports here

const App = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  // Function to trigger the "Rose" confetti effect
  const triggerRoseExplosion = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffccd5'] // Rose colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffccd5']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleYes = async () => {
    setAccepted(true);
    triggerRoseExplosion();
    
    // Send answer to backend
    try {
      await fetch('http://localhost:5000/api/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: 'YES', person: 'Rai' })
      });
    } catch (err) {
      console.error("Love needs no server, but the server failed:", err);
    }
  };

  // Make the "No" button run away
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* Background Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 opacity-50 text-4xl"
            initial={{ y: '110vh', x: Math.random() * window.innerWidth }}
            animate={{ y: '-10vh' }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {!accepted ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="z-10 text-center p-8 bg-white/30 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 max-w-2xl"
          >
            {/* The Rose Image Placeholder */}
            

[Image of beautiful red rose vector illustration]

            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-6xl mb-6"
            >
              🌹
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-serif text-red-600 mb-6 font-bold">
              My Dearest Rai...
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-800 font-light italic mb-8 leading-relaxed">
              "Will you be my Valentine forever? <br/>
              Will you be the most beautiful rose in the garden of my heart?"
            </p>

            <div className="flex gap-8 justify-center items-center mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transition-colors"
                onClick={handleYes}
              >
                Yes, Forever! 💖
              </motion.button>

              <motion.button
                animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                onHoverStart={moveNoButton}
                onClick={moveNoButton}
                className="bg-gray-300 text-gray-600 px-8 py-4 rounded-full text-lg font-medium cursor-pointer"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4 drop-shadow-md">
              She Said Yes!
            </h1>
            <p className="text-2xl text-pink-700">The garden is now complete. 🌹</p>
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="mt-8 text-9xl"
            >
              ❤️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
