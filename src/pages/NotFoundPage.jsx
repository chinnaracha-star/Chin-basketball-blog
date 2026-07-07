import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer, NavBar } from "../components";

function NotFoundPage() {
  return (
    <main className="site-layout">
      <NavBar />
      <section className="not-found">
        <CircleAlert aria-hidden="true" />
        <h1>Page Not Found</h1>
        <Link to="/">Go To Homepage</Link>
      </section>
      <Footer />
    </main>
  );
}

export default NotFoundPage;
