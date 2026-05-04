export const titleStyle = {
    fontSize: "18px",
    fontWeight: 700,
    color: "#0F172A",
  };
  
  export const subtitleStyle = {
    fontSize: "13px",
    color: "#64748B",
    mt: 0.5,
  };
  
  export const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
    },
    "& .MuiOutlinedInput-root:hover fieldset": {
      borderColor: "#2563EB",
    },
    "& .Mui-focused fieldset": {
      borderColor: "#2563EB !important",
      boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
    },
  };
  
  export const switchStyle = {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#2563EB",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#2563EB",
      boxShadow: "0 0 12px rgba(37,99,235,0.6)",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#CBD5F5",
    },
  };
  
  export const cancelStyle = {
    color: "#64748B",
    textTransform: "none",
    fontWeight: 500,
  };
  
  export const saveStyle = {
    background: "#2563EB",
    textTransform: "none",
    fontWeight: 600,
    px: 3,
    borderRadius: 2,
    boxShadow: "0 0 10px rgba(37,99,235,0.25)",
    "&:hover": {
      background: "#1D4ED8",
      boxShadow: "0 0 18px rgba(37,99,235,0.45)",
      transform: "translateY(-1px)",
    },
  };