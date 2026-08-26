import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './Tenant.css';

type SupportFaq = {
  question: string;
  answer: string;
};

type SupportCard = {
  title: string;
  description: string;
  icon: string;
  path: string;
  tone?: 'indigo' | 'blue' | 'purple' | 'warning';
};

const faqList: SupportFaq[] = [
  {
    question: 'How do I submit a maintenance complaint?',
    answer: 'Open the Submit Complaint page, select the right issue category, add the required details, and submit it for management review.',
  },
  {
    question: 'How can I check the status of my complaint?',
    answer: 'Visit Complaint History to review all submitted requests, current status, and any updates added by the property team.',
  },
  {
    question: 'Where can I view my rent and payment history?',
    answer: 'Use the Rent & Bills page to review payment totals, outstanding balances, recent transactions, and your billing history.',
  },
  {
    question: 'How do I update my profile information?',
    answer: 'Open the Profile page and update your personal details, contact information, and notification settings as needed.',
  },
  {
    question: 'Where can I find building notices?',
    answer: 'The Notices page contains the latest building updates, community announcements, and key communication from property management.',
  },
  {
    question: 'What should I do if I have an urgent property issue?',
    answer: 'For urgent safety emergencies, contact the appropriate local emergency service immediately. For time-sensitive property concerns, use the emergency guidance section above or contact management if available.',
  },
];

const supportCards: SupportCard[] = [
  {
    title: 'Maintenance Help',
    description: 'Report issues affecting your home, utilities, or shared property systems.',
    icon: 'bi-wrench-adjustable-circle',
    path: '/tenant/complaints/new',
    tone: 'indigo',
  },
  {
    title: 'Payment & Billing',
    description: 'Review statements, understand dues, and manage monthly payment status.',
    icon: 'bi-credit-card',
    path: '/tenant/rent-bills',
    tone: 'blue',
  },
  {
    title: 'Lease & Apartment',
    description: 'Check lease terms, apartment details, and move-in or occupancy information.',
    icon: 'bi-building',
    path: '/tenant/apartment',
    tone: 'purple',
  },
  {
    title: 'Account & Profile',
    description: 'Manage contact information, preferences, and account settings.',
    icon: 'bi-person-circle',
    path: '/tenant/profile',
    tone: 'indigo',
  },
  {
    title: 'Complaints',
    description: 'Track submitted issues and monitor the latest management updates.',
    icon: 'bi-chat-left-text',
    path: '/tenant/complaints',
    tone: 'blue',
  },
  {
    title: 'Emergency Help',
    description: 'Get guidance for urgent or safety-related property issues.',
    icon: 'bi-exclamation-octagon',
    path: '/tenant/support#emergency',
    tone: 'warning',
  },
];

const quickActions = [
  { title: 'Submit a Complaint', icon: 'bi-chat-left-text', path: '/tenant/complaints/new', note: 'Report an issue' },
  { title: 'View Complaint History', icon: 'bi-journal-text', path: '/tenant/complaints', note: 'Track updates' },
  { title: 'View Rent & Bills', icon: 'bi-cash-stack', path: '/tenant/rent-bills', note: 'Billing overview' },
  { title: 'View Notices', icon: 'bi-megaphone', path: '/tenant/notices', note: 'Latest updates' },
];

function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredFaq = faqList.filter((item) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;

    return `${item.question} ${item.answer}`.toLowerCase().includes(query);
  });

  const filteredCards = supportCards.filter((card) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;

    return `${card.title} ${card.description}`.toLowerCase().includes(query);
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-page-header">
          <div className="tenant-page-header__icon">
            <i className="bi bi-life-preserver" aria-hidden="true" />
          </div>

          <div className="tenant-page-header__content">
            <span className="tenant-panel__eyebrow">Support Center</span>
            <h1>Help & Support</h1>
            <p>Find answers, get assistance, or contact property management.</p>
          </div>
        </section>

        <section className="tenant-panel tenant-support-hero">
          <div className="tenant-support-hero__content">
            <span className="tenant-panel__eyebrow">Need assistance?</span>
            <h2>How can we help you?</h2>
            <p>Search for a topic or jump to the most relevant support area.</p>

            <label className="tenant-search-box" aria-label="Search help topics">
              <i className="bi bi-search" aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search help topics..."
              />
            </label>
          </div>

          <div className="tenant-support-hero__side">
            <div className="tenant-support-hero__metric">
  <span>Average response</span>
  <strong>No data yet</strong>
</div>
            <div className="tenant-support-hero__metric">
              <span>Resident help</span>
              <strong>Available online</strong>
            </div>
          </div>
        </section>

        <section className="tenant-support-section">
          <div className="tenant-section-heading">
            <div>
              <span className="tenant-panel__eyebrow">Popular topics</span>
              <h3>Support categories</h3>
            </div>
          </div>

          <div className="tenant-support-grid">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <Link key={card.title} to={card.path} className={`tenant-support-card tenant-support-card--${card.tone ?? 'indigo'}`}>
                  <div className="tenant-support-card__icon">
                    <i className={`bi ${card.icon}`} aria-hidden="true" />
                  </div>
                  <div className="tenant-support-card__body">
                    <h4>{card.title}</h4>
                    <p>{card.description}</p>
                  </div>
                  <div className="tenant-support-card__footer">
                    <span>Get Help</span>
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="tenant-empty-state tenant-empty-state--compact tenant-empty-state--wide">
                <i className="bi bi-search" aria-hidden="true" />
                <p>No support topics match your search right now.</p>
              </div>
            )}
          </div>
        </section>

        <section className="tenant-support-section">
          <div className="tenant-section-heading">
            <div>
              <span className="tenant-panel__eyebrow">Quick access</span>
              <h3>Quick actions</h3>
            </div>
          </div>

          <div className="tenant-quick-actions-grid">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.path} className="tenant-quick-action">
                <div className="tenant-quick-action__icon">
                  <i className={`bi ${action.icon}`} aria-hidden="true" />
                </div>
                <div className="tenant-quick-action__content">
                  <strong>{action.title}</strong>
                  <span>{action.note}</span>
                </div>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <div className="tenant-two-column-layout">
          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Knowledge base</span>
                <h3>Frequently Asked Questions</h3>
              </div>
            </div>

            <div className="tenant-faq-list">
              {filteredFaq.length > 0 ? (
                filteredFaq.map((item, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div key={item.question} className={`tenant-faq-item ${isOpen ? 'active' : ''}`}>
                      <button
                        type="button"
                        className="tenant-faq-trigger"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                      >
                        <span>{item.question}</span>
                        <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} aria-hidden="true" />
                      </button>
                      <div className="tenant-faq-answer" style={{ maxHeight: isOpen ? '200px' : '0', opacity: isOpen ? 1 : 0 }}>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="tenant-empty-state tenant-empty-state--compact">
                  <p>No answers match your current search.</p>
                </div>
              )}
            </div>
          </section>

          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Contact</span>
                <h3>Contact Property Management</h3>
              </div>
            </div>

            <div className="tenant-contact-card tenant-contact-card--support">
              <div className="tenant-contact-card__header">
                <div className="tenant-avatar tenant-avatar--lg">RM</div>
                <div>
                  <strong>Property Management</strong>
                  <span>Support desk</span>
                </div>
              </div>

              <div className="tenant-contact-state">
                <i className="bi bi-info-circle" aria-hidden="true" />
                Contact details are not configured for this instance yet. Please follow current property office guidance or check the official resident communication channels.
              </div>

              <ul className="tenant-contact-list">
                <li>
                  <i className="bi bi-envelope" aria-hidden="true" />
                  Email: not configured
                </li>
                <li>
                  <i className="bi bi-telephone" aria-hidden="true" />
                  Phone: not configured
                </li>
                <li>
                  <i className="bi bi-clock" aria-hidden="true" />
                  Office hours: available through official property notices
                </li>
              </ul>

              <div className="tenant-actions-row">
                <button type="button" className="btn btn-secondary btn-secondary--compact" disabled>
                  Send Message
                </button>
                <button type="button" className="btn btn-secondary btn-secondary--compact" disabled>
                  Call
                </button>
                <button type="button" className="btn btn-secondary btn-secondary--compact" disabled>
                  Email
                </button>
              </div>
            </div>
          </section>
        </div>

        <section id="emergency" className="tenant-panel tenant-panel--emergency">
          <div className="tenant-panel__header">
            <div>
              <span className="tenant-panel__eyebrow">Urgent</span>
              <h3>Emergency support</h3>
            </div>
          </div>

          <div className="tenant-emergency-banner">
            <div className="tenant-emergency-banner__icon">
              <i className="bi bi-shield-exclamation" aria-hidden="true" />
            </div>
            <p>
              For urgent safety emergencies, contact the appropriate local emergency service immediately. For time-sensitive property issues, escalate them to management if official contact details are available.
            </p>
          </div>
        </section>

        <section className="tenant-panel">
          <div className="tenant-panel__header">
            <div>
              <span className="tenant-panel__eyebrow">Request</span>
              <h3>Support request</h3>
            </div>
          </div>

          <form className="tenant-form" onSubmit={handleSubmit} noValidate>
            <div className="tenant-form__grid">
              <label className="tenant-field">
                <span>Subject</span>
                <input type="text" placeholder="Briefly describe your request" />
              </label>

              <label className="tenant-field">
                <span>Category</span>
                <select>
                  <option>Maintenance</option>
                  <option>Billing</option>
                  <option>Lease</option>
                  <option>Account</option>
                  <option>Complaint</option>
                  <option>Other</option>
                </select>
              </label>
            </div>

            <label className="tenant-field">
              <span>Message</span>
              <textarea rows={5} placeholder="Tell us how we can help you." />
            </label>

            {submitted && (
              <div className="tenant-success-banner">
                <i className="bi bi-check-circle-fill" aria-hidden="true" />
                Your support request has been prepared successfully. Management will review it once contact details are configured for the property.
              </div>
            )}

            <div className="tenant-actions-row tenant-actions-row--align-end">
              <button type="button" className="btn btn-secondary btn-secondary--compact">Save Draft</button>
              <button type="submit" className="btn btn-rentora btn-rentora--compact">Submit Request</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default SupportPage;
