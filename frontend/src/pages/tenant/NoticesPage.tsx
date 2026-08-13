import { useMemo, useState } from 'react';
import './Tenant.css';

type NoticeFilter = 'all' | 'unread' | 'important';

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

const notices: NoticeRecord[] = [
  {
    id: 1,
    title: 'Lift maintenance schedule',
    category: 'Maintenance',
    date: 'Aug 08, 2026',
    preview: 'The elevator will be temporarily unavailable between 10:00 AM and 2:00 PM for servicing.',
    details: 'The lift inspection team will access the service room and perform a full safety check. Please use the staircase if you need to enter the building during this window. We appreciate your cooperation and patience.',
    unread: true,
    important: true,
  },
  {
    id: 2,
    title: 'Water supply update',
    category: 'Building',
    date: 'Aug 06, 2026',
    preview: 'Water will be available from 7:30 AM onward after the line pressure reset.',
    details: 'A brief water supply interruption is expected this morning while the property team stabilizes the pressure in the main line. Water quality checks will be completed before reopening.',
    unread: false,
    important: false,
  },
  {
    id: 3,
    title: 'Rent reminder for August',
    category: 'Payment',
    date: 'Aug 04, 2026',
    preview: 'Your rent for August is due by August 10, 2026. Please review the updated billing summary.',
    details: 'The current billing amount is ৳22,675 including your monthly rent and utility charges. Please contact the management office if you need support or a revised payment plan.',
    unread: true,
    important: true,
  },
  {
    id: 4,
    title: 'Community clean-up day',
    category: 'Community',
    date: 'Aug 02, 2026',
    preview: 'Residents are invited to join the common-area cleanup this Saturday from 9:00 AM.',
    details: 'Volunteers will help clean the green courtyard and shared walkways. Gloves and cleaning materials will be provided. Please bring water and wear comfortable shoes.',
    unread: false,
    important: false,
  },
];

function NoticesPage() {
  const [filter, setFilter] = useState<NoticeFilter>('all');
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const filteredNotices = useMemo(() => {
    if (filter === 'unread') return notices.filter((notice) => notice.unread);
    if (filter === 'important') return notices.filter((notice) => notice.important);
    return notices;
  }, [filter]);

  const unreadCount = notices.filter((notice) => notice.unread).length;

  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-panel tenant-panel--plain">
          <div className="tenant-panel__header tenant-panel__header--split">
            <div>
              <span className="tenant-panel__eyebrow">Community Updates</span>
              <h3>Notices</h3>
            </div>
            <div className="tenant-filter-group" role="tablist" aria-label="Notice filters">
              {[
                { label: 'All', value: 'all' },
                { label: 'Unread', value: 'unread' },
                { label: 'Important', value: 'important' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={`tenant-filter-button ${filter === item.value ? 'active' : ''}`}
                  onClick={() => setFilter(item.value as NoticeFilter)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tenant-notice-topline">
            <div>
              <strong>{notices.length}</strong>
              <span>Total notices</span>
            </div>
            <div>
              <strong>{unreadCount}</strong>
              <span>Unread</span>
            </div>
            <div>
              <strong>{notices.filter((notice) => notice.important).length}</strong>
              <span>Important</span>
            </div>
          </div>
        </section>

        <section className="tenant-notice-list">
          {filteredNotices.length === 0 ? (
            <div className="tenant-empty-state">No notices match the selected filter.</div>
          ) : (
            filteredNotices.map((notice) => {
              const isExpanded = expandedId === notice.id;

              return (
                <article key={notice.id} className={`tenant-notice-item ${notice.unread ? 'is-unread' : ''}`}>
                  <div className="tenant-notice-item__main">
                    <div className="tenant-notice-item__topline">
                      <span className="tenant-notice-tag">{notice.category}</span>
                      {notice.important && <span className="tenant-notice-tag tenant-notice-tag--priority">Important</span>}
                      {notice.unread && <span className="tenant-bullet-dot" aria-label="Unread notice" />}
                    </div>

                    <div className="tenant-notice-item__body">
                      <div>
                        <h4>{notice.title}</h4>
                        <p>{notice.preview}</p>
                      </div>
                      <span className="tenant-notice-date">{notice.date}</span>
                    </div>
                  </div>

                  <div className="tenant-notice-item__footer">
                    <button type="button" className="tenant-link-button" onClick={() => setExpandedId(isExpanded ? null : notice.id)}>
                      {isExpanded ? 'Hide details' : 'View details'}
                    </button>
                    <span className="tenant-notice-state">{notice.unread ? 'Unread' : 'Read'}</span>
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
