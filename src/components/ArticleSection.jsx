import { blogPosts } from "../data/blogPosts";
import BlogCard from "./BlogCard";

function ArticleSection() {
  return (
    <section className="article-section">
      <div className="article-panel">
        <h2 className="article-title">Latest articles</h2>

        <div className="article-controls">
          <div className="article-tabs" aria-label="Article categories">
            <button type="button" className="article-tab article-tab-active">
              Highlight
            </button>
            <button type="button" className="article-tab">
              NBA
            </button>
            <button type="button" className="article-tab">
              Inspiration
            </button>
            <button type="button" className="article-tab">
              General
            </button>
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
            <details className="article-category-menu">
              <summary>Highlight</summary>
              <a href="#">NBA</a>
              <a href="#">Inspiration</a>
              <a href="#">General</a>
            </details>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          <BlogCard
            image={blogPosts[0].image}
            category={blogPosts[0].category}
            title={blogPosts[0].title}
            description={blogPosts[0].description}
            author={blogPosts[0].author}
            date={blogPosts[0].date}
          />
          <BlogCard
            image={blogPosts[1].image}
            category={blogPosts[1].category}
            title={blogPosts[1].title}
            description={blogPosts[1].description}
            author={blogPosts[1].author}
            date={blogPosts[1].date}
          />
          <BlogCard
            image={blogPosts[2].image}
            category={blogPosts[2].category}
            title={blogPosts[2].title}
            description={blogPosts[2].description}
            author={blogPosts[2].author}
            date={blogPosts[2].date}
          />
          <BlogCard
            image={blogPosts[3].image}
            category={blogPosts[3].category}
            title={blogPosts[3].title}
            description={blogPosts[3].description}
            author={blogPosts[3].author}
            date={blogPosts[3].date}
          />
          <BlogCard
            image={blogPosts[4].image}
            category={blogPosts[4].category}
            title={blogPosts[4].title}
            description={blogPosts[4].description}
            author={blogPosts[4].author}
            date={blogPosts[4].date}
          />
          <BlogCard
            image={blogPosts[5].image}
            category={blogPosts[5].category}
            title={blogPosts[5].title}
            description={blogPosts[5].description}
            author={blogPosts[5].author}
            date={blogPosts[5].date}
          />
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;
