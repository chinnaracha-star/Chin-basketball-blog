import { useEffect, useState } from "react";
import { AdminCategoriesContext } from "./AdminCategoriesContext";

const STORAGE_KEY = "nba-news-admin-categories";
const initialCategories = [
  { id: "highlight", name: "Highlight" },
  { id: "cat", name: "Cat" },
  { id: "inspiration", name: "Inspiration" },
  { id: "general", name: "General" },
];

function getInitialCategories() {
  try {
    const savedCategories = window.localStorage.getItem(STORAGE_KEY);
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  } catch {
    return initialCategories;
  }
}

export function AdminCategoriesProvider({ children }) {
  const [categories, setCategories] = useState(getInitialCategories);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  function createCategory(name) {
    const nextCategory = {
      id: `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name,
    };
    setCategories((currentCategories) => [...currentCategories, nextCategory]);
    return nextCategory;
  }

  function updateCategory(categoryId, nextName) {
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        String(category.id) === String(categoryId)
          ? { ...category, name: nextName }
          : category,
      ),
    );
  }

  function deleteCategory(categoryId) {
    setCategories((currentCategories) =>
      currentCategories.filter(
        (category) => String(category.id) !== String(categoryId),
      ),
    );
  }

  function getCategoryById(categoryId) {
    return categories.find(
      (category) => String(category.id) === String(categoryId),
    );
  }

  return (
    <AdminCategoriesContext.Provider
      value={{
        categories,
        createCategory,
        deleteCategory,
        getCategoryById,
        updateCategory,
      }}
    >
      {children}
    </AdminCategoriesContext.Provider>
  );
}
