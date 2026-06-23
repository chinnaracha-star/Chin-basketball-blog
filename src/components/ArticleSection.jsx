import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const categories = ["Highlight", "NBA", "Inspiration", "General"];

function ArticleSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const selectCategory = (category) => {
    setActiveCategory(category);
    setIsCategoryOpen(false);
  };

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
                  category === activeCategory ? "article-tab-active" : ""
                }`}
                onClick={() => selectCategory(category)}
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
            <button
              type="button"
              className="article-category-trigger"
              aria-expanded={isCategoryOpen}
              aria-controls="mobile-category-menu"
              onClick={() => setIsCategoryOpen((isOpen) => !isOpen)}
            >
              {activeCategory}
              <ChevronDown
                className={isCategoryOpen ? "article-category-icon-open" : ""}
                size={24}
                strokeWidth={1.7}
              />
            </button>

            {isCategoryOpen && (
              <div id="mobile-category-menu" className="article-category-menu">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`article-category-option ${
                      category === activeCategory
                        ? "article-category-option-active"
                        : ""
                    }`}
                    onClick={() => selectCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;
