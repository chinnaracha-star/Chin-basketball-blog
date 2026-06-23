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
      </div>
    </section>
  );
}

export default ArticleSection;
