import { FolderPlus, Pencil, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MemberLayout } from "../components";
import { useAdminArticles } from "../hooks/useAdminArticles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogCloseIcon,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { useAdminCategories } from "../hooks/useAdminCategories";

function CategoryManagementPage() {
  const { articles } = useAdminArticles();
  const { categories, deleteCategory } = useAdminCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const filteredCategories = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return categories
      .map((category) => ({
        ...category,
        articles: articles.filter((article) => article.category === category.name)
          .length,
      }))
      .filter(
        (category) =>
          !keyword || category.name.toLowerCase().includes(keyword),
      );
  }, [articles, categories, searchTerm]);

  function handleConfirmDelete() {
    if (!categoryToDelete) return;

    deleteCategory(categoryToDelete.id);
    setCategoryToDelete(null);
  }

  return (
    <MemberLayout
      title="Category management"
      actions={
        <Link to="/admin/categories/create" className="member-primary-button">
          <FolderPlus aria-hidden="true" />
          Create category
        </Link>
      }
    >
      <div className="admin-toolbar admin-toolbar-single">
        <label className="admin-search">
          <Search aria-hidden="true" />
          <input
            type="search"
            placeholder="Search category..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </div>

      <div className="member-card admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category name</th>
              <th>Articles</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.articles}</td>
                <td>
                  <Link
                    className="admin-table-action"
                    to={`/admin/categories/${category.id}/edit`}
                    aria-label={`Edit ${category.name}`}
                  >
                    <Pencil aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    aria-label={`Delete ${category.name}`}
                    onClick={() => setCategoryToDelete(category)}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan="3" className="admin-empty-state">
                  No categories match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AlertDialog
        open={Boolean(categoryToDelete)}
        onOpenChange={(isOpen) => {
          if (!isOpen) setCategoryToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogCloseIcon />
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove "{categoryToDelete?.name}" from the mock category
              list. Articles already using this category will keep their current
              text until edited.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="member-dialog-actions">
            <AlertDialogCancel className="member-secondary-button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="member-primary-button member-danger-button"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </MemberLayout>
  );
}

export default CategoryManagementPage;
