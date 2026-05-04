import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getUserFromToken } from "../../utils/auth/getUserFromToken";

import { motion } from "framer-motion";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/api/productService";

import { Box } from "@mui/material";
import InventoryHeader from "../../components/inventory/InventoryHeader";
import ProductTable from "../../components/inventory/ProductTable";
import ProductModal from "../../components/inventory/ProductModal";

export type Product = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  active: boolean;
  createdAt: string;
};

type ProductForm = {
  name: string;
  sku: string;
  stock: number;
  active: boolean;
};

export default function InventoryPage() {
  const user = getUserFromToken();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("active");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [rowCount, setRowCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const [form, setForm] = useState<ProductForm>({
    name: "",
    sku: "",
    stock: 0,
    active: true,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts(
        paginationModel.page + 1,
        paginationModel.pageSize,
        search,
        status
      );

      setProducts(res.data.items);
      setRowCount(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [paginationModel, search, status]);

  const handleSave = async () => {
    try {
      if (selected) {
        await updateProduct(selected.id, form);
      } else {
        await createProduct(form);
      }
  
      setOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      throw err; 
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Produtos");
    XLSX.writeFile(wb, "estoque.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Nome", "SKU", "Estoque"]],
      body: products.map((p) => [p.name, p.sku, p.stock]),
    });

    doc.save("estoque.pdf");
  };

  return (
    <Box sx={{ p: 1 }}>
      <InventoryHeader
        onExportExcel={exportExcel}
        onExportPDF={exportPDF}
        onCreate={() => {
          setSelected(null);
          setForm({
            name: "",
            sku: "",
            stock: 0,
            active: true,
          });
          setOpen(true);
        }}
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        isAdmin={user.role === "admin"}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <ProductTable
          products={products}
          loading={loading}
          paginationModel={paginationModel}
          rowCount={rowCount}
          onPaginationChange={setPaginationModel}
          onEdit={(p) => {
            setSelected(p);

            setForm({
              name: p.name,
              sku: p.sku,
              stock: p.stock,
              active: p.active,
            });

            setOpen(true);
          }}
          onDelete={handleDelete}
        />
      </motion.div>

      <ProductModal
        open={open}
        selected={!!selected}
        form={form}
        setForm={setForm}
        onClose={() => setOpen(false)}
        onSubmit={handleSave}
      />
    </Box>
  );
}
