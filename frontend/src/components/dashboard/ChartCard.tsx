import { theme } from "../../styles/theme";

type Props = {
  title: string;
  children: React.ReactNode;
};

export function ChartCard({ title, children }: Props) {
  return (
    <div
      className="rounded-xl p-5 border transition-all hover:shadow-md"
      style={{
        background: theme.colors.surface,
        borderColor: theme.colors.border,
      }}
    >
      <h3
        className="font-semibold mb-4 flex items-center gap-2"
        style={{ color: theme.colors.text.primary }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: theme.colors.accent.blue }}
        />
        {title}
      </h3>

      {children}
    </div>
  );
}