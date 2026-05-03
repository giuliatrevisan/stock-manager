import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { getDashboard } from "../../services/api/dashboardService";
import { theme } from "../../styles/theme";

import { Card } from "../../components/dashboard/Card";
import { ChartCard } from "../../components/dashboard/ChartCard";
import { Legend } from "../../components/dashboard/Legend";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Carregando dashboard...</div>;
  }

  if (!data) {
    return <div className="p-6">Erro ao carregar dados</div>;
  }

  const stockData = [
    { name: "Sem estoque", value: data.products.outOfStock },
    { name: "Baixo", value: data.products.lowStock },
    { name: "OK", value: data.products.ok },
  ];

  const userData = [
    { name: "Admin", value: data.users.admin },
    { name: "User", value: data.users.user },
  ];

  const COLORS = [
    "#EF4444",
    theme.colors.accent.cyan,
    theme.colors.accent.green,
  ];

  const USER_COLORS = [
    theme.colors.accent.blue,
    theme.colors.text.muted,
  ];

  return (
    <div
      className="p-6 space-y-6 min-h-screen"
      style={{ background: theme.colors.background }}
    >
      {/* HEADER */}
      <div>
        <h1
          className="text-2xl font-bold tracking-tight border-l-4 pl-3"
          style={{
            color: theme.colors.text.primary,
            borderColor: theme.colors.accent.blue,
          }}
        >
          Dashboard
        </h1>

        <p
          className="text-sm mt-2"
          style={{ color: theme.colors.text.muted }}
        >
          Visão geral do sistema com indicadores de estoque e usuários.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Produtos" value={data.products.total} color="blue" />
        <Card title="Sem estoque" value={data.products.outOfStock} color="red" />
        <Card title="Usuários" value={data.users.total} color="purple" />
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Status do Estoque">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={stockData} dataKey="value" outerRadius={90}>
                {stockData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <Legend
            items={[
              { color: "#EF4444", label: "Sem estoque" },
              { color: theme.colors.accent.cyan, label: "Baixo" },
              { color: theme.colors.accent.green, label: "OK" },
            ]}
          />
        </ChartCard>

        <ChartCard title="Distribuição de Usuários">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={userData} dataKey="value" outerRadius={90}>
                {userData.map((_, index) => (
                  <Cell key={index} fill={USER_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <Legend
            items={[
              { color: theme.colors.accent.blue, label: "Admin" },
              { color: theme.colors.text.muted, label: "User" },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}