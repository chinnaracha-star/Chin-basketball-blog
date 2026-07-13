import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.jsx";

// --- Entry point: นำ React application ไปแสดงผลใน element ที่มี id="root" ---
createRoot(document.getElementById("root")).render(
  // StrictMode ช่วยตรวจจับรูปแบบการเขียน React ที่อาจก่อให้เกิดปัญหาระหว่างพัฒนา
  <StrictMode>
    {/* BrowserRouter ทำให้ทุก component สามารถใช้งาน routing ได้ */}
    <BrowserRouter>
      <App />
      {/* Toaster ใช้แสดงข้อความแจ้งเตือน เช่น คัดลอกลิงก์หรือเข้าสู่ระบบสำเร็จ */}
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  </StrictMode>,
);
