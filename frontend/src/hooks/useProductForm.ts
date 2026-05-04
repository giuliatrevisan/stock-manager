import { useState } from "react";

export type ProductForm = {
  name: string;
  sku: string;
  stock: number;
  active: boolean;
};

const initialState: ProductForm = {
  name: "",
  sku: "",
  stock: 0,
  active: true,
};

export function useProductForm() {
  const [form, setForm] = useState<ProductForm>(initialState);

  const resetForm = () => setForm(initialState);

  const fillForm = (data: ProductForm) => {
    setForm(data);
  };

  return {
    form,
    setForm,
    resetForm,
    fillForm,
  };
}