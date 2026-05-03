import { useState, useMemo } from "react";
import type { GridColDef } from "@mui/x-data-grid";
import TableBase from "../table/TableBase";
import ConfirmDialog from "./ConfirmDialog";
import { TableActions } from "../table/TableActions";

type Product = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  active: boolean;
  createdAt: string;
};

type Props = {
  products: Product[];
  loading: boolean;
  paginationModel: { page: number; pageSize: number };
  rowCount: number;
  onPaginationChange: (model: any) => void;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
};

export default function ProductTable({
  products,
  loading,
  paginationModel,
  rowCount,
  onPaginationChange,
  onEdit,
  onDelete,
}: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Produto",
        flex: 1,
        minWidth: 160,
      },
      {
        field: "sku",
        headerName: "SKU",
        flex: 1,
        minWidth: 140,
        renderCell: (params) => (
          <span className="font-bold">{params.value}</span>
        ),
      },
      {
        field: "stock",
        headerName: "Estoque",
        flex: 0.6,
        minWidth: 110,
        renderCell: (params) => {
          const value = params.value;

          const isZero = value === 0;
          const isLow = value > 0 && value < 10;

          const variant = isZero
            ? "bg-red-500/10 text-red-600 border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
            : isLow
            ? "bg-yellow-400/15 text-yellow-600 border border-yellow-400/40 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            : "bg-green-500/10 text-green-600 border border-green-500/40 shadow-[0_0_10px_rgba(34,197,94,0.5)]";

          return (
            <div
              className={`
              w-[70px] h-[28px]
              flex items-center justify-center
              rounded-full text-xs font-semibold
              ${variant}
            `}
            >
              {value}
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
          params.value ? new Date(params.value).toLocaleString("pt-BR") : "-",
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
    ],
    [onEdit]
  );
  return (
    <>
      <TableBase
        rows={products}
        columns={columns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationChange={onPaginationChange}
        rowCount={rowCount}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Excluir produto"
        description="Essa ação não pode ser desfeita. Deseja continuar?"
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          if (deleteId) {
            await onDelete(deleteId); // 🔥 importante
            setDeleteId(null);
          }
        }}
      />
    </>
  );
}
