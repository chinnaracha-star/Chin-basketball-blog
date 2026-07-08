import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { NavBar } from "../components";

function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "", form: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    if (!values.password) nextErrors.password = "Please enter your password.";
    if (Object.keys(nextErrors).length === 0 && (values.email !== "demo@example.com" || values.password !== "password123")) {
      nextErrors.form = "Email or password is incorrect.";
    }
    setErrors(nextErrors);
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
          <h1>Log in</h1>
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input id="login-email" name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
              {errors.email && <small role="alert">{errors.email}</small>}
            </div>
            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <input id="login-password" name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} aria-invalid={Boolean(errors.password)} />
              {errors.password && <small role="alert">{errors.password}</small>}
            </div>
            {errors.form && <p className="auth-form-error" role="alert">{errors.form}</p>}
            <button className="auth-submit" type="submit">Log in</button>
          </form>
          <p className="auth-switch">Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
          <p className="auth-demo">Demo: demo@example.com / password123</p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
