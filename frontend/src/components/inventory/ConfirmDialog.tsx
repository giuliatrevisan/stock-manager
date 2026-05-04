import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";

import { AlertTriangle } from "lucide-react";
import { Toast } from "../feedback/Toast";
import { theme } from "../../styles/theme";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Excluir item",
  description = "Essa ação não pode ser desfeita. Deseja continuar?",
  onClose,
  onConfirm,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const handleConfirm = async () => {
    try {
      setLoading(true);

      await onConfirm();

      setToast({
        open: true,
        message: "Ação realizada com sucesso!",
        type: "success",
      });

      onClose();
    } catch (err) {
      setToast({
        open: true,
        message: "Erro ao executar ação",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={loading ? undefined : onClose}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              p: 2,
              background: theme.colors.surface,
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            },
          },
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 2,
              py: 1,
            }}
          >
            {/* ICON */}
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <AlertTriangle size={26} color="#EF4444" />
            </Box>

            {/* TITLE */}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                color: theme.colors.text.primary,
              }}
            >
              {title}
            </Typography>

            {/* DESCRIPTION */}
            <Typography
              sx={{
                fontSize: "14px",
                color: theme.colors.text.muted,
              }}
            >
              {description}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={loading}
            sx={{
              color: theme.colors.text.muted,
              textTransform: "none",
            }}
          >
            Cancelar
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={loading}
            variant="contained"
            sx={{
              background: "#EF4444",
              textTransform: "none",
              "&:hover": {
                background: "#dc2626",
              },
            }}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>

      <Toast
        toast={toast}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
}