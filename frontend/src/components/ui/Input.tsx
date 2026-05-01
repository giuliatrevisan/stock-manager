import type { InputHTMLAttributes } from "react";

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
          peer w-full p-3 border rounded-lg outline-none transition
          focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
        `}
      />

      <label
        className="
          absolute left-3 bg-white px-1 text-gray-500 transition-all
          top-3 text-base
          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
          peer-[&:not(:placeholder-shown)]:-top-2 
          peer-[&:not(:placeholder-shown)]:text-xs
        "
      >
        {label}
      </label>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}