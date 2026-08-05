import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { MemberLayout } from "../components";
import { useAdminCategories } from "../hooks/useAdminCategories";

function CategoryFormPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { categories, createCategory, getCategoryById, updateCategory } =
    useAdminCategories();
  const isEditing = Boolean(categoryId);
  const category = isEditing ? getCategoryById(categoryId) : null;
  const [name, setName] = useState(category?.name || "");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const nextName = name.trim();
    const isDuplicate = categories.some(
      (currentCategory) =>
        currentCategory.name.toLowerCase() === nextName.toLowerCase() &&
        String(currentCategory.id) !== String(categoryId),
    );

    if (!nextName) {
      setError("Please enter a category name.");
      return;
    }

    if (isDuplicate) {
      setError("This category already exists.");
      return;
    }

    if (isEditing) {
      updateCategory(categoryId, nextName);
      toast.success("Category updated successfully");
    } else {
      createCategory(nextName);
      toast.success("Category created successfully");
    }

    navigate("/admin/categories");
  }

  if (isEditing && !category) {
    return (
      <MemberLayout title="Edit category">
        <div className="member-card admin-empty-panel">
          <h2>Category not found</h2>
          <p>The category you want to edit is not available in mock data.</p>
        </div>
      </MemberLayout>
    );
  }

  return (
    <MemberLayout title={isEditing ? "Edit category" : "Create category"}>
      <form className="member-card category-form" onSubmit={handleSubmit}>
        <label className="member-field">
          Category name
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setError("");
            }}
            aria-invalid={Boolean(error)}
            placeholder="Category name"
          />
          {error && <small role="alert">{error}</small>}
        </label>

        <div className="member-form-actions">
          <button
            type="button"
            className="member-secondary-button"
            onClick={() => navigate("/admin/categories")}
          >
            Cancel
          </button>
          <button type="submit" className="member-primary-button">
            {isEditing ? "Save changes" : "Create category"}
          </button>
        </div>
      </form>
    </MemberLayout>
  );
}

export default CategoryFormPage;
