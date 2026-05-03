import { Box, Button, Typography, TextField } from "@mui/material";
import { theme } from "../../../styles/theme";
import { Plus } from "lucide-react";

type Props = {
  role: string;
  setRole: (v: string) => void;
  onCreate: () => void;
  isAdmin: boolean;
};

export default function UsersHeader({
  role,
  setRole,
  onCreate,
  isAdmin,
}: Props) {
  return (
    <Box className="mb-3">
      {/* TITLE */}
      <div className="mb-2">
      <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.colors.text.primary,
          }}
        >
          Gestão de usuários
        </Typography>
        <Typography className="text-slate-500 text-sm mt-1">
          Gerencie usuários e níveis de acesso do sistema.
        </Typography>
      </div>

      {/* FILTER + ACTION */}
      <div className="flex items-center justify-between mt-4">
        {/* FILTER */}
        <TextField
          select
          size="small"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-[180px]"
          slotProps={{
            select: { native: true },
          }}
        >
          <option value="all">Todos</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </TextField>

        {/* ACTION */}
        {isAdmin && (
          <button
            onClick={onCreate}
            className="
            flex items-center gap-2
            bg-blue-600 text-white font-semibold
            px-4 py-2 rounded-lg
            shadow-[0_0_10px_rgba(37,99,235,0.25)]
            transition-all
            hover:bg-blue-700
            hover:shadow-[0_0_18px_rgba(37,99,235,0.45)]
            hover:-translate-y-[1px]
          ">
            <Plus size={18} />
            Novo usuário
          </button>
        )}
      </div>
    </Box>
  );
}
