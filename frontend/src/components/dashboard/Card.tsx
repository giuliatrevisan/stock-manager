import { theme } from "../../styles/theme";

type Props = {
  title: string;
  value: number;
  color: "blue" | "red" | "purple";
};

export function Card({ title, value, color }: Props) {
  const styles = {
    blue: {
      bg: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(37,99,235,0.08))",
      border: theme.colors.accent.blue,
      text: theme.colors.accent.blue,
      glow: "rgba(37,99,235,0.45)",
    },
    red: {
      bg: "linear-gradient(135deg, rgba(239,68,68,0.18), rgba(239,68,68,0.08))",
      border: "#EF4444",
      text: "#DC2626",
      glow: "rgba(239,68,68,0.45)",
    },
    purple: {
      bg: "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(168,85,247,0.08))",
      border: theme.colors.accent.purple,
      text: theme.colors.accent.purple,
      glow: "rgba(168,85,247,0.45)",
    },
  };

  const s = styles[color];

  return (
    <div
      className="rounded-xl p-4 border transition-all duration-300 hover:-translate-y-[3px]"
      style={{
        background: s.bg,
        borderColor: s.border,
        boxShadow: `0 6px 20px ${s.glow}`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = `0 10px 28px ${s.glow}`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = `0 6px 20px ${s.glow}`)
      }
    >
      <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-1" style={{ color: s.text }}>
        {value}
      </h2>
    </div>
  );
}