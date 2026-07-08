import { Route, Routes } from "react-router-dom";
import { Footer, HeroSection, NavBar } from "./components";
import ArticleSection from "./components/ArticleSection";
import NotFoundPage from "./pages/NotFoundPage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
