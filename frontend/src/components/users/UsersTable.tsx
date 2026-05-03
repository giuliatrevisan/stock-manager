import { useState } from "react";
import type { GridColDef } from "@mui/x-data-grid";

import TableBase from "../table/TableBase";
import ConfirmDialog from "../inventory/ConfirmDialog";
import { TableActions } from "../table/TableActions";

type User = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
};

type Props = {
  users: User[];
  loading: boolean;

  paginationModel: { page: number; pageSize: number };
  rowCount: number;
  onPaginationChange: (model: any) => void;

  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

export default function UsersTable({
  users,
  loading,
  paginationModel,
  rowCount,
  onPaginationChange,
  onEdit,
  onDelete,
}: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <span style={{ fontWeight: 600 }}>
          {params.value}
        </span>
      ),
    },
  
    {
      field: "role",
      headerName: "Perfil",
      width: 140,
      renderCell: (params) => {
        const isAdmin = params.value === "admin";
  
        return (
          <div
          className={`
            w-[90px] h-[28px]
            flex items-center justify-center
            rounded-full text-xs font-semibold capitalize
            whitespace-nowrap overflow-hidden
            ${isAdmin
              ? "bg-blue-500/10 text-blue-600 border border-blue-500/30 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
              : "bg-yellow-400/15 text-yellow-600 border border-yellow-400/40 shadow-[0_0_10px_rgba(234,179,8,0.4)]"
            }
          `}
        >
          {params.value}
        </div>
        );
      },
    },
  
    {
      field: "createdAt",
      headerName: "Criado em",
      flex: 1,
      minWidth: 180,
      renderCell: (params) =>
        params.value
          ? new Date(params.value).toLocaleString("pt-BR")
          : "-",
    },
  
    {
      field: "actions",
      headerName: "Ações",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <TableActions
          onEdit={() => onEdit(params.row)}
          onDelete={() => setDeleteId(params.row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <TableBase
        rows={users}
        columns={columns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationChange={onPaginationChange}
        rowCount={rowCount}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Excluir usuário"
        description="Essa ação não pode ser desfeita. Deseja continuar?"
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          if (!deleteId) return;

          await onDelete(deleteId); 
          setDeleteId(null);
        }}
      />
    </>
  );
}
