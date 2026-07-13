import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  // --- useState: เก็บข้อมูลที่เปลี่ยนแปลงและสั่งให้ UI แสดงผลใหม่ ---
  const [selectedCategory, setSelectedCategory] = useState("Highlight"); // หมวดหมู่ที่เลือกอยู่
  const [posts, setPosts] = useState([]); // รายการบทความที่ได้รับจาก API
  const [page, setPage] = useState(1); // หน้าปัจจุบันของ Pagination
  const [hasMore, setHasMore] = useState(true); // ระบุว่ายังมีหน้าถัดไปหรือไม่
  const [isLoading, setIsLoading] = useState(false); // สถานะกำลังโหลดข้อมูล
  const [error, setError] = useState(""); // ข้อความเมื่อเรียก API ไม่สำเร็จ
  const [searchTerm, setSearchTerm] = useState(""); // ข้อความที่ผู้ใช้กำลังพิมพ์
  const [keyword, setKeyword] = useState(""); // Keyword ที่พร้อมส่งไปค้นหากับ API
  const [isSearchFocused, setIsSearchFocused] = useState(false); // ควบคุม dropdown ผลค้นหา

  // --- Debounce Search: รอให้หยุดพิมพ์ 350ms ก่อนนำคำไปค้นหา ---
  useEffect(() => {
    const nextKeyword = searchTerm.trim();

    if (nextKeyword === keyword) return;

    const timeoutId = window.setTimeout(() => {
      setPosts([]);
      setPage(1);
      setHasMore(true);
      setKeyword(nextKeyword);
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm, keyword]);

  // --- Fetch Posts: ดึงบทความเมื่อหน้า หมวดหมู่ หรือ keyword เปลี่ยน ---
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      setIsLoading(true);
      setError("");

      try {
        // ส่ง Query Parameters สำหรับ Pagination, Category และ Search
        const response = await axios.get(API_URL, {
          params: {
            page,
            limit: POSTS_PER_PAGE,
            category:
              selectedCategory === "Highlight" ? undefined : selectedCategory,
            keyword: keyword || undefined,
          },
          signal: controller.signal,
        });

        const { posts: newPosts, currentPage, totalPages } = response.data;

        // หน้าแรกแทนที่ข้อมูลเดิม ส่วนหน้าถัดไปนำข้อมูลมาต่อท้าย
        setPosts((previousPosts) =>
          page === 1 ? newPosts : [...previousPosts, ...newPosts],
        );
        //เช็กว่ายังมีหน้าถัดไปไหม
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

    // ยกเลิก request เก่าเมื่อ component ถูกถอดหรือ dependency เปลี่ยน
    return () => controller.abort();
  }, [page, selectedCategory, keyword]);

  // --- Category Handler: ล้างรายการเดิมและเริ่มโหลดใหม่จากหน้าแรก ---
  function handleCategoryChange(category) {
    if (category === selectedCategory) return;

    setPosts([]);
    setPage(1);
    setHasMore(true);
    setSelectedCategory(category);
  }

  // --- Pagination Handler: เพิ่มเลขหน้าเพื่อโหลดบทความชุดถัดไป ---
  function handleLoadMore() {
    if (!isLoading && hasMore) {
      setPage((currentPage) => currentPage + 1);
    }
  }

  return (
    <section className="article-section">
      <div className="article-panel">
        <h2 className="article-title">Latest articles</h2>

        {/* --- Filter และ Search Controls --- */}
        <div className="article-controls">
          <div className="article-tabs" aria-label="Article categories">
            {/* ปุ่มหมวดหมู่ */}
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`article-tab ${
                  selectedCategory === category ? "article-tab-active" : ""
                }`}
                aria-pressed={selectedCategory === category}
                disabled={selectedCategory === category}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="article-search">
            {/* ช่อง Search */}
            <input
              type="text"
              placeholder="Search"
              aria-label="Search articles"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              role="combobox"
              aria-expanded={isSearchFocused && Boolean(keyword)}
              aria-controls="article-search-results"
              autoComplete="off"
            />
            <span aria-hidden="true">Search</span>

            {/* กล่องผลการค้นหา */}
            {isSearchFocused && keyword && (
              <div
                id="article-search-results"
                className="article-search-results"
                role="listbox"
              >
                {isLoading && <p>Searching...</p>}
                {!isLoading && posts.length === 0 && <p>No articles found.</p>}
                {!isLoading &&
                  posts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.id}`}
                      role="option"
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      {post.title}
                    </Link>
                  ))}
              </div>
            )}
          </div>

          <div className="article-category">
            <p>Category</p>

            {/* Dropdown เลือก Category */}
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

        {/* --- รายการบทความ --- */}
        <div
          className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
          aria-live="polite"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}

          {!isLoading && !error && posts.length === 0 && (
            <p className="article-empty">ไม่มีข้อมูลหรือเนื้อหาที่ค้นหา</p>
          )}
        </div>

        {/* --- Error State --- */}
        {error && (
          <p className="article-status article-error" role="alert">
            {error}
          </p>
        )}

        {/* --- Load More Button --- */}
        {hasMore && !error && (
          <div className="article-view-more">
            <button type="button" onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? "Loading..." : "View more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ArticleSection;
