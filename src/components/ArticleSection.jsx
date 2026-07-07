import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const API_URL = "https://blog-post-project-api.vercel.app/posts";
const POSTS_PER_PAGE = 6;
const categories = ["Highlight", "Cat", "Inspiration", "General"];

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(API_URL, {
          params: {
            page,
            limit: POSTS_PER_PAGE,
            category:
              selectedCategory === "Highlight"
                ? undefined
                : selectedCategory,
          },
          signal: controller.signal,
        });

        const { posts: newPosts, currentPage, totalPages } = response.data;

        setPosts((previousPosts) =>
          page === 1 ? newPosts : [...previousPosts, ...newPosts],
        );
        setHasMore(currentPage < totalPages);
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          console.error("Error fetching posts:", requestError);
          setError("Unable to load articles. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => controller.abort();
  }, [page, selectedCategory]);

  function handleCategoryChange(category) {
    if (category === selectedCategory) return;

    setPosts([]);
    setPage(1);
    setHasMore(true);
    setSelectedCategory(category);
  }

  function handleLoadMore() {
    if (!isLoading && hasMore) {
      setPage((currentPage) => currentPage + 1);
    }
  }

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
                onClick={() => handleCategoryChange(category)}
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
              onValueChange={handleCategoryChange}
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
          {posts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}

          {!isLoading && !error && posts.length === 0 && (
            <p className="article-empty">No articles in this category yet.</p>
          )}
        </div>

        {error && (
          <p className="article-status article-error" role="alert">
            {error}
          </p>
        )}

        {hasMore && !error && (
          <div className="article-view-more">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "View more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ArticleSection;
