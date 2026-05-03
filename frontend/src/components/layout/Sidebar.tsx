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
    { label: "Suporte", icon: MessageCircle, path: "/suporte" },
    { label: "Perfil", icon: Settings, path: "/perfil" },
  ].filter(Boolean);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 md:hidden z-40"
          style={{ background: "rgba(15,23,42,0.4)" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        style={{
          background: "#FFFFFF",
          borderRight: "1px solid rgba(15,23,42,0.08)",
        }}
        className={`
          fixed md:fixed z-50
          top-0 left-0 h-screen w-64
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="px-6 py-6 border-b border-[rgba(15,23,42,0.08)]">
          <h1 className="text-lg font-semibold text-slate-900">
            Admin Panel
          </h1>

          <p className="text-xs text-gray-500 mt-1">
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
                  background: isActive ? "#EEF2FF" : "transparent",
                  color: isActive ? "#2563EB" : "#334155",
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 6,
                      bottom: 6,
                      width: "3px",
                      background: "#2563EB",
                      borderRadius: "4px",
                    }}
                  />
                )}

                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 text-xs text-gray-400 border-t border-[rgba(15,23,42,0.08)]">
          v1.0.0 • Admin System
        </div>
      </aside>
    </>
  );
}