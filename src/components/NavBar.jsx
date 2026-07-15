import {
  Bell,
  ChevronDown,
  KeyRound,
  LogOut,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockMember, mockNotifications } from "../data/memberMock";
import { useAuth } from "../hooks/useAuth";

export function NavBar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const unreadCount = mockNotifications.filter(
    (notification) => notification.unread,
  ).length;

  function handleLogout() {
    logout();
    setIsUserMenuOpen(false);
    setIsNotificationOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <header className="border-b border-[#e3ded6] px-5 py-3 sm:px-8 lg:px-16">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-0 py-0">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-[#302c29]"
        >
          NBA News
        </Link>

        <div className="nav-member-actions">
          {isLoggedIn ? (
            <>
              <div className="nav-popover">
                <button
                  type="button"
                  className="nav-icon-button"
                  aria-label="Open notifications"
                  aria-expanded={isNotificationOpen}
                  onClick={() => {
                    setIsNotificationOpen((isOpen) => !isOpen);
                    setIsUserMenuOpen(false);
                  }}
                >
                  <Bell aria-hidden="true" />
                  {unreadCount > 0 && (
                    <span
                      className="nav-badge"
                      aria-label={`${unreadCount} unread`}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="nav-dropdown nav-notification-menu">
                    <div className="nav-dropdown-header">
                      <strong>Notification</strong>
                      <Link to="/member/notifications">View all</Link>
                    </div>
                    {mockNotifications.slice(0, 3).map((notification) => (
                      <Link
                        key={notification.id}
                        to="/member/notifications"
                        className="nav-notification-item"
                        onClick={() => setIsNotificationOpen(false)}
                      >
                        <span>{notification.title}</span>
                        <small>{notification.time}</small>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="nav-popover">
                <button
                  type="button"
                  className="nav-user-button"
                  aria-expanded={isUserMenuOpen}
                  onClick={() => {
                    setIsUserMenuOpen((isOpen) => !isOpen);
                    setIsNotificationOpen(false);
                  }}
                >
                  <span className="nav-avatar" aria-hidden="true">
                    {mockMember.name.charAt(0)}
                  </span>
                  <span className="nav-user-name">{mockMember.name}</span>
                  <ChevronDown aria-hidden="true" />
                </button>

                {isUserMenuOpen && (
                  <div className="nav-dropdown nav-user-menu">
                    <Link
                      to="/member/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User aria-hidden="true" />
                      Profile
                    </Link>
                    <Link
                      to="/member/reset-password"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <KeyRound aria-hidden="true" />
                      Reset password
                    </Link>
                    <Link to="/admin" onClick={() => setIsUserMenuOpen(false)}>
                      <Shield aria-hidden="true" />
                      Admin panel
                    </Link>
                    <button type="button" onClick={handleLogout}>
                      <LogOut aria-hidden="true" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login-link">
                Log in
              </Link>
              <Link to="/signup" className="nav-signup-link">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
