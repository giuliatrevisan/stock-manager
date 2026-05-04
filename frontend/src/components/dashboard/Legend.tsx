import { theme } from "../../styles/theme";

type Item = {
  color: string;
  label: string;
};

type Props = {
  items: Item[];
};

export function Legend({ items }: Props) {
  return (
    <div className="flex justify-center gap-4 mt-4 text-sm">
      {items.map((item, index) => (
        <LegendItem key={index} {...item} />
      ))}
    </div>
  );
}

function LegendItem({ color, label }: Item) {
  return (
    <span
      className="flex items-center gap-2 font-medium"
      style={{ color: theme.colors.text.secondary }}
    >
      <span
        className="w-3 h-3 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}