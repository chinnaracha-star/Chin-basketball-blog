import { blogPosts } from "../data/blogPosts";
import BlogCard from "./BlogCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const categories = ["Highlight", "NBA", "Inspiration", "General"];

function ArticleSection() {
  return (
    <section className="article-section">
      <div className="article-panel">
        <h2 className="article-title">Latest articles</h2>

        <div className="article-controls">
          <div className="article-tabs" aria-label="Article categories">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`article-tab ${index === 0 ? "article-tab-active" : ""}`}
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
            <span aria-hidden="true">Search</span>
          </label>

          <div className="article-category">
            <p>Category</p>
            <Select defaultValue="Highlight">
              <SelectTrigger className="article-category-trigger">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent className="article-category-content">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="article-category-item"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;
