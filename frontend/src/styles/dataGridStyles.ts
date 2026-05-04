export const dataGridStyles = {
    borderRadius: 3,
    overflow: "hidden",
    border: "1px solid #E2E8F0",
    background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
  
    "& .MuiDataGrid-root": {
      border: "none",
    },
  
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#F1F5F9",
      borderBottom: "1px solid #E2E8F0",
    },
  
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 700,
      fontSize: "0.85rem",
      color: "#334155",
    },
  
    "& .MuiDataGrid-columnHeader": {
      paddingY: "10px",
    },
  
    "& .MuiDataGrid-virtualScroller": {
      overflow: "auto",
      maxHeight: "400px",
    },
  
    "& .MuiDataGrid-cell": {
      display: "flex",
      alignItems: "center",
    },
  
    "& .MuiDataGrid-row:nth-of-type(odd)": {
      backgroundColor: "#FFFFFF",
    },
  
    "& .MuiDataGrid-row:nth-of-type(even)": {
      backgroundColor: "#F8FAFC",
    },
  
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#EEF2FF",
    },
  };