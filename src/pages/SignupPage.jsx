import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components";

const EXISTING_EMAILS = ["demo@example.com", "member@example.com"];

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (values.username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters.";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  } else if (EXISTING_EMAILS.includes(values.email.trim().toLowerCase())) {
    errors.email = "This email is already in use.";
  }
  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

function SignupPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setIsSuccess(true);
  }

  return (
    <main className="site-layout auth-layout">
      <NavBar />
      <section className="auth-page">
        <div className="auth-card">
          {isSuccess ? (
            <div className="auth-success" role="status">
              <CheckCircle2 aria-hidden="true" />
              <h1>Registration successful</h1>
              <p>Your account has been created. You can now log in.</p>
              <button type="button" onClick={() => navigate("/login")}>
                Continue
              </button>
            </div>
          ) : (
            <>
              <h1>Sign up</h1>
              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <AuthField label="Name" name="name" placeholder="Full name" value={values.name} error={errors.name} onChange={handleChange} />
                <AuthField label="Username" name="username" placeholder="Username" value={values.username} error={errors.username} onChange={handleChange} />
                <AuthField label="Email" name="email" type="email" placeholder="Email" value={values.email} error={errors.email} onChange={handleChange} />
                <AuthField label="Password" name="password" type="password" placeholder="Password" value={values.password} error={errors.password} onChange={handleChange} />
                <button className="auth-submit" type="submit">Sign up</button>
              </form>
              <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function AuthField({ label, error, ...inputProps }) {
  const errorId = `${inputProps.name}-error`;
  const inputId = `signup-${inputProps.name}`;
  return (
    <div className="auth-field">
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} {...inputProps} onChange={inputProps.onChange} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
      {error && <small id={errorId} role="alert">{error}</small>}
    </div>
  );
}

export default SignupPage;
