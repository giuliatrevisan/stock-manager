import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Switch,
} from "@mui/material";
import { useState } from "react";
import {
  titleStyle,
  subtitleStyle,
  inputStyle,
  switchStyle,
  cancelStyle,
  saveStyle,
} from "../../../styles/formStyles";

type ProductForm = {
  name: string;
  sku: string;
  stock: number;
  active: boolean;
};

type Props = {
  open: boolean;
  selected: boolean;
  form: ProductForm;
  setForm: (v: ProductForm) => void;
  onClose: () => void;
  onSubmit: () => void;
};

type ProductFormErrors = {
  name?: string;
  sku?: string;
  stock?: string;
};

export default function ProductModal({
  open,
  selected,
  form,
  setForm,
  onClose,
  onSubmit,
}: Props) {
  const [errors, setErrors] = useState<ProductFormErrors>({});
  // 🔥 VALIDAÇÃO
  const validate = () => {
    const newErrors: ProductFormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!form.sku.trim()) {
      newErrors.sku = "SKU é obrigatório";
    }

    if (form.stock < 0) {
      newErrors.stock = "Estoque não pode ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 SUBMIT CONTROLADO
  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1.5,
            background: "#FFFFFF",
          },
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle sx={{ pb: 1 }}>
        <Typography sx={titleStyle}>
          {selected ? "Editar Produto" : "Novo Produto"}
        </Typography>

        <Typography sx={subtitleStyle}>
          {selected
            ? "Atualize as informações do produto"
            : "Preencha os dados para criar um novo produto"}
        </Typography>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", mt: 1, flexDirection: "column", gap: 2 }}>
          {/* NAME */}
          <TextField
            fullWidth
            label="Nome do produto"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setErrors({ ...errors, name: undefined });
            }}
            error={!!errors.name}
            helperText={errors.name}
            sx={inputStyle}
          />

          {/* SKU */}
          <TextField
            fullWidth
            label="SKU"
            value={form.sku}
            onChange={(e) => {
              setForm({ ...form, sku: e.target.value });
              setErrors({ ...errors, sku: undefined });
            }}
            error={!!errors.sku}
            helperText={errors.sku}
            sx={inputStyle}
          />

          {/* STOCK */}
          <TextField
            fullWidth
            type="number"
            label="Quantidade em estoque"
            value={form.stock}
            slotProps={{
              input: {
                inputProps: {
                  min: 0,
                  step: 1,
                },
              },
            }}
            onChange={(e) => {
              const value = e.target.value;

              // 🔥 impede valores inválidos
              if (value === "") {
                setForm({ ...form, stock: 0 });
                return;
              }

              const parsed = Number(value);

              if (!Number.isInteger(parsed) || parsed < 0) return;

              setForm({ ...form, stock: parsed });
              setErrors({ ...errors, stock: undefined });
            }}
            error={!!errors.stock}
            helperText={errors.stock}
            sx={inputStyle}
          />
          {/* ACTIVE SWITCH */}
          <Box
            sx={{
              mt: 1,
              px: 1.5,
              py: 1.5,
              borderRadius: 2,

              background: form.active ? "#EFF6FF" : "#F1F5F9",
              border: form.active ? "1px solid #BFDBFE" : "1px solid #CBD5E1",

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              transition: "all 0.25s ease",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: form.active ? "#1D4ED8" : "#64748B",
                }}
              >
                {form.active ? "Produto ativo" : "Produto inativo"}
              </Typography>

              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#64748B",
                }}
              >
                {form.active
                  ? "Produto visível no sistema"
                  : "Produto oculto no sistema"}
              </Typography>
            </Box>

            <Switch
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              sx={switchStyle}
            />
          </Box>
        </Box>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={cancelStyle}>
          Cancelar
        </Button>

        <Button variant="contained" onClick={handleSubmit} sx={saveStyle}>
          Salvar produto
        </Button>
      </DialogActions>
    </Dialog>
  );
}
