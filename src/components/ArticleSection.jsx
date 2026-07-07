import { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const filteredPosts =
    selectedCategory === "Highlight"
      ? blogPosts
      : blogPosts.filter((post) => post.topic === selectedCategory);

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
                className={`article-tab ${selectedCategory === category ? "article-tab-active" : ""}`}
                aria-pressed={selectedCategory === category}
                disabled={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
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
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
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

        <div
          className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
          aria-live="polite"
        >
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}

          {filteredPosts.length === 0 && (
            <p className="article-empty">No articles in this category yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;
