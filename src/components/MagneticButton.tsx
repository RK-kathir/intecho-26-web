import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "glass";
}

const MagneticButton = ({ children, className = "", onClick, variant = "glass" }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 15 });
  const springY = useSpring(y, { stiffness: 300, damping: 15 });
  const scale = useSpring(1, { stiffness: 300, damping: 15 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
    scale.set(1.08);
  }, [x, y, scale]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [x, y, scale]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Ripple burst animation
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const ripple = document.createElement("span");
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    ripple.style.cssText = `
      position: absolute; left: ${rx}px; top: ${ry}px;
      width: 0; height: 0; border-radius: 50%;
      background: radial-gradient(circle, rgba(255,45,45,0.6) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: ripple-burst 0.6s ease-out forwards;
    `;
    ref.current.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
    onClick?.();
  }, [onClick]);

  const baseClass = variant === "primary" ? "btn-primary" : "btn-glass";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY, scale }}
      className={`${baseClass} ${className} relative overflow-hidden`}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
