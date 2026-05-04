import { Box, Button, MenuItem, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { FileSpreadsheet, FileDown, Plus } from "lucide-react";
import { PageTitle } from "../ui/PageTitle";

type Props = {
  onExportExcel: () => void;
  onExportPDF: () => void;
  onCreate: () => void;

  search: string;
  setSearch: (v: string) => void;

  status: string;
  setStatus: (v: string) => void;

  isAdmin: boolean;
};

export default function InventoryHeader({
  onExportExcel,
  onExportPDF,
  onCreate,
  search,
  setSearch,
  status,
  setStatus,
  isAdmin,
}: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* TITLE  */}
      <Box sx={{ mb: 2 }}>
        <PageTitle
          title="Controle de Estoque"
          subtitle="Gerencie produtos e exporte relatórios em tempo real."
        />

        {/* FILTROS  */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
            <TextField
              size="small"
              placeholder="Buscar por nome ou SKU"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: 300 }}
            />

            {isAdmin && (
              <TextField
                select
                size="small"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{ width: 180 }}
              >
                <MenuItem value="active">Ativos</MenuItem>
                <MenuItem value="inactive">Inativos</MenuItem>
                <MenuItem value="all">Todos</MenuItem>
              </TextField>
            )}
          </Box>
        </motion.div>
      </Box>

      {/* ACTIONS  */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={onExportExcel}
              startIcon={<FileSpreadsheet size={18} />}
              sx={{
                border: "1px solid #22C55E",
                color: "#16A34A",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  background: "rgba(34,197,94,0.08)",
                },
              }}
            >
              Excel
            </Button>

            <Button
              onClick={onExportPDF}
              startIcon={<FileDown size={18} />}
              sx={{
                border: "1px solid #EF4444",
                color: "#DC2626",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  background: "rgba(239,68,68,0.08)",
                },
              }}
            >
              PDF
            </Button>
          </Box>

          <Button
            onClick={onCreate}
            startIcon={<Plus size={18} />}
            sx={{
              background: "#2563EB",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              px: 2,
              borderRadius: 2,
              "&:hover": {
                background: "#1D4ED8",
              },
            }}
          >
            Novo produto
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
