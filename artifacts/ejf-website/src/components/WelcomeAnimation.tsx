import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "ejf_last_visit";
const RETURNING_THRESHOLD_DAYS = 7;

function shouldShowWelcome(): { show: boolean; isReturning: boolean } {
  try {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) {
      return { show: true, isReturning: false };
    }
    const daysSince = (Date.now() - Number(last)) / (1000 * 60 * 60 * 24);
    if (daysSince >= RETURNING_THRESHOLD_DAYS) {
      return { show: true, isReturning: true };
    }
    return { show: false, isReturning: false };
  } catch {
    return { show: false, isReturning: false };
  }
}

function markVisited() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {}
}

const PILLARS = ["Equity", "Justice", "Prosperity"];

export default function WelcomeAnimation() {
  const [visible, setVisible] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [pillarIndex, setPillarIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const { show, isReturning: returning } = shouldShowWelcome();
    if (!show) return;
    setVisible(true);
    setIsReturning(returning);
    markVisited();

    const pillarTimer = setInterval(() => {
      setPillarIndex((i) => (i + 1) % PILLARS.length);
    }, 800);

    const autoTimer = setTimeout(() => {
      setDismissed(true);
    }, 4200);

    return () => {
      clearInterval(pillarTimer);
      clearTimeout(autoTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e1f3d 0%, #1a3a6e 50%, #0e1f3d 100%)" }}
          onClick={() => setDismissed(true)}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }}
          />

          {/* Animated rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/10"
              initial={{ width: 100, height: 100, opacity: 0 }}
              animate={{ width: 100 + i * 200, height: 100 + i * 200, opacity: [0, 0.15, 0] }}
              transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
            />
          ))}

          {/* Gold top accent bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-[#d4a017]"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center px-8 text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="shadow-2xl ring-4 ring-white/20 rounded-2xl p-2 bg-white/5">
                <img src="/logo.png" alt="Economic Justice Forum Logo" className="h-20 w-auto object-contain" />
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-[#d4a017] text-sm font-semibold tracking-[0.25em] uppercase mb-3"
            >
              {isReturning ? "Welcome Back" : "Welcome to"}
            </motion.p>

            {/* Org name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55 }}
              className="text-white text-3xl md:text-4xl font-bold leading-tight mb-2"
            >
              Economic Justice Forum
            </motion.h1>

            {/* Animated pillar word */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="h-10 flex items-center justify-center mb-6"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={pillarIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="text-[#d4a017] text-xl font-bold"
                >
                  {PILLARS[pillarIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-white/60 text-sm max-w-xs leading-relaxed mb-10"
            >
              {isReturning
                ? "Great to see you again. Together we continue the work for a just and equitable world."
                : "Advancing Economic Justice by Strengthening the Relationship Between People and Natural Capital."}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-[#d4a017] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, delay: 1.3, ease: "linear" }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-white/25 text-xs mt-4"
            >
              Tap anywhere to skip
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
