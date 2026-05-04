import { theme } from "../../styles/theme";

type Props = {
  title: string;
  subtitle?: string;
};

export function PageTitle({ title, subtitle }: Props) {
  return (
    <div className="mb-6">
      <h1
        className="text-2xl font-bold border-l-4 pl-3"
        style={{
          color: theme.colors.text.primary,
          borderColor: theme.colors.accent.blue,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm mt-2" style={{ color: theme.colors.text.muted }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}