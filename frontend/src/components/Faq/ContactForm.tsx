import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";
import { Input } from "../../components/ui/Input";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    assunto: "",
    mensagem: "",
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setShowDialog(true);
    setFormData({ assunto: "", mensagem: "" });
  };

  return (
    <>
      <motion.div
        className="rounded-xl p-6 border space-y-4"
        style={{
          background: theme.colors.surface,
          borderColor: theme.colors.border,
        }}
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <p style={{ color: theme.colors.text.muted }}>
          Entre em contato com o suporte.
        </p>

        {/* INPUT PADRÃO */}
        <Input
          label="Assunto"
          name="assunto"
          value={formData.assunto}
          onChange={handleChange}
        />

        {/* TEXTAREA (mantém simples, mas alinhado ao design) */}
        <div>
          <label
            className="text-sm"
            style={{ color: theme.colors.text.muted }}
          >
            Mensagem
          </label>

          <textarea
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg border text-sm h-28 outline-none resize-none"
            style={{
              borderColor: theme.colors.border,
              background: theme.colors.surface,
              color: theme.colors.text.primary,
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-lg font-medium text-sm transition hover:opacity-90"
          style={{
            background: theme.colors.accent.blue,
            color: "#fff",
          }}
        >
          Enviar mensagem
        </button>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "rgba(15,23,42,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-xl p-6 max-w-md w-full border"
              style={{
                background: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: theme.colors.text.primary }}
              >
                Tela de teste
              </h2>

              <p
                className="text-sm mb-4"
                style={{ color: theme.colors.text.muted }}
              >
                Essa é uma tela de simulação. Em produção, este formulário
                enviaria um e-mail real para o suporte via sistema de tickets.
              </p>

              <button
                onClick={() => setShowDialog(false)}
                className="w-full py-2 rounded-lg text-sm font-medium"
                style={{
                  background: theme.colors.accent.blue,
                  color: "#fff",
                }}
              >
                Entendi
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}