import axios from "axios";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const samplePost = {
  title: "Mastering Time Management: Techniques for Success",
  image:
    "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg",
  category_id: 3,
  description:
    "Learn effective time management strategies to help you stay organized, reduce stress, and achieve your goals.",
  content:
    "## 1. The Importance of Time Management\n\nTime management is crucial for personal and professional success.",
  status_id: 1,
};

const HealthTestPage = () => {
  const [healthResult, setHealthResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);

  const clearState = () => {
    setHealthResult(null);
    setPostResult(null);
    setError(null);
  };

  const formatError = (err) => ({
    status: err.response?.status,
    data: err.response?.data,
    message: err.message,
  });

  const testHealth = async () => {
    clearState();
    setLoadingAction("health");

    try {
      const res = await axios.get(`${API_BASE_URL}/health`);
      setHealthResult(res.data);
    } catch (err) {
      setError(formatError(err));
    } finally {
      setLoadingAction(null);
    }
  };

  const testCreatePost = async () => {
    clearState();
    setLoadingAction("post");

    try {
      const res = await axios.post(`${API_BASE_URL}/posts`, samplePost);
      setPostResult(res.data);
    } catch (err) {
      setError(formatError(err));
    } finally {
      setLoadingAction(null);
    }
  };

  const loading = loadingAction !== null;

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-12 text-white">
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
        <h1 className="mb-6 text-4xl font-bold">Health Test</h1>

        <div className="mb-6 w-full rounded-xl bg-slate-800 p-6 text-center shadow-lg">
          <p className="mb-4 text-sm text-slate-300">
            API Base URL: {API_BASE_URL || "Not configured"}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={testHealth}
              disabled={loading}
            >
              {loadingAction === "health" ? "Loading..." : "Test /health"}
            </button>

            <button
              className="rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={testCreatePost}
              disabled={loading}
            >
              {loadingAction === "post" ? "Loading..." : "Test POST /posts"}
            </button>
          </div>

          {loading && (
            <div className="mt-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
          )}

          {healthResult && (
            <div className="mt-6 text-left">
              <h3 className="mb-2 text-xl font-semibold">Health Result</h3>
              <pre className="overflow-auto rounded-lg bg-slate-700 p-4 text-sm">
                {JSON.stringify(healthResult, null, 2)}
              </pre>
            </div>
          )}

          {postResult && (
            <div className="mt-6 text-left">
              <h3 className="mb-2 text-xl font-semibold">Post Result</h3>
              <pre className="overflow-auto rounded-lg bg-slate-700 p-4 text-sm">
                {JSON.stringify(postResult, null, 2)}
              </pre>
            </div>
          )}

          {error && (
            <div className="mt-6 text-left">
              <h3 className="mb-2 text-xl font-semibold text-red-400">Error</h3>
              <pre className="overflow-auto rounded-lg bg-slate-700 p-4 text-sm">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

HealthTestPage.displayName = "HealthTestPage";

export default HealthTestPage;
