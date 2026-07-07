import axios from "axios";
import { Copy, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import facebookIcon from "../assets/icons/facebook.svg";
import lineIcon from "../assets/icons/line.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import { Footer, NavBar } from "../components";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCloseIcon,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import NotFoundPage from "./NotFoundPage";

const API_URL = "https://blog-post-project-api.vercel.app/posts";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPost() {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(`${API_URL}/${postId}`, {
          signal: controller.signal,
        });
        setPost(response.data);
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          setError(
            requestError.response?.status === 404 ? "not-found" : "request",
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchPost();
    return () => controller.abort();
  }, [postId]);

  if (error === "not-found") return <NotFoundPage />;

  return (
    <main className="site-layout">
      <NavBar />

      <div className="post-page">
        {isLoading && <p className="post-status">Loading article...</p>}

        {error === "request" && (
          <p className="post-status article-error" role="alert">
            Unable to load this article. Please try again.
          </p>
        )}

        {post && (
          <article>
            <header className="post-header">
              <span className="post-category">{post.category}</span>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <div className="post-byline">
                <span className="post-avatar" aria-hidden="true">
                  {post.author.charAt(0)}
                </span>
                <span>{post.author}</span>
                <span aria-hidden="true">|</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </header>

            <img className="post-cover" src={post.image} alt={post.title} />

            <div className="post-content-layout">
              <div className="markdown">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              <aside className="post-author-card">
                <div className="post-avatar post-avatar-large" aria-hidden="true">
                  {post.author.charAt(0)}
                </div>
                <h2>{post.author}</h2>
                <p>
                  A curious writer sharing practical ideas, thoughtful stories,
                  and inspiration for everyday life.
                </p>
              </aside>
            </div>

            <section className="post-interactions">
              <div className="post-action-bar">
                <button
                  type="button"
                  className="post-like-button"
                  onClick={() => setShowLoginDialog(true)}
                >
                  <Heart aria-hidden="true" /> {post.likes}
                </button>

                <div className="post-share-actions" aria-label="Share article">
                  <button type="button" aria-label="Copy article link">
                    <Copy aria-hidden="true" /> <span>Copy</span>
                  </button>
                  <a href="#" aria-label="Share on Facebook">
                    <img src={facebookIcon} alt="" />
                  </a>
                  <a href="#" aria-label="Share on LinkedIn">
                    <img src={linkedinIcon} alt="" />
                  </a>
                  <a href="#" aria-label="Share on Line">
                    <img src={lineIcon} alt="" />
                  </a>
                </div>
              </div>

              <div className="post-comment">
                <h2>Comment</h2>
                <textarea
                  placeholder="What are your thoughts?"
                  aria-label="Comment"
                  readOnly
                  onClick={() => setShowLoginDialog(true)}
                />
                <button
                  type="button"
                  onClick={() => setShowLoginDialog(true)}
                >
                  Send
                </button>
              </div>
            </section>
          </article>
        )}
      </div>

      <Footer />

      <AlertDialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <AlertDialogContent>
          <AlertDialogCloseIcon />
          <AlertDialogHeader>
            <AlertDialogTitle>Create an account to continue</AlertDialogTitle>
            <AlertDialogDescription>
              Please create an account or log in before liking and commenting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction className="alert-dialog-primary">
            Create account
          </AlertDialogAction>
          <p className="alert-dialog-login">
            Already have an account? <a href="#">Log in</a>
          </p>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

export default PostPage;
