import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { theme } from "../../styles/theme";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{ background: theme.colors.background }}
      className="min-h-screen"
    >
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="md:ml-64 flex flex-col min-h-screen">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="p-6 pt-20 text-gray-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}