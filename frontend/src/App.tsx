import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "8px",
          background: "#111827",
          color: "#fff",
        },
      }}
    />

    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </>
  );
}

export default App;