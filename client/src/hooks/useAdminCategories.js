import { useContext } from "react";
import { AdminCategoriesContext } from "../context/AdminCategoriesContext";

export function useAdminCategories() {
  const context = useContext(AdminCategoriesContext);

  if (!context) {
    throw new Error(
      "useAdminCategories must be used inside AdminCategoriesProvider",
    );
  }

  return context;
}
