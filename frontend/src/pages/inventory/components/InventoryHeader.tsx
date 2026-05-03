import { Box, Button, Typography, TextField } from "@mui/material";
import { theme } from "../../../styles/theme";

import { FileSpreadsheet, FileDown, Plus } from "lucide-react";

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
      {/* TITLE */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.colors.text.primary,
          }}
        >
          Controle de Estoque
        </Typography>

        <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
          Gerencie produtos e exporte relatórios em tempo real.
        </Typography>

        {/* FILTERS */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
              slotProps={{
                select: {
                  native: true,
                },
              }}
            >
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
              <option value="all">Todos</option>
            </TextField>
          )}
        </Box>
      </Box>
      {/* ACTIONS */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT ACTIONS */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* EXCEL */}
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
                boxShadow: "0 0 12px rgba(34,197,94,0.25)",
              },
            }}
          >
            Excel
          </Button>

          {/* PDF */}
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
                boxShadow: "0 0 12px rgba(239,68,68,0.25)",
              },
            }}
          >
            PDF
          </Button>
        </Box>

        {/* CREATE BUTTON (neon controlado) */}
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

            boxShadow: "0 0 10px rgba(37,99,235,0.25)",

            "&:hover": {
              background: "#1D4ED8",
              boxShadow: "0 0 18px rgba(37,99,235,0.45)",
              transform: "translateY(-1px)",
            },

            transition: "all 0.2s ease",
          }}
        >
          Novo produto
        </Button>
      </Box>
    </Box>
  );
}
