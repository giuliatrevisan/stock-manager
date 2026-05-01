import { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { useAuth } from "../../../hooks/useAuth";

type Props = {
  onSwitch: () => void;
};

export function RegisterForm({ onSwitch }: Props) {
  const { register, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "Email é obrigatório";
    if (!password) newErrors.password = "Senha é obrigatória";

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (email && !isValidEmail) {
      newErrors.email = "Email inválido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(email, password);
      onSwitch();
    } catch (err: any) {
      const code = err?.response?.data?.message;

      if (code === "EMAIL_ALREADY_EXISTS") {
        setErrors({ email: "Email já cadastrado" });
        return;
      }

      setErrors({
        email: "Erro ao cadastrar",
      });
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-6 w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-center">
        Criar conta
      </h2>

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

      <Input
        label="Confirmar senha"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setErrors((prev) => ({
            ...prev,
            confirmPassword: undefined,
          }));
        }}
        error={errors.confirmPassword}
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg 
        hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Já tem conta?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-600 hover:underline font-medium"
        >
          Entrar
        </button>
      </p>
    </form>
  );
}