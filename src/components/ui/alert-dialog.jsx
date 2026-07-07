import { X } from "lucide-react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

function AlertDialogContent({ children, className = "", ...props }) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="alert-dialog-overlay" />
      <AlertDialogPrimitive.Content
        className={`alert-dialog-content ${className}`}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
}

function AlertDialogHeader({ children, className = "" }) {
  return <div className={`alert-dialog-header ${className}`}>{children}</div>;
}

const AlertDialogTitle = AlertDialogPrimitive.Title;
const AlertDialogDescription = AlertDialogPrimitive.Description;
const AlertDialogAction = AlertDialogPrimitive.Action;
const AlertDialogCancel = AlertDialogPrimitive.Cancel;

function AlertDialogCloseIcon() {
  return (
    <AlertDialogPrimitive.Cancel
      className="alert-dialog-close"
      aria-label="Close dialog"
    >
      <X aria-hidden="true" />
    </AlertDialogPrimitive.Cancel>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogCloseIcon,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
};
