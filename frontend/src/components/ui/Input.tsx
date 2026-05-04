import type { InputHTMLAttributes } from "react";
import { theme } from "../../styles/theme";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, ...props }: Props) {
  return (
    <div className="relative">
      <input
        {...props}
        placeholder=" "
        className={`
          peer w-full p-3 rounded-lg outline-none transition
          border
          focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500 focus:ring-red-500" : ""}
        `}
        style={{
          borderColor: error ? "#ef4444" : theme.colors.border,
          color: theme.colors.text.primary,
          background: theme.colors.surface,
        }}
      />

      <label
        className="
          absolute left-3 px-1 transition-all
          top-3 text-sm
          peer-focus:-top-2 peer-focus:text-xs
          peer-[&:not(:placeholder-shown)]:-top-2 
          peer-[&:not(:placeholder-shown)]:text-xs
        "
        style={{
          background: theme.colors.surface,
          color: theme.colors.text.muted,
        }}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}