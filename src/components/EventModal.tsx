import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
  children?: ReactNode;
}

const EventModal = ({ open, onClose, title, description, image }: EventModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass-strong rounded-2xl p-8 max-w-md w-full glow-red"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center gap-4">
              <img src={image} alt={title} className="w-20 h-20 rounded-lg object-cover" />
              <h3 className="font-heading text-2xl font-bold text-foreground">{title}</h3>
              <p className="font-body text-muted-foreground text-center text-sm leading-relaxed">{description}</p>
              <button className="btn-primary mt-2">Register Now</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
