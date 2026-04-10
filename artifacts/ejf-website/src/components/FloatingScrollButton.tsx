import { useEffect, useState } from "react";

export default function FloatingScrollButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll to top */}
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 z-50 bg-[#0e1f3d] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#1a2f5e] transition-colors"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

    </>
  );
}
