import { Route, Routes } from "react-router-dom";
import { Footer, HeroSection, NavBar } from "./components";
import ArticleSection from "./components/ArticleSection";
import AdminPanelPage from "./pages/AdminPanelPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import CategoryFormPage from "./pages/CategoryFormPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";

function LandingPage() {
  return (
    <main className="site-layout">
      {/* --- ส่วนประกอบหลักของหน้า Home --- */}
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </main>
  );
}

function App() {
  return (
    // --- Routing: กำหนด component ที่จะแสดงตาม URL ---
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* :postId คือ Dynamic Parameter สำหรับระบุบทความแต่ละรายการ */}
      <Route path="/post/:postId" element={<PostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/member/profile" element={<ProfilePage />} />
      <Route path="/member/reset-password" element={<ResetPasswordPage />} />
      <Route path="/member/notifications" element={<NotificationPage />} />
      <Route path="/admin" element={<AdminPanelPage />} />
      <Route path="/admin/categories" element={<CategoryManagementPage />} />
      <Route path="/admin/categories/create" element={<CategoryFormPage />} />
      <Route path="/admin/categories/:categoryId/edit" element={<CategoryFormPage />} />
      <Route path="/admin/articles/create" element={<CreateArticlePage />} />
      <Route path="/admin/articles/:articleId/edit" element={<CreateArticlePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
