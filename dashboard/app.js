import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// Mode descriptions for Practice and Challenge
const modeDescriptions = {
  Practice:
    "Practice mode helps you groove at your own pace. Experiment with moves, perfect your timing, and learn the steps in a relaxed environment.",
  Challenge:
    "Challenge mode is where the heat is on. Test your skills with timed challenges and climb the leaderboard as you show off your dance prowess.",
};

function App() {
  const [selectedMode, setSelectedMode] = useState(null);

  // Framer Motion variants for page layout transitions
  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 },
  };

  // Transition settings
  const pageTransition = { type: "tween", duration: 0.5 };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-500 text-white font-sans">
      <AnimatePresence exitBeforeEnter>
        {selectedMode === null && (
          <motion.div
            key="landing"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full text-center"
          >
            <h1 className="text-5xl font-light mb-12">Jiggy</h1>
            <div className="flex justify-center gap-8 mb-12">
              {/* Practice Button */}
              <button
                onClick={() => setSelectedMode("Practice")}
                className="w-40 h-40 bg-white/10 rounded-2xl shadow-lg flex flex-col items-center justify-center backdrop-blur-md hover:scale-105 transition-transform"
              >
                {/* Inline Pencil SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 mb-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M2 22l4-1 12-12-3-3L3 18l-1 4z" />
                  <path d="M14 4l6 6" />
                </svg>
                <span className="text-lg">Practice</span>
              </button>

              {/* Challenge Button */}
              <button
                onClick={() => setSelectedMode("Challenge")}
                className="w-40 h-40 bg-white/10 rounded-2xl shadow-lg flex flex-col items-center justify-center backdrop-blur-md hover:scale-105 transition-transform"
              >
                {/* Inline Sword SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 mb-2"
                  viewBox="0 0 24 24"
                >
                  <line x1="12" y1="2" x2="12" y2="14" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="12" y1="14" x2="10" y2="22" />
                  <line x1="12" y1="14" x2="14" y2="22" />
                  <circle cx="12" cy="22" r="1" />
                </svg>
                <span className="text-lg">Challenge</span>
              </button>
            </div>

            {/* Optional: Source & Upload Section (can be kept or removed) */}
            <div className="flex flex-col gap-6 w-full max-w-xl px-6 mx-auto">
              <div className="flex justify-between items-center">
                <label className="text-lg">Source</label>
                <button className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md hover:bg-white/20 transition-colors">
                  Upload file
                </button>
              </div>
              <div>
                <label className="text-lg block mb-2">Loading</label>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedMode !== null && (
          <motion.div
            key="detail"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full text-center px-4"
          >
            <h2 className="text-4xl font-light mb-6">{selectedMode} Mode</h2>
            <p className="max-w-md mx-auto mb-8">{modeDescriptions[selectedMode]}</p>
            <button
              onClick={() => setSelectedMode(null)}
              className="mt-4 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              Go Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));