import { ChevronDown, Search } from "lucide-react";

const categories = ["Highlight", "NBA", "Inspiration", "General"];

function ArticleSection() {
  return (
    <section className="article-section">
      <div className="article-panel">
        <h2 className="article-title">Latest articles</h2>

        <div className="article-controls">
          <div className="article-tabs" aria-label="Article categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`article-tab ${
                  category === "Highlight" ? "article-tab-active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="article-search">
            <input
              type="text"
              placeholder="Search"
              aria-label="Search articles"
            />
            <Search size={18} strokeWidth={1.7} />
          </label>

          <div className="article-category">
            <p>Category</p>
            <button type="button">
              Highlight
              <ChevronDown size={24} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;
