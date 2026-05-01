import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../utils/auth/getUserFromToken";
import { notify } from "../../components/ui/toast";

export default function Home() {
  const navigate = useNavigate();
  const user = getUserFromToken();

  function handleLogout() {
    localStorage.removeItem("token");

    // mensagem pra aparecer no login
    sessionStorage.setItem("logout_message", "Você saiu da sessão");

    navigate("/login");
  }

  function handleAdminAction() {
    notify.success("Ação de admin executada 👑");
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      {/* 👋 Saudação */}
      <h1 className="text-3xl font-bold">
        {user?.role === "admin" ? "Olá Admin 👑" : "Olá Usuário 👋"}
      </h1>

      {/* 🔥 botão só admin */}
      {user?.role === "admin" && (
        <button
          onClick={handleAdminAction}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg 
          hover:bg-purple-700 transition"
        >
          Área de Admin
        </button>
      )}

      {/* 🚪 logout */}
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg 
        hover:bg-red-600 transition"
      >
        Sair
      </button>
    </div>
  );
}