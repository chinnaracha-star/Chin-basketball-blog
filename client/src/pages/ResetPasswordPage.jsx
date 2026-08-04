import { CheckCircle2, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MemberLayout } from "../components";
import { changePassword, getApiError } from "../services/authApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogCloseIcon,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ResetPasswordPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "", form: "" }));
    setIsChanged(false);
  }

  function validate() {
    const nextErrors = {};
    if (!values.currentPassword) {
      nextErrors.currentPassword = "Please enter your current password.";
    }
    if (values.newPassword.length < 8) {
      nextErrors.newPassword = "New password must be at least 8 characters.";
    }
    if (values.confirmPassword !== values.newPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setIsConfirmOpen(true);
  }

  async function handleConfirmChange(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await changePassword(values.currentPassword, values.newPassword);
      setValues(initialValues);
      setIsChanged(true);
      setIsConfirmOpen(false);
      toast.success("Password changed successfully");
    } catch (error) {
      setErrors({
        form: getApiError(error, "Could not change your password."),
      });
      setIsConfirmOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MemberLayout title="Reset password">
      <form className="member-card reset-form" onSubmit={handleSubmit}>
        <div className="member-form-intro">
          <span className="member-icon-badge">
            <KeyRound aria-hidden="true" />
          </span>
          <div>
            <h2>Change your password</h2>
            <p>
              Enter your current password before choosing a new password.
            </p>
          </div>
        </div>

        <label className="member-field">
          Current password
          <input
            name="currentPassword"
            type="password"
            value={values.currentPassword}
            onChange={handleChange}
            aria-invalid={Boolean(errors.currentPassword)}
          />
          {errors.currentPassword && <small>{errors.currentPassword}</small>}
        </label>
        <label className="member-field">
          New password
          <input
            name="newPassword"
            type="password"
            value={values.newPassword}
            onChange={handleChange}
            aria-invalid={Boolean(errors.newPassword)}
          />
          {errors.newPassword && <small>{errors.newPassword}</small>}
        </label>
        <label className="member-field">
          Confirm new password
          <input
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            aria-invalid={Boolean(errors.confirmPassword)}
          />
          {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
        </label>

        {isChanged && (
          <p className="member-success" role="status">
            <CheckCircle2 aria-hidden="true" />
            Password changed successfully
          </p>
        )}

        {errors.form && (
          <p className="auth-form-error" role="alert">
            {errors.form}
          </p>
        )}

        <div className="member-form-actions">
          <button type="submit" className="member-primary-button">
            Change password
          </button>
        </div>
      </form>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogCloseIcon />
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm password change?</AlertDialogTitle>
            <AlertDialogDescription>
              Your new password will be saved to your Supabase account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="member-dialog-actions">
            <AlertDialogCancel className="member-secondary-button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="member-primary-button"
              onClick={handleConfirmChange}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Reset"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </MemberLayout>
  );
}

export default ResetPasswordPage;
