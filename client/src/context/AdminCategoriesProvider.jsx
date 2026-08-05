import { useEffect, useState } from "react";
import { AdminCategoriesContext } from "./AdminCategoriesContext";

const STORAGE_KEY = "nba-news-admin-categories";
const initialCategories = [
  { id: 1, name: "Highlight" },
  { id: 2, name: "Cat" },
  { id: 3, name: "Inspiration" },
  { id: 4, name: "General" },
];

const defaultCategoryIds = new Map(
  initialCategories.map((category) => [category.name, category.id]),
);

function getInitialCategories() {
  try {
    const savedCategories = window.localStorage.getItem(STORAGE_KEY);
    if (!savedCategories) return initialCategories;

    return JSON.parse(savedCategories).map((category) => ({
      ...category,
      id: defaultCategoryIds.get(category.name) ?? category.id,
    }));
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
