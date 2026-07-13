import {
  Bell,
  ExternalLink,
  FileText,
  Folder,
  KeyRound,
  LogOut,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  { to: "/admin", label: "Article management", icon: FileText },
  { to: "/admin/categories", label: "Category management", icon: Folder },
  { to: "/member/profile", label: "Profile", icon: User },
  { to: "/member/notifications", label: "Notification", icon: Bell },
  { to: "/member/reset-password", label: "Reset password", icon: KeyRound },
];

export function MemberLayout({ title, actions, children }) {
  return (
    <main className="member-shell">
      <aside className="member-sidebar" aria-label="Member management">
        <div className="member-brand">
          <NavLink to="/" aria-label="Go to website home">
            NBA News<span>.</span>
          </NavLink>
          <p>Admin panel</p>
        </div>

        <nav className="member-sidebar-nav">
          {sidebarLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              className={({ isActive }) =>
                `member-sidebar-link ${isActive ? "member-sidebar-link-active" : ""}`
              }
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="member-sidebar-footer">
          <NavLink to="/" className="member-sidebar-link">
            <ExternalLink aria-hidden="true" />
            <span>hh. website</span>
          </NavLink>
          <button type="button" className="member-sidebar-link">
            <LogOut aria-hidden="true" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <section className="member-main">
        <header className="member-topbar">
          <h1>{title}</h1>
          {actions && <div className="member-topbar-actions">{actions}</div>}
        </header>
        <div className="member-content">{children}</div>
      </section>
    </main>
  );
}
