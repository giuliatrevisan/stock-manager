import { IconButton, Tooltip } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export function TableActions({ onEdit, onDelete }: Props) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {onEdit && (
        <Tooltip title="Editar">
          <IconButton
            size="small"
            sx={{
              color: "#6366F1",
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.25)",
              "&:hover": {
                background: "rgba(99,102,241,0.15)",
                boxShadow: "0 0 12px rgba(99,102,241,0.35)",
              },
            }}
            onClick={onEdit}
          >
            <Pencil size={16} />
          </IconButton>
        </Tooltip>
      )}

      {onDelete && (
        <Tooltip title="Excluir">
          <IconButton
            size="small"
            sx={{
              color: "#EF4444",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              "&:hover": {
                background: "rgba(239,68,68,0.15)",
                boxShadow: "0 0 12px rgba(239,68,68,0.35)",
              },
            }}
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}