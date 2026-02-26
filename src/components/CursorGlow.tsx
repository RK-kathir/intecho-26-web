import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorGlow = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });
  const opacity = useSpring(0, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    };
    const handleLeave = () => opacity.set(0);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y, opacity]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        opacity,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,45,45,0.08) 0%, rgba(255,45,45,0.02) 40%, transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CursorGlow;
