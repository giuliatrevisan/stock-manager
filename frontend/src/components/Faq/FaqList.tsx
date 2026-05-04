import { useState } from "react";
import FaqItem from "./FaqItem";
import { theme } from "../../styles/theme";

const faqs = [
  {
    question: "Como funciona o sistema de estoque?",
    answer:
      "O sistema permite cadastrar, atualizar e monitorar produtos em tempo real, com controle de estoque baixo e sem estoque.",
  },
  {
    question: "Como sei quando um produto está acabando?",
    answer:
      "O dashboard exibe alertas automáticos para produtos com estoque baixo ou zerado.",
  },
  {
    question: "Quem pode acessar o sistema?",
    answer:
      "Usuários com perfil admin têm acesso completo, enquanto usuários comuns possuem permissões limitadas.",
  },
  {
    question: "Posso editar ou excluir produtos?",
    answer:
      "Sim, apenas usuários administradores podem editar ou remover produtos do sistema.",
  },
  {
    question: "Os dados são atualizados em tempo real?",
    answer:
      "Sim, o sistema reflete as atualizações conforme as ações realizadas no estoque.",
  },
];

export default function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
     
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            faq={faq}
            index={index}
            isOpen={openIndex === index}
            toggle={toggle}
          />
        ))}
    </div>
  );
}