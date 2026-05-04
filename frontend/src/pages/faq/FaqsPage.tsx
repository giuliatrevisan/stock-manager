import { motion } from "framer-motion";
import FaqList from "../../components/Faq/FaqList";
import ContactForm from "../../components/Faq/ContactForm";
import { theme } from "../../styles/theme";
import { PageTitle } from "../../components/ui/PageTitle";

export default function FaqPage() {
  return (
    <div
      className="min-h-screen w-full p-6 space-y-8"
      style={{ background: theme.colors.background }}
    >
      {/* HEADER */}
      <PageTitle
        title=" FAQ & Suporte"
        subtitle="Tire suas dúvidas ou entre em contato com o suporte."
      />
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
