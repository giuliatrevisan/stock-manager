import { logout } from "../../utils/auth/auth";

import logo from "../../assets/logo-dark.png";

type Props = {
  setSidebarOpen: (v: boolean) => void;
};

export default function Navbar({ setSidebarOpen }: Props) {
  return (
    <header
      className="
        fixed top-0 left-0
        h-14
        w-full   
        md:ml-64            
        md:w-[calc(100%-256px)] 

        z-[1000]
        flex items-center justify-between px-4

        bg-white
        border-b border-slate-200
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-2xl text-slate-700"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="flex items-center gap-2">
          <img src={logo} alt="Radar Saúde" className="h-7 w-auto" />
        </div>
      </div>

      {/* RIGHT */}
      <button
        onClick={() => logout("Sessão encerrada")}
        className="
          text-sm font-medium
          text-slate-600
          hover:text-red-500
          transition
        "
      >
        Sair
      </button>
    </header>
  );
}