import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { MemberLayout } from "../components";
import { mockNotifications } from "../data/memberMock";

function NotificationPage() {
  return (
    <MemberLayout title="Notification">
      <div className="member-card notification-list">
        {mockNotifications.map((notification) => (
          <article
            key={notification.id}
            className={`notification-item ${
              notification.unread ? "notification-item-unread" : ""
            }`}
          >
            <span className="member-icon-badge">
              <Bell aria-hidden="true" />
            </span>
            <div>
              <div className="notification-heading">
                <h2>{notification.title}</h2>
                <time>{notification.time}</time>
              </div>
              <p>{notification.detail}</p>
              <Link
                className="notification-view-link"
                to={notification.actionTo}
              >
                {notification.actionLabel || "View"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </MemberLayout>
  );
}

export default NotificationPage;
