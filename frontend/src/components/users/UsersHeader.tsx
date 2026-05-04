import { Box, TextField } from "@mui/material";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { PageTitle } from "../ui/PageTitle";

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
      {/* TITLE FIXO */}
      <PageTitle
        title="Gestão de usuários"
        subtitle="Gerencie usuários e níveis de acesso do sistema."
      />

      {/* HEADER*/}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="
          flex flex-col gap-3
          sm:flex-row sm:items-center sm:justify-between
          mt-4
        "
      >
        {/* FILTER */}
        <TextField
          select
          size="small"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full sm:w-[180px]"
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
              flex items-center justify-center gap-2
              bg-blue-600 text-white font-semibold
              px-4 py-2 rounded-lg
              w-full sm:w-auto
              shadow-[0_0_10px_rgba(37,99,235,0.25)]
              transition-all
              hover:bg-blue-700
              hover:shadow-[0_0_18px_rgba(37,99,235,0.45)]
              hover:-translate-y-[1px]
            "
          >
            <Plus size={18} />
            Novo usuário
          </button>
        )}
      </motion.div>
    </Box>
  );
}
