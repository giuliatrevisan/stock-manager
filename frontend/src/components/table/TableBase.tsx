import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { dataGridStyles } from "../../styles/dataGridStyles";

type Props = {
  rows: any[];
  columns: any[];
  loading: boolean;

  paginationModel?: { page: number; pageSize: number };
  onPaginationChange?: (model: any) => void;
  rowCount?: number;
};

export default function TableBase({
  rows,
  columns,
  loading,
  paginationModel,
  onPaginationChange,
  rowCount,
}: Props) {
  return (
    <Box sx={dataGridStyles}>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        disableRowSelectionOnClick
        rowHeight={52}

        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}

        pageSizeOptions={[5, 10, 20, 50]}

        paginationMode={rowCount !== undefined ? "server" : "client"}
        rowCount={rowCount}

        pagination
      />

    </Box>
  );
}