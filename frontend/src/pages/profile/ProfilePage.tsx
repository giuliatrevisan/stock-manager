import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import { getUserById, updateUser } from "../../services/api/userService";
import { getUserFromToken } from "../../utils/auth/getUserFromToken";
import { Input } from "../../components/ui/Input";
import { formatPhone } from "../../utils/format/formatPhone";
import { notify } from "../../components/ui/toast";

type FormState = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  phone: string;
  position: string;
  department: string;
  avatarUrl?: string;
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const userLogged = getUserFromToken();

  const [form, setForm] = useState<FormState>({
    id: userLogged?.userId ?? "",
    name: "",
    email: "",
    role: "user",
    phone: "",
    position: "",
    department: "",
    avatarUrl: "",
  });

  // =========================
  // FETCH USER
  // =========================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(form.id);

        setForm((prev) => ({
          ...prev,
          ...res.data,
          name: res.data.name ?? "",
          email: res.data.email ?? "",
          phone: res.data.phone ?? "",
          position: res.data.position ?? "",
          department: res.data.department ?? "",
        }));
      } catch {
        notify.error("Erro ao carregar usuário");
      }
    };

    if (form.id) fetchUser();
  }, [form.id]);

  // =========================
  // CHANGE INPUT
  // =========================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    if (!form.name.trim()) return notify.error("Nome é obrigatório"), false;
    if (!form.email.trim()) return notify.error("Email é obrigatório"), false;
    if (!form.email.includes("@"))
      return notify.error("Email inválido"), false;

    if (!form.phone.trim())
      return notify.error("Telefone é obrigatório"), false;

    if (!form.position.trim())
      return notify.error("Cargo é obrigatório"), false;

    if (!form.department.trim())
      return notify.error("Setor é obrigatório"), false;

    return true;
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await updateUser(form.id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        position: form.position,
        department: form.department,
      });

      notify.success("Perfil atualizado com sucesso!");
    } catch {
      notify.error("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  const avatar =
    form.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      form.name || "User"
    )}&background=2563eb&color=fff`;

  return (
    <div
      className="min-h-screen p-6"
      style={{ background: theme.colors.background }}
    >
      {/* HEADER */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold border-l-4 pl-3"
          style={{
            color: theme.colors.text.primary,
            borderColor: theme.colors.accent.blue,
          }}
        >
          Meu Perfil
        </h1>

        <p className="text-sm mt-2" style={{ color: theme.colors.text.muted }}>
          Gerencie suas informações pessoais e credenciais de acesso.
        </p>
      </div>

      {/* LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        {/* PROFILE CARD */}
        <div
          className="rounded-xl p-6 border flex flex-col items-center text-center"
          style={{
            background: theme.colors.surface,
            borderColor: theme.colors.border,
          }}
        >
          <img
            src={avatar}
            className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
          />

          <h2
            className="mt-3 font-semibold text-lg"
            style={{ color: theme.colors.text.primary }}
          >
            {form.name || "Usuário"}
          </h2>

          <p className="text-sm" style={{ color: theme.colors.text.muted }}>
            {form.role}
          </p>

          <div
            className="mt-4 text-xs px-3 py-1 rounded-full"
            style={{
              background: "rgba(37,99,235,0.1)",
              color: theme.colors.accent.blue,
            }}
          >
            {form.position || "Sem cargo"}
          </div>
        </div>

        {/* FORM */}
        <div
          className="md:col-span-2 rounded-xl p-6 border space-y-4"
          style={{
            background: theme.colors.surface,
            borderColor: theme.colors.border,
          }}
        >
          <Input
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Telefone"
            name="phone"
            value={form.phone}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                phone: formatPhone(e.target.value),
              }))
            }
          />

          <Input
            label="Cargo"
            name="position"
            value={form.position}
            onChange={handleChange}
          />

          <Input
            label="Setor"
            name="department"
            value={form.department}
            onChange={handleChange}
          />

          {/* BUTTON */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-2 rounded-lg font-medium text-sm transition hover:opacity-90"
            style={{
              background: theme.colors.accent.blue,
              color: "#fff",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}