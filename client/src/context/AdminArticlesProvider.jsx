import { useEffect, useState } from "react";
import { AdminArticlesContext } from "./AdminArticlesContext";
import { mockManagedArticles } from "../data/memberMock";

const STORAGE_KEY = "nba-news-admin-articles";

function getInitialArticles() {
  try {
    const savedArticles = window.localStorage.getItem(STORAGE_KEY);
    return savedArticles ? JSON.parse(savedArticles) : mockManagedArticles;
  } catch {
    return mockManagedArticles;
  }
}

export function AdminArticlesProvider({ children }) {
  const [articles, setArticles] = useState(getInitialArticles);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  }, [articles]);

  function createArticle(article) {
    const nextArticle = {
      ...article,
      id: Date.now(),
      updatedAt: new Date().toISOString(),
    };
    setArticles((currentArticles) => [nextArticle, ...currentArticles]);
    return nextArticle;
  }

  function updateArticle(articleId, nextValues) {
    setArticles((currentArticles) =>
      currentArticles.map((article) =>
        String(article.id) === String(articleId)
          ? { ...article, ...nextValues, updatedAt: new Date().toISOString() }
          : article,
      ),
    );
  }

  function deleteArticle(articleId) {
    setArticles((currentArticles) =>
      currentArticles.filter(
        (article) => String(article.id) !== String(articleId),
      ),
    );
  }

  function getArticleById(articleId) {
    return articles.find((article) => String(article.id) === String(articleId));
  }

  return (
    <AdminArticlesContext.Provider
      value={{
        articles,
        createArticle,
        deleteArticle,
        getArticleById,
        updateArticle,
      }}
    >
      {children}
    </AdminArticlesContext.Provider>
  );
}
