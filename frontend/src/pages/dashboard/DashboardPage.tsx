import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#EF4444", "#F59E0B", "#22C55E"];

export default function DashboardPage() {
  const products = [
    { stock: 0 },
    { stock: 3 },
    { stock: 8 },
    { stock: 15 },
    { stock: 20 },
    { stock: 0 },
    { stock: 5 },
  ];

  const users = [
    { role: "admin" },
    { role: "user" },
    { role: "user" },
    { role: "admin" },
    { role: "user" },
  ];

  const stockData = [
    {
      name: "Sem estoque",
      value: products.filter((p) => p.stock === 0).length,
    },
    {
      name: "Baixo",
      value: products.filter((p) => p.stock > 0 && p.stock < 10).length,
    },
    {
      name: "OK",
      value: products.filter((p) => p.stock >= 10).length,
    },
  ];

  const userData = [
    {
      name: "Admin",
      value: users.filter((u) => u.role === "admin").length,
    },
    {
      name: "User",
      value: users.filter((u) => u.role === "user").length,
    },
  ];

  const totalProducts = products.length;
  const outOfStock = stockData[0].value;
  const totalUsers = users.length;

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight border-l-4 border-blue-600 pl-3">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Visão geral do sistema com indicadores de estoque e usuários.
          Acompanhe produtos em falta, níveis críticos e distribuição de acessos.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Produtos"
          value={totalProducts}
          color="blue"
        />

        <Card
          title="Sem estoque"
          value={outOfStock}
          color="red"
        />

        <Card
          title="Usuários"
          value={totalUsers}
          color="purple"
        />
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ESTOQUE */}
        <ChartCard title="Status do Estoque">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stockData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {stockData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <LegendStock />
        </ChartCard>

        {/* USUÁRIOS */}
        <ChartCard title="Distribuição de Usuários">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                <Cell fill="#2563EB" />
                <Cell fill="#64748B" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <LegendUsers />
        </ChartCard>
      </div>
    </div>
  );
}

//
// 🧱 COMPONENTES
//

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "blue" | "red" | "purple";
}) {
  const styles = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      glow: "shadow-[0_0_12px_rgba(37,99,235,0.25)]",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-600",
      glow: "shadow-[0_0_12px_rgba(239,68,68,0.25)]",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      glow: "shadow-[0_0_12px_rgba(147,51,234,0.25)]",
    },
  };

  const s = styles[color];

  return (
    <div
      className={`
        rounded-xl p-4 border transition-all
        ${s.bg} ${s.border} ${s.glow}
        hover:scale-[1.02]
      `}
    >
      <p className="text-sm text-slate-600">{title}</p>

      <h2 className={`text-3xl font-bold mt-1 ${s.text}`}>
        {value}
      </h2>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl p-5 border bg-white shadow-sm hover:shadow-md transition-all">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        {title}
      </h3>

      {children}
    </div>
  );
}

function LegendStock() {
  return (
    <div className="flex justify-center gap-4 mt-4 text-sm text-slate-600">
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        Sem estoque
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 bg-amber-500 rounded-full" />
        Baixo
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 bg-green-500 rounded-full" />
        OK
      </span>
    </div>
  );
}

function LegendUsers() {
  return (
    <div className="flex justify-center gap-4 mt-4 text-sm text-slate-600">
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 bg-blue-600 rounded-full" />
        Admin
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 bg-slate-500 rounded-full" />
        User
      </span>
    </div>
  );
}