import { useMemo, useState } from "react";
import "./Tenant.css";

type NoticeFilter = "all" | "unread" | "important";

type NoticeRecord = {
  id: number;
  title: string;
  category: string;
  date: string;
  preview: string;
  details: string;
  unread: boolean;
  important: boolean;
};

const notices: NoticeRecord[] = [];

function NoticesPage() {
  const [filter, setFilter] = useState<NoticeFilter>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredNotices = useMemo(() => {
    if (filter === "unread") {
      return notices.filter((notice) => notice.unread);
    }

    if (filter === "important") {
      return notices.filter((notice) => notice.important);
    }

    return notices;
  }, [filter]);

  const unreadCount = notices.filter((notice) => notice.unread).length;
  const importantCount = notices.filter((notice) => notice.important).length;

  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-panel tenant-panel--plain">
          <div className="tenant-panel__header tenant-panel__header--split">
            <div>
              <span className="tenant-panel__eyebrow">
                Community Updates
              </span>
              <h3>Notices</h3>
            </div>

            <div
              className="tenant-filter-group"
              role="tablist"
              aria-label="Notice filters"
            >
              {[
                { label: "All", value: "all" },
                { label: "Unread", value: "unread" },
                { label: "Important", value: "important" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={`tenant-filter-button ${
                    filter === item.value ? "active" : ""
                  }`}
                  onClick={() => setFilter(item.value as NoticeFilter)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tenant-notice-topline">
            <div>
              <strong>{notices.length > 0 ? notices.length : "No data yet"}</strong>
              <span>Total notices</span>
            </div>

            <div>
              <strong>{notices.length > 0 ? unreadCount : "No data yet"}</strong>
              <span>Unread</span>
            </div>

            <div>
              <strong>{notices.length > 0 ? importantCount : "No data yet"}</strong>
              <span>Important</span>
            </div>
          </div>
        </section>

        <section className="tenant-notice-list">
          {filteredNotices.length === 0 ? (
            <div className="tenant-empty-state">
              <div className="tenant-empty-state__icon">
                <i className="bi bi-megaphone" aria-hidden="true" />
              </div>

              <h4>No notices yet</h4>

              <p>
                Property and community notices will appear here when they are
                available.
              </p>
            </div>
          ) : (
            filteredNotices.map((notice) => {
              const isExpanded = expandedId === notice.id;

              return (
                <article
                  key={notice.id}
                  className={`tenant-notice-item ${
                    notice.unread ? "is-unread" : ""
                  }`}
                >
                  <div className="tenant-notice-item__main">
                    <div className="tenant-notice-item__topline">
                      <span className="tenant-notice-tag">
                        {notice.category}
                      </span>

                      {notice.important && (
                        <span className="tenant-notice-tag tenant-notice-tag--priority">
                          Important
                        </span>
                      )}

                      {notice.unread && (
                        <span
                          className="tenant-bullet-dot"
                          aria-label="Unread notice"
                        />
                      )}
                    </div>

                    <div className="tenant-notice-item__body">
                      <div>
                        <h4>{notice.title}</h4>
                        <p>{notice.preview}</p>
                      </div>

                      <span className="tenant-notice-date">
                        {notice.date}
                      </span>
                    </div>
                  </div>

                  <div className="tenant-notice-item__footer">
                    <button
                      type="button"
                      className="tenant-link-button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : notice.id)
                      }
                    >
                      {isExpanded ? "Hide details" : "View details"}
                    </button>

                    <span className="tenant-notice-state">
                      {notice.unread ? "Unread" : "Read"}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="tenant-notice-item__details">
                      {notice.details}
                    </div>
                  )}
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
}

export default NoticesPage;