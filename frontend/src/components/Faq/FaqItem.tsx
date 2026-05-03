import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";

export default function FaqItem({ faq, index, isOpen, toggle }) {
  return (
    <motion.div
      onClick={() => toggle(index)}
      className="cursor-pointer rounded-xl border p-4 transition"
      style={{
        background: theme.colors.surface,
        borderColor: theme.colors.border,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center">
        <h3
          className="text-sm font-medium"
          style={{ color: theme.colors.text.primary }}
        >
          {faq.question}
        </h3>

        <motion.span
          className="text-xs"
          style={{ color: theme.colors.text.muted }}
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-3 text-sm leading-relaxed"
            style={{ color: theme.colors.text.muted }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}