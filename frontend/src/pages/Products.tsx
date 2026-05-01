import { useEffect, useState } from "react";
import { api } from "../api/axios";

type Product = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  active: boolean;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data.items);
    } catch (err) {
      console.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Produtos</h2>

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10,
          }}
        >
          <p><strong>{p.name}</strong></p>
          <p>SKU: {p.sku}</p>
          <p>Stock: {p.stock}</p>
          <p>Status: {p.active ? "Ativo" : "Inativo"}</p>
        </div>
      ))}
    </div>
  );
}