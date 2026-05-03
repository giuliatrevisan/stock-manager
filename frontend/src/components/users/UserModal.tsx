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
import { useEffect, useState } from "react";
import {
  titleStyle,
  subtitleStyle,
  inputStyle,
  switchStyle,
  cancelStyle,
  saveStyle,
} from "../../styles/formStyles";
import { formatPhone } from "../../utils/format/formatPhone";

type UserForm = {
  email: string;
  password: string;
  role: "admin" | "user";

  name?: string;
  phone?: string;
  position?: string;
  department?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserForm) => void;
  form: UserForm;
  setForm: (v: UserForm) => void;
  isEdit?: boolean;
};

type UserFormErrors = {
  email?: string;
  password?: string;
};

export default function CreateUserModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  isEdit = false,
}: Props) {
  const [errors, setErrors] = useState<UserFormErrors>({});

  useEffect(() => {
    if (!open) setErrors({});
  }, [open]);

  const validate = () => {
    const newErrors: UserFormErrors = {};

    if (!form.email?.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Email inválido";
    }

    if (!isEdit) {
      if (!form.password?.trim()) {
        newErrors.password = "Senha é obrigatória";
      } else if (form.password.length < 6) {
        newErrors.password = "Senha deve ter no mínimo 6 caracteres";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  const updateField = (field: keyof UserForm, value: string) => {
    setForm({ ...form, [field]: value });
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
          {isEdit ? "Editar Usuário" : "Novo Usuário"}
        </Typography>

        <Typography sx={subtitleStyle}>
          {isEdit
            ? "Atualize os dados do usuário"
            : "Crie um usuário e defina o nível de acesso"}
        </Typography>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent sx={{ pt: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mt: 1,
          }}
        >
          {/* EMAIL */}
          <TextField
            fullWidth
            label="Email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ ...inputStyle, gridColumn: "1 / -1" }}
          />

          {/* PASSWORD */}
          {!isEdit && (
            <TextField
              fullWidth
              type="password"
              label="Senha"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ ...inputStyle, gridColumn: "1 / -1" }}
            />
          )}

          {/* NOME */}
          <TextField
            fullWidth
            label="Nome"
            value={form.name ?? ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            sx={inputStyle}
          />

          {/* TELEFONE */}
          <TextField
            fullWidth
            label="Telefone"
            value={form.phone ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                phone: formatPhone(e.target.value),
              })
            }
            sx={inputStyle}
          />

          {/* CARGO */}
          <TextField
            fullWidth
            label="Cargo"
            value={form.position ?? ""}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            sx={inputStyle}
          />

          {/* SETOR */}
          <TextField
            fullWidth
            label="Setor"
            value={form.department ?? ""}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            sx={inputStyle}
          />

          {/* ROLE SWITCH (ocupa linha inteira) */}
          <Box
            sx={{
              gridColumn: "1 / -1",
              mt: 1,
              px: 1.5,
              py: 1.5,
              borderRadius: 2,
              background: form.role === "admin" ? "#EFF6FF" : "#F1F5F9",
              border:
                form.role === "admin"
                  ? "1px solid #BFDBFE"
                  : "1px solid #CBD5E1",

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
                  color: form.role === "admin" ? "#1D4ED8" : "#64748B",
                }}
              >
                {form.role === "admin" ? "Admin" : "User"}
              </Typography>

              <Typography sx={{ fontSize: "12px", color: "#64748B" }}>
                {form.role === "admin"
                  ? "Acesso total ao sistema"
                  : "Acesso limitado"}
              </Typography>
            </Box>

            <Switch
              checked={form.role === "admin"}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.checked ? "admin" : "user",
                })
              }
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

        <Button onClick={handleSubmit} variant="contained" sx={saveStyle}>
          {isEdit ? "Salvar alterações" : "Criar usuário"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
