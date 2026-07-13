import { FolderPlus, Pencil } from "lucide-react";
import { MemberLayout } from "../components";

const categories = [
  { id: 1, name: "Highlight", articles: 6 },
  { id: 2, name: "Cat", articles: 12 },
  { id: 3, name: "Inspiration", articles: 8 },
  { id: 4, name: "General", articles: 10 },
];

function CategoryManagementPage() {
  return (
    <MemberLayout
      title="Category management"
      actions={
        <button type="button" className="member-primary-button">
          <FolderPlus aria-hidden="true" />
          Create category
        </button>
      }
    >
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
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.articles}</td>
                <td>
                  <button type="button" aria-label={`Edit ${category.name}`}>
                    <Pencil aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MemberLayout>
  );
}

export default CategoryManagementPage;
