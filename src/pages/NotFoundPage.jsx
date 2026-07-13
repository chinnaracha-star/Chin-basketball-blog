import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer, NavBar } from "../components";

function NotFoundPage() {
  return (
    <main className="site-layout">
      <NavBar />
      {/* --- 404 State: แสดงเมื่อ URL หรือบทความที่ร้องขอไม่มีอยู่ --- */}
      <section className="not-found">
        <CircleAlert aria-hidden="true" />
        <h1>Page Not Found</h1>
        {/* Link ช่วยกลับหน้า Home โดยไม่ refresh ทั้งเว็บไซต์ */}
        <Link to="/">Go To Homepage</Link>
      </section>
      <Footer />
    </main>
  );
}

export default NotFoundPage;
