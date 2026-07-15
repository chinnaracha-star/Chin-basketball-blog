import { Route, Routes } from "react-router-dom";
import { Footer, HeroSection, NavBar, ProtectedRoute } from "./components";
import ArticleSection from "./components/ArticleSection";
import AdminPanelPage from "./pages/AdminPanelPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import CategoryFormPage from "./pages/CategoryFormPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotificationPage from "./pages/NotificationPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";

function LandingPage() {
  return (
    <main className="site-layout">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/post/:postId" element={<PostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/member/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/member/reset-password"
        element={
          <ProtectedRoute>
            <ResetPasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/member/notifications"
        element={
          <ProtectedRoute>
            <NotificationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanelPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <CategoryManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories/create"
        element={
          <ProtectedRoute>
            <CategoryFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories/:categoryId/edit"
        element={
          <ProtectedRoute>
            <CategoryFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/articles/create"
        element={
          <ProtectedRoute>
            <CreateArticlePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/articles/:articleId/edit"
        element={
          <ProtectedRoute>
            <CreateArticlePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
