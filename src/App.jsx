import { Footer, HeroSection, NavBar } from "./components";
import ArticleSection from "./components/ArticleSection";

function App() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#262321]">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </main>
  );
}

export default App;
