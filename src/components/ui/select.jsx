import { Check, ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

// --- Radix Primitives: Root ควบคุม Select และ Value แสดงค่าที่เลือก ---
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

// --- Select Trigger: ปุ่มสำหรับเปิดรายการตัวเลือก ---
function SelectTrigger({ className = "", children, ...props }) {
  return (
    <SelectPrimitive.Trigger className={className} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="select-chevron" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// --- Select Content: เมนูตัวเลือกที่ render ผ่าน Portal ---
function SelectContent({ className = "", children, ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={className}
        position="popper"
        sideOffset={4}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

// --- Select Item: ตัวเลือกหนึ่งรายการและไอคอนเมื่อถูกเลือก ---
function SelectItem({ className = "", children, ...props }) {
  return (
    <SelectPrimitive.Item className={className} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="select-item-indicator">
        <Check aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

// ส่งออก component ย่อยเพื่อนำไปประกอบ Select ในหน้าอื่น
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
