import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/api/userService";

import UsersHeader from "../../components/users/UsersHeader";
import UsersTable from "../../components/users/UsersTable";
import UserModal from "../../components/users/UserModal";
import { Toast } from "../../components/feedback/Toast";

import { getUserFromToken } from "../../utils/auth/getUserFromToken";

export type User = {
  id: string;
  email: string;
  role: "admin" | "user";

  name?: string;
  phone?: string;
  avatarUrl?: string;
  position?: string;
  department?: string;

  isActive?: boolean;
  createdAt: string;
};

type UserForm = {
  email: string;
  password: string;
  role: "admin" | "user";

  name?: string;
  phone?: string;
  position?: string;
  department?: string;
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
    name: "",
    phone: "",
    position: "",
    department: "",
  });

  // =========================
  // FETCH
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
    } finally {
      setLoading(false);
    }
  };

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
      name: "",
      phone: "",
      position: "",
      department: "",
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
      name: user.name ?? "",
      phone: user.phone ?? "",
      position: user.position ?? "",
      department: user.department ?? "",
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
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, {
          email: form.email,
          role: form.role,
          name: form.name,
          phone: form.phone,
          position: form.position,
          department: form.department,
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
      fetchUsers();
    } catch (err) {
      setToast({
        open: true,
        message: "Erro ao salvar usuário",
        type: "error",
      });
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