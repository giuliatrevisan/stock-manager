import { Link, useLocation } from "react-router-dom";
import { getUserFromToken } from "../../utils/auth/getUserFromToken";

import {
  Package,
  Users,
  BarChart3,
  MessageCircle,
  Settings,
} from "lucide-react";

type Props = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: Props) {
  const location = useLocation();
  const user = getUserFromToken();

  const menu = [
    { label: "Estoque", icon: Package, path: "/estoque" },
    user?.role === "admin" && {
      label: "Usuários",
      icon: Users,
      path: "/users",
    },
    { label: "Gráficos", icon: BarChart3, path: "/graficos" },
    { label: "FAQ's", icon: MessageCircle, path: "/faqs" },
    { label: "Perfil", icon: Settings, path: "/perfil" },
  ].filter(Boolean);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 md:hidden z-40"
          style={{ background: "rgba(15,23,42,0.5)" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:fixed z-50
          top-0 left-0 h-screen w-64
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{
          background:
            "linear-gradient(180deg, #0B1B3A 0%, #0F2A5F 100%)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* HEADER */}
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-lg font-semibold text-white">
            Admin Panel
          </h1>

          <p className="text-xs text-blue-200 mt-1">
            Sistema de gerenciamento
          </p>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menu.map((item: any) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="relative flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition"
                style={{
                  background: isActive
                    ? "rgba(59,130,246,0.25)"
                    : "transparent",
                  color: isActive ? "#FFFFFF" : "#BFDBFE",
                  boxShadow: isActive
                    ? "0 0 0 1px rgba(59,130,246,0.4)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background =
                      "rgba(59,130,246,0.12)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded"
                    style={{ background: "#60A5FA" }}
                  />
                )}

                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 text-xs text-blue-200 border-t border-white/10">
          v1.0.0 • Admin System
        </div>
      </aside>
    </>
  );
}