import { useContext } from "react";
import { AdminArticlesContext } from "../context/AdminArticlesContext";

export function useAdminArticles() {
  const context = useContext(AdminArticlesContext);

  if (!context) {
    throw new Error("useAdminArticles must be used inside AdminArticlesProvider");
  }

  return context;
}
