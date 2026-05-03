import { motion } from "framer-motion";
import FaqList from "../../components/Faq/FaqList";
import ContactForm from "../../components/Faq/ContactForm";
import { theme } from "../../styles/theme";

export default function FaqPage() {
  return (
    <div
      className="min-h-screen w-full p-6 space-y-8"
      style={{ background: theme.colors.background }}
    >
      {/* HEADER */}
      <div>
        <h1
          className="text-2xl font-bold border-l-4 pl-3"
          style={{
            color: theme.colors.text.primary,
            borderColor: theme.colors.accent.blue,
          }}
        >
          FAQ & Suporte
        </h1>

        <p
          className="text-sm mt-2"
          style={{ color: theme.colors.text.muted }}
        >
          Tire suas dúvidas ou entre em contato com o suporte.
        </p>
      </div>

      {/* CONTEÚDO */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* FAQ */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: theme.colors.text.primary }}
          >
            Perguntas frequentes
          </h2>

          <FaqList />
        </motion.div>

        {/* FORM */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: theme.colors.text.primary }}
          >
            Ainda precisa de ajuda?
          </h2>

          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}