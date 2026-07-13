import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { MemberLayout } from "../components";
import { mockManagedArticles } from "../data/memberMock";

function AdminPanelPage() {
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
          <input type="search" placeholder="Search..." />
        </label>
        <select aria-label="Filter status">
          <option>Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <select aria-label="Filter category">
          <option>Category</option>
          <option>Cat</option>
          <option>General</option>
          <option>Inspiration</option>
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
            {mockManagedArticles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.category}</td>
                <td>
                  <span className="admin-status">• {article.status}</span>
                </td>
                <td>
                  <button type="button" aria-label={`Edit ${article.title}`}>
                    <Edit3 aria-hidden="true" />
                  </button>
                  <button type="button" aria-label={`Delete ${article.title}`}>
                    <Trash2 aria-hidden="true" />
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

export default AdminPanelPage;
