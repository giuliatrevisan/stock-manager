import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { getDashboard } from "../../services/api/dashboardService";
import { theme } from "../../styles/theme";

import { Card } from "../../components/dashboard/Card";
import { ChartCard } from "../../components/dashboard/ChartCard";
import { Legend } from "../../components/dashboard/Legend";
import { PageTitle } from "../../components/ui/PageTitle";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [data, setData] = useState({
    products: {
      total: 0,
      outOfStock: 0,
      lowStock: 0,
      ok: 0,
    },
    users: {
      total: 0,
      admin: 0,
      user: 0,
    },
  });
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
    { name: "Sem estoque", value: data?.products?.outOfStock ?? 0 },
    { name: "Baixo", value: data?.products?.lowStock ?? 0 },
    { name: "OK", value: data?.products?.ok ?? 0 },
  ];

  const userData = [
    { name: "Admin", value: data?.users?.admin ?? 0 },
    { name: "User", value: data?.users?.user ?? 0 },
  ];

  const COLORS = [
    "#EF4444",
    theme.colors.accent.cyan,
    theme.colors.accent.green,
  ];

  const USER_COLORS = [theme.colors.accent.blue, theme.colors.text.muted];
  const hasStockData = stockData.some((item) => item.value > 0);
  return (
    <div
      className="p-6 space-y-6 min-h-screen"
      style={{ background: theme.colors.background }}
    >
      {/* HEADER */}
      <PageTitle
        title="Dashboard"
        subtitle="Visão geral do sistema com indicadores de estoque e usuários."
      />
      {/* CARDS */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {" "}
        <Card title="Produtos" value={data.products.total} color="blue" />
        <Card
          title="Sem estoque"
          value={data.products.outOfStock}
          color="red"
        />
        <Card title="Usuários" value={data.users.total} color="purple" />
      </motion.div>

      {/* GRÁFICOS */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {" "}
        <ChartCard title="Status do Estoque">
          {hasStockData ? (
            <>
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
            </>
          ) : (
            <div className="h-[250px] flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-500">
                Nenhum produto cadastrado ainda
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Crie novos produtos para visualizar o gráfico
              </p>
            </div>
          )}
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
      </motion.div>
    </div>
  );
}
