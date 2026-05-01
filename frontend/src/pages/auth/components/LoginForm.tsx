import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/ui/Input";
import { useAuth } from "../../../hooks/useAuth";

type Props = {
  onSwitch: () => void;
};

export function LoginForm({ onSwitch }: Props) {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "Email é obrigatório";
    if (!password) newErrors.password = "Senha é obrigatória";

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (email && !isValidEmail) {
      newErrors.email = "Email inválido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      const code = err?.response?.data?.message;

      if (code === "INVALID_EMAIL") {
        setErrors({ email: "Verifique seu email" });
        return;
      }

      if (code === "INVALID_PASSWORD") {
        setErrors({ password: "Senha incorreta" });
        return;
      }

      setErrors({
        email: "Erro ao fazer login",
        password: "Erro ao fazer login",
      });
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6 w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-center">Entrar</h2>

      <Input
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
      />

      <Input
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        error={errors.password}
      />

      <div className="text-right">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
        >
          Esqueci minha senha
        </button>
      </div>

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg 
        hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Não tem conta?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-600 hover:underline font-medium"
        >
          Cadastre-se
        </button>
      </p>
    </form>
  );
}