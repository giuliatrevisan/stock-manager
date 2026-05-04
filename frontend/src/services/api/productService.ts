import { api } from "../../api/axios"
// LISTAR
export const getProducts = (
  page: number,
  limit: number,
  search?: string,
  status?: string
) => {
  return api.get("/products", {
    params: {
      page,
      limit,
      search,
      status,
    },
  });
};
// CRIAR
export const createProduct = (data: any) =>
  api.post("/products", data)

// EDITAR
export const updateProduct = (id: string, data: any) =>
  api.put(`/products/${id}`, data)

// DELETAR
export const deleteProduct = (id: string) =>
  api.delete(`/products/${id}`)