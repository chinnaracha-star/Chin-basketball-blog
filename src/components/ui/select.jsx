import { Check, ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

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

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
