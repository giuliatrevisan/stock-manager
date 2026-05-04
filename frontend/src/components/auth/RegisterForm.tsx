import { useState } from "react";
import { Input } from "../ui/Input";
import { useAuth } from "../../hooks/useAuth";
import { formatPhone } from "../../utils/format/formatPhone";
import { isValidEmail } from "../../utils/format/formatEmail";

type Props = {
  onSwitch: () => void;
};

export function RegisterForm({ onSwitch }: Props) {
  const { register, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<any>({});
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: any = {};

    if (!name.trim()) newErrors.name = "Nome é obrigatório";

    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email inválido";
    }

    if (!phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone inválido";
    }

    if (!department.trim()) {
      newErrors.department = "Departamento é obrigatório";
    }

    if (!position.trim()) {
      newErrors.position = "Cargo é obrigatório";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register({
        email,
        password,
        name,
        phone,
        department,
        position,
      });
      onSwitch();
    } catch (err: any) {
      console.log("ERRO BACKEND:", err?.response?.data);

      const code = err?.response?.data?.message;

      if (code === "EMAIL_ALREADY_EXISTS") {
        setErrors((prev: any) => ({
          ...prev,
          email: "Esse e-mail já está cadastrado",
        }));
        return;
      }

      setErrors((prev: any) => ({
        ...prev,
        email: "Erro ao cadastrar. Tente novamente.",
      }));
    }
  }

  function clearError(field: string) {
    setErrors((prev: any) => ({ ...prev, [field]: undefined }));
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4 w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-center">Criar conta</h2>

      <Input
        label="Nome"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          clearError("name");
        }}
        error={errors.name}
      />

      <Input
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          clearError("email");
        }}
        error={errors.email}
      />

      <Input
        label="Telefone"
        value={phone}
        onChange={(e) => {
          const formatted = formatPhone(e.target.value);
          setPhone(formatted);
          clearError("phone");
        }}
        error={errors.phone}
        placeholder="(11) 99999-9999"
      />

      <Input
        label="Departamento"
        value={department}
        onChange={(e) => {
          setDepartment(e.target.value);
          clearError("department");
        }}
        error={errors.department}
      />

      <Input
        label="Cargo"
        value={position}
        onChange={(e) => {
          setPosition(e.target.value);
          clearError("position");
        }}
        error={errors.position}
      />
      <Input
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          clearError("password");
        }}
        error={errors.password}
      />

      <Input
        label="Confirmar senha"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          clearError("confirmPassword");
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
