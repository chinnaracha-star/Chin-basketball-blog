import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { NavBar } from "../components";

function LoginPage() {
  const navigate = useNavigate();

  // --- Form State: เก็บข้อมูลเข้าสู่ระบบและข้อความแจ้งเตือน ---
  const [values, setValues] = useState({ email: "", password: "" }); // ค่าจาก Email และ Password
  const [errors, setErrors] = useState({}); // error รายช่องหรือ error ของทั้งฟอร์ม

  // --- Input Handler: อัปเดตค่าและล้าง error เมื่อผู้ใช้แก้ไขข้อมูล ---
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "", form: "" }));
  }

  // --- Submit Handler: ตรวจรูปแบบข้อมูลและเปรียบเทียบกับ mock account ---
  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email))
      nextErrors.email = "Please enter a valid email address.";
    if (!values.password) nextErrors.password = "Please enter your password.";
    // Mock Account: จำลองการเข้าสู่ระบบโดยไม่เชื่อมต่อ backend
    // ตรวจว่าผู้ใช้กรอก email/password ตรงกับบัญชีจำลองไหม
    if (
      Object.keys(nextErrors).length === 0 &&
      (values.email !== "demo@mail.com" || values.password !== "Chin1234")
    ) {
      nextErrors.form = "Email or password is incorrect.";
    }
    setErrors(nextErrors);
    //ถ้าไม่มี error ให้ Login สำเร็จ
    if (Object.keys(nextErrors).length === 0) {
      toast.success("Logged in successfully");
      navigate("/");
    }
  }

  return (
    <main className="site-layout auth-layout">
      <NavBar />
      <section className="auth-page">
        <div className="auth-card auth-card-login">
          {/* --- Login Form --- */}
          <h1>อยากเข้าก็ใส่ให้ถูก นึกดีๆก่อนพิมพ์</h1>
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <small role="alert">{errors.email}</small>}
            </div>
            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && <small role="alert">{errors.password}</small>}
            </div>
            {errors.form && (
              <p className="auth-form-error" role="alert">
                {errors.form}
              </p>
            )}
            <button className="auth-submit" type="submit">
              Log in
            </button>
          </form>
          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
          {/* --- Demo Account: ข้อมูลสำหรับตรวจสอบ success state --- */}
          <p className="auth-demo">Demo: demo@mail.com / Chin1234</p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
