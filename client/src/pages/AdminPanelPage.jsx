import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MemberLayout } from "../components";
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
import { useAdminArticles } from "../hooks/useAdminArticles";

const statusOptions = ["All status", "Published", "Draft"];

function AdminPanelPage() {
  const { articles, deleteArticle } = useAdminArticles();
  const { categories } = useAdminCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All status");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [articleToDelete, setArticleToDelete] = useState(null);

  const filteredArticles = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSearch =
        !keyword ||
        article.title.toLowerCase().includes(keyword) ||
        article.category.toLowerCase().includes(keyword);
      const matchesStatus =
        selectedStatus === "All status" || article.status === selectedStatus;
      const matchesCategory =
        selectedCategory === "All categories" ||
        article.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles, searchTerm, selectedCategory, selectedStatus]);

  function handleConfirmDelete() {
    if (!articleToDelete) return;

    deleteArticle(articleToDelete.id);
    setArticleToDelete(null);
  }

  return (
    <MemberLayout
      title="Article management"
      actions={
        <Link to="/admin/articles/create" className="member-primary-button">
          <Plus aria-hidden="true" />
          Create article
        </Link>
      }
    >
      <div className="admin-toolbar">
        <label className="admin-search">
          <Search aria-hidden="true" />
          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
        <select
          aria-label="Filter status"
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <select
          aria-label="Filter category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option>All categories</option>
          {categories.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="member-card admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Article title</th>
              <th>Category</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.category}</td>
                <td>
                  <span
                    className={`admin-status admin-status-${article.status.toLowerCase()}`}
                  >
                    • {article.status}
                  </span>
                </td>
                <td>
                  <Link
                    className="admin-table-action"
                    to={`/admin/articles/${article.id}/edit`}
                    aria-label={`Edit ${article.title}`}
                  >
                    <Edit3 aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    aria-label={`Delete ${article.title}`}
                    onClick={() => setArticleToDelete(article)}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredArticles.length === 0 && (
              <tr>
                <td colSpan="4" className="admin-empty-state">
                  No articles match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AlertDialog
        open={Boolean(articleToDelete)}
        onOpenChange={(isOpen) => {
          if (!isOpen) setArticleToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogCloseIcon />
          <AlertDialogHeader>
            <AlertDialogTitle>Delete article?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove "{articleToDelete?.title}" from the admin list.
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

export default AdminPanelPage;
