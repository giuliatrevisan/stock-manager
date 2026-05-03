import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/api/userService";

import UsersHeader from "./components/UsersHeader";
import UsersTable from "./components/UsersTable";
import UserModal from "./components/UserModal";
import { Toast } from "../../components/feedback/Toast";

import { getUserFromToken } from "../../utils/auth/getUserFromToken";

export type User = {
  id: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
};

type UserForm = {
  email: string;
  password: string;
  role: "admin" | "user";
};

export default function UsersPage() {
  const user = getUserFromToken();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("all");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });

  // =========================
  // PAGINAÇÃO
  // =========================
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [rowCount, setRowCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [form, setForm] = useState<UserForm>({
    email: "",
    password: "",
    role: "user",
  });

  // =========================
  // FETCH USERS (SERVER SIDE)
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsers(
        paginationModel.page + 1,
        paginationModel.pageSize,
        role === "all" ? undefined : role
      );

      setUsers(res.data.items);
      setRowCount(res.data.total);
    } catch (err) {
      console.error("Erro ao buscar usuários", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REFRESH (role + pagination)
  // =========================
  useEffect(() => {
    fetchUsers();
  }, [role, paginationModel]);

  // =========================
  // CREATE
  // =========================
  const handleCreate = () => {
    setSelectedUser(null);

    setForm({
      email: "",
      password: "",
      role: "user",
    });

    setOpen(true);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (user: User) => {
    setSelectedUser(user);

    setForm({
      email: user.email,
      password: "",
      role: user.role,
    });

    setOpen(true);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  // =========================
  // SUBMIT (CREATE + EDIT)
  // =========================
  const handleSubmit = async () => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, {
          email: form.email,
          role: form.role,
        });

        setToast({
          open: true,
          message: "Usuário atualizado com sucesso!",
          type: "success",
        });
      } else {
        await createUser(form);

        setToast({
          open: true,
          message: "Usuário criado com sucesso!",
          type: "success",
        });
      }

      setOpen(false);
      await fetchUsers();
    } catch (err) {
      console.error("Erro ao salvar usuário", err);

      setToast({
        open: true,
        message: "Erro ao salvar usuário",
        type: "error",
      });

      throw err; // 🔥 importante se quiser integrar com modal depois
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <UsersHeader
        role={role}
        setRole={setRole}
        onCreate={handleCreate}
        isAdmin={user?.role === "admin"}
      />

      <UsersTable
        users={users}
        loading={loading}
        paginationModel={paginationModel}
        rowCount={rowCount}
        onPaginationChange={setPaginationModel}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        isEdit={!!selectedUser}
      />
      <Toast
        toast={toast}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Box>
  );
}
