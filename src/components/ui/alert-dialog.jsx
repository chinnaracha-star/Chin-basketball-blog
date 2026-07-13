import { X } from "lucide-react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

// --- Radix Primitives: นำ component พื้นฐานมาตั้งชื่อให้ใช้ได้สะดวกขึ้น ---
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

// --- Dialog Content: สร้าง Overlay และกล่องเนื้อหาที่แสดงทับหน้าเว็บ ---
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

// --- Dialog Header: จัดกลุ่มหัวข้อและคำอธิบายของ dialog ---
function AlertDialogHeader({ children, className = "" }) {
  return <div className={`alert-dialog-header ${className}`}>{children}</div>;
}

const AlertDialogTitle = AlertDialogPrimitive.Title;
const AlertDialogDescription = AlertDialogPrimitive.Description;
const AlertDialogAction = AlertDialogPrimitive.Action;
const AlertDialogCancel = AlertDialogPrimitive.Cancel;

// --- Close Button: ปิด dialog พร้อม aria-label สำหรับ screen reader ---
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

// ส่งออก component ย่อยเพื่อประกอบ dialog ได้ตามหน้าที่ต้องการ
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
