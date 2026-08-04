import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { MemberLayout } from "../components";
import { useAdminArticles } from "../hooks/useAdminArticles";
import { useAdminCategories } from "../hooks/useAdminCategories";

const emptyArticle = {
  title: "",
  category: "",
  author: "Thompson P.",
  introduction: "",
  content: "",
  thumbnail: "",
};

function getFormValues(article) {
  if (!article) return emptyArticle;

  return {
    title: article.title || "",
    category: article.category || "",
    author: article.author || "Thompson P.",
    introduction: article.introduction || "",
    content: article.content || "",
    thumbnail: article.thumbnail || "",
  };
}

function CreateArticlePage() {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const { createArticle, getArticleById, updateArticle } = useAdminArticles();
  const { categories } = useAdminCategories();
  const isEditing = Boolean(articleId);
  const article = isEditing ? getArticleById(articleId) : null;
  const [values, setValues] = useState(() => getFormValues(article));
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  }

  function handleThumbnailChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setValues((currentValues) => ({
        ...currentValues,
        thumbnail: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }

  function validate() {
    const nextErrors = {};

    if (!values.category) nextErrors.category = "Please select a category.";
    if (!values.title.trim()) nextErrors.title = "Please enter an article title.";
    if (!values.introduction.trim()) {
      nextErrors.introduction = "Please enter an introduction.";
    }
    if (!values.content.trim()) nextErrors.content = "Please enter article content.";

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const status = event.nativeEvent.submitter?.value || "Draft";
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const articleValues = {
      ...values,
      title: values.title.trim(),
      introduction: values.introduction.trim(),
      content: values.content.trim(),
      status,
    };

    if (isEditing) {
      updateArticle(articleId, articleValues);
      toast.success("Article updated successfully");
    } else {
      createArticle(articleValues);
      toast.success(
        status === "Draft"
          ? "Article saved as draft"
          : "Article published successfully",
      );
    }

    navigate("/admin");
  }

  if (isEditing && !article) {
    return (
      <MemberLayout title="Edit article">
        <div className="member-card admin-empty-panel">
          <h2>Article not found</h2>
          <p>The article you want to edit is not available in the mock data.</p>
        </div>
      </MemberLayout>
    );
  }

  return (
    <MemberLayout
      title={isEditing ? "Edit article" : "Create article"}
      actions={
        <>
          <button
            type="submit"
            form="article-form"
            name="status"
            value="Draft"
            className="member-secondary-button"
          >
            Save as draft
          </button>
          <button
            type="submit"
            form="article-form"
            name="status"
            value="Published"
            className="member-primary-button"
          >
            Save and publish
          </button>
        </>
      }
    >
      <form
        id="article-form"
        className="create-article-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="member-field member-field-wide">
          Thumbnail image
          <div className="thumbnail-upload">
            {values.thumbnail ? (
              <img src={values.thumbnail} alt="" />
            ) : (
              <ImagePlus aria-hidden="true" />
            )}
          </div>
          <span className="member-secondary-button thumbnail-button">
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            Upload thumbnail image
          </span>
        </label>
        <label className="member-field">
          Category
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((category) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.category && <small role="alert">{errors.category}</small>}
        </label>
        <label className="member-field">
          Author name
          <input name="author" value={values.author} onChange={handleChange} />
        </label>
        <label className="member-field member-field-wide">
          Title
          <input
            name="title"
            placeholder="Article title"
            value={values.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title && <small role="alert">{errors.title}</small>}
        </label>
        <label className="member-field member-field-wide">
          Introduction (max 120 letters)
          <textarea
            name="introduction"
            placeholder="Introduction"
            maxLength="120"
            value={values.introduction}
            onChange={handleChange}
            aria-invalid={Boolean(errors.introduction)}
          />
          {errors.introduction && (
            <small role="alert">{errors.introduction}</small>
          )}
        </label>
        <label className="member-field member-field-wide">
          Content
          <textarea
            className="article-content-editor"
            name="content"
            placeholder="Content"
            value={values.content}
            onChange={handleChange}
            aria-invalid={Boolean(errors.content)}
          />
          {errors.content && <small role="alert">{errors.content}</small>}
        </label>
      </form>
    </MemberLayout>
  );
}

export default CreateArticlePage;
