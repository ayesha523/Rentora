import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

type Feature = {
  icon: string;
  title: string;
  description: string;
  tone: string;
};

const highlights = [
  { icon: "bi-grid-1x2", title: "Centralised Management", text: "One workspace for every property task." },
  { icon: "bi-shield-check", title: "Secure User Access", text: "Role-based access for every account." },
  { icon: "bi-people", title: "Two Purpose-Built Portals", text: "Focused experiences for managers and tenants." },
  { icon: "bi-lightning-charge", title: "Real-Time Organisation", text: "Keep records, requests and updates aligned." },
];

const features: Feature[] = [
  { icon: "bi-buildings", title: "Apartment Management", description: "Organise buildings, flats, occupancy and property details in one reliable system.", tone: "indigo" },
  { icon: "bi-person-vcard", title: "Tenant Management", description: "Maintain tenant records and keep the right information easy to find.", tone: "blue" },
  { icon: "bi-wallet2", title: "Rent Collection", description: "Record rent, monitor due amounts and keep payment history transparent.", tone: "violet" },
  { icon: "bi-receipt", title: "Utility Bills", description: "Track utility charges and give tenants a clear view of their monthly costs.", tone: "sky" },
  { icon: "bi-tools", title: "Complaints & Maintenance", description: "Receive issues, prioritise work and follow every request through resolution.", tone: "blue" },
  { icon: "bi-megaphone", title: "Notice Management", description: "Publish important building updates so residents never miss an announcement.", tone: "indigo" },
];

const managerPoints = ["Manage apartments and flats", "Track occupancy", "Manage tenant records", "Monitor rent and utilities", "Handle maintenance requests", "Publish notices and access reports"];
const tenantPoints = ["View rent and utility details", "Review payment history", "Submit complaints in seconds", "Track maintenance requests", "Read apartment notices", "Manage account information"];
const properties = [
  { image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85", label: "Featured residence", title: "Skyline Court", location: "Gulshan, Dhaka", units: "24 units", occupancy: "92% occupied" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85", label: "Family living", title: "Maple Garden", location: "Dhanmondi, Dhaka", units: "18 units", occupancy: "Fully occupied" },
  { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85", label: "Modern apartments", title: "Harbour Heights", location: "Uttara, Dhaka", units: "36 units", occupancy: "4 flats available" },
];
const whyPoints = [
  { icon: "bi-diagram-3", title: "One connected platform", text: "Replace scattered records and conversations with a shared source of truth." },
  { icon: "bi-graph-up-arrow", title: "Clear financial visibility", text: "Understand rent and utility activity without digging through paperwork." },
  { icon: "bi-chat-square-text", title: "Better communication", text: "Keep notices, complaints and progress updates visible to the right people." },
];

const footerGroups = [
  { title: "Platform", links: [["Features", "#features"], ["Manager Portal", "#managers"], ["Tenant Portal", "#tenants"]] },
  { title: "Resources", links: [["How It Works", "#how-it-works"], ["Product Preview", "#product"], ["Help", "#footer"]] },
  { title: "Account", links: [["Login", "/login"], ["Create Account", "/register"]] },
  { title: "Project", links: [["About Rentora", "#about"], ["Privacy", "#footer"], ["Terms", "#footer"]] },
];

function Brand() {
  return <span className="home-brand"><span className="home-brand-mark"><i className="bi bi-buildings-fill" /></span><span>Rentora</span></span>;
}

function ManagerPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`dashboard-mock manager-mock ${compact ? "compact" : ""}`} aria-label="Rentora manager dashboard preview">
      <div className="mock-sidebar"><Brand /><span className="mock-side-active"><i className="bi bi-grid" /> Overview</span><span><i className="bi bi-buildings" /> Apartments</span><span><i className="bi bi-people" /> Tenants</span><span><i className="bi bi-wallet2" /> Payments</span></div>
      <div className="mock-main">
        <div className="mock-top"><div><small>MANAGER PORTAL</small><strong>Good morning, Manager</strong></div><span className="mock-avatar"><i className="bi bi-person" aria-hidden="true" /></span></div>
        <div className="mock-stats">
          <div><i className="bi bi-buildings" /><small>Total units</small><strong>48</strong><em>4 buildings</em></div>
          <div><i className="bi bi-key" /><small>Occupancy</small><strong>92%</strong><em className="positive">+3% this month</em></div>
          <div><i className="bi bi-wallet2" /><small>Rent status</small><strong>89%</strong><em>Collected</em></div>
        </div>
        <div className="mock-lower"><div className="mock-chart"><span><strong>Rent overview</strong><small>Last 6 months</small></span><div className="chart-bars"><i style={{ height: "42%" }} /><i style={{ height: "57%" }} /><i style={{ height: "52%" }} /><i style={{ height: "70%" }} /><i style={{ height: "66%" }} /><i style={{ height: "86%" }} /></div></div><div className="mock-tasks"><strong>Open requests</strong><span><i className="dot urgent" /> Plumbing <b>High</b></span><span><i className="dot" /> Elevator <b>Open</b></span><span><i className="dot done" /> Lighting <b>Done</b></span></div></div>
      </div>
    </div>
  );
}

function TenantPreview() {
  return (
    <div className="tenant-phone" aria-label="Rentora tenant portal preview">
      <div className="phone-top"><Brand /><span className="mock-avatar">AR</span></div>
      <p className="tenant-greeting">Welcome back, Arif</p><h3>Your home at a glance</h3>
      <div className="rent-summary"><span><i className="bi bi-house-door" /> JULY RENT</span><strong>৳24,500</strong><small>Due on 5 August</small><button><i className="bi bi-check-circle-fill" /> Payment recorded</button></div>
      <div className="tenant-quick"><span><i className="bi bi-receipt" /><b>Utilities</b><small>2 new bills</small></span><span><i className="bi bi-tools" /><b>Maintenance</b><small>1 active</small></span></div>
      <div className="tenant-notice"><i className="bi bi-megaphone" /><span><b>New building notice</b><small>Water supply update · Today</small></span><i className="bi bi-chevron-right" /></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="home-page">
      <header className="home-header">
        <nav className="home-nav" aria-label="Main navigation">
          <a href="#top" aria-label="Rentora home" onClick={closeMenu}><Brand /></a>
          <button className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} /></button>
          <div className={`home-nav-panel ${menuOpen ? "open" : ""}`}>
            <div className="home-nav-links"><a href="#top" onClick={closeMenu}>Home</a><a href="#features" onClick={closeMenu}>Features</a><a href="#managers" onClick={closeMenu}>For Managers</a><a href="#tenants" onClick={closeMenu}>For Tenants</a><a href="#how-it-works" onClick={closeMenu}>How It Works</a></div>
            <div className="home-nav-actions"><Link to="/login" className="nav-signin" onClick={closeMenu}>Login</Link><Link to="/register" className="button button-small" onClick={closeMenu}>Create Account</Link></div>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="home-hero">
          <div className="home-container hero-grid">
            <div className="hero-copy"><div className="eyebrow"><span /><i className="bi bi-stars" /> Property management, thoughtfully connected</div><h1>Smarter apartment management <span>starts here.</span></h1><p>Rentora brings property managers and tenants together in one secure platform for rent, utilities, maintenance, complaints and notices.</p><div className="hero-actions"><Link className="button" to="/register">Get Started <i className="bi bi-arrow-right" /></Link><Link className="button button-secondary" to="/login"><i className="bi bi-box-arrow-in-right" /> Sign In</Link></div><div className="hero-assurance"><span><i className="bi bi-shield-check" /> Secure role-based access</span><span><i className="bi bi-phone" /> Built for every screen</span></div></div>
            <div className="hero-visual property-hero-visual"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="hero-property-photo"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=88" alt="Contemporary apartment buildings with glass balconies" /><div className="hero-photo-shade" /><div className="hero-property-caption"><span className="property-pin"><i className="bi bi-geo-alt-fill" /></span><div><small>MANAGED WITH RENTORA</small><strong>Modern communities, better connected</strong></div></div></div><div className="hero-property-inset"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85" alt="Bright modern apartment living room" /><span>Resident-ready spaces</span></div><div className="float-stat float-occupancy"><i className="bi bi-people-fill" /><span><small>Occupancy</small><strong>92%</strong></span><em>+3%</em></div><div className="float-stat float-maintenance"><i className="bi bi-check2-circle" /><span><small>Property care</small><strong>12 resolved</strong></span></div></div>
          </div>
        </section>

        <section className="trust-strip"><div className="home-container trust-grid">{highlights.map((item) => <div className="trust-item" key={item.title}><i className={`bi ${item.icon}`} /><span><strong>{item.title}</strong><small>{item.text}</small></span></div>)}</div></section>

        <section className="home-section property-section" id="properties"><div className="home-container"><div className="property-heading"><div><div className="section-kicker">PROPERTY SHOWCASE</div><h2>Spaces people are proud to call home</h2></div><p>From a single residence to a growing portfolio, Rentora keeps every property organised and every resident informed.</p></div><div className="property-grid">{properties.map((property, index) => <article className={`property-card ${index === 0 ? "property-card-featured" : ""}`} key={property.title}><div className="property-image"><img src={property.image} alt={`${property.title} apartment property`} loading="lazy" /><span>{property.label}</span><button type="button" aria-label={`Save ${property.title}`}><i className="bi bi-heart" /></button></div><div className="property-content"><div><h3>{property.title}</h3><p><i className="bi bi-geo-alt" /> {property.location}</p></div><i className="bi bi-arrow-up-right property-arrow" /><div className="property-meta"><span><i className="bi bi-building" /> {property.units}</span><span><i className="bi bi-key" /> {property.occupancy}</span></div></div></article>)}</div><div className="property-proof"><span><i className="bi bi-shield-check" /><b>Built for responsible management</b><small>Clear records and secure access</small></span><span><i className="bi bi-chat-square-heart" /><b>Designed around residents</b><small>Better communication at every step</small></span><span><i className="bi bi-bar-chart-line" /><b>Ready for growing portfolios</b><small>Stay organised as you scale</small></span></div></div></section>

        <section className="home-section features-section" id="features"><div className="home-container"><div className="section-heading centered"><div className="section-kicker">THE COMPLETE TOOLKIT</div><h2>Everything you need to manage apartments efficiently</h2><p>Purpose-built tools bring daily operations together—without adding complexity.</p></div><div className="feature-layout"><article className="feature-intro"><span className="feature-watermark">01</span><i className="bi bi-command" /><h3>One platform.<br />Every essential workflow.</h3><p>From a new tenant joining to a maintenance issue being resolved, Rentora keeps each detail organised and accessible.</p><a href="#product">See the platform <i className="bi bi-arrow-down-right" /></a></article><div className="feature-grid">{features.map((feature) => <article className={`feature-card ${feature.tone}`} key={feature.title}><span className="feature-icon"><i className={`bi ${feature.icon}`} /></span><h3>{feature.title}</h3><p>{feature.description}</p><span className="card-arrow"><i className="bi bi-arrow-up-right" /></span></article>)}</div></div></div></section>

        <section className="home-section property-story"><div className="home-container story-layout"><div className="story-gallery"><figure className="story-image story-image-main"><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=88" alt="Elegant modern apartment interior" loading="lazy" /><figcaption><i className="bi bi-stars" /> Thoughtful spaces</figcaption></figure><figure className="story-image story-image-side"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=88" alt="Premium shared residential workspace" loading="lazy" /></figure><div className="story-rating"><span className="story-rating-icon"><i className="bi bi-building-check" /></span><div><small>PROPERTY EXPERIENCE</small><strong>Professional from every angle</strong></div></div></div><div className="story-copy"><div className="section-kicker">BEYOND THE DASHBOARD</div><h2>Made for the places people live</h2><p>Beautiful properties deserve equally thoughtful management. Rentora connects the physical experience of a home with the clarity of a modern digital service.</p><div className="story-details"><div><span>01</span><strong>Elevated resident experience</strong><p>Give residents a polished, dependable way to stay informed and supported.</p></div><div><span>02</span><strong>Confidence behind every property</strong><p>Keep operations organised so every building feels professionally managed.</p></div></div><Link className="text-link story-link" to="/register">Build a better property experience <i className="bi bi-arrow-right" /></Link></div></div></section>

        <section className="home-section experience-section" id="managers"><div className="home-container split-layout"><div className="experience-visual manager-visual"><div className="section-label">MANAGER VIEW</div><ManagerPreview compact /><div className="visual-note"><i className="bi bi-graph-up-arrow" /><span><strong>Clearer decisions</strong><small>Live portfolio visibility</small></span></div></div><div className="experience-copy"><div className="section-kicker">FOR PROPERTY MANAGERS</div><h2>Powerful tools for property managers</h2><p className="lead">Run your properties with confidence. Rentora gives your team the clarity to move from daily administration to meaningful action.</p><div className="check-grid">{managerPoints.map((point) => <span key={point}><i className="bi bi-check2" />{point}</span>)}</div><Link className="text-link" to="/register">Explore Manager Features <i className="bi bi-arrow-right" /></Link></div></div></section>

        <section className="home-section tenant-section" id="tenants"><div className="home-container split-layout reverse"><div className="experience-copy"><div className="section-kicker">FOR TENANTS</div><h2>A simpler experience for tenants</h2><p className="lead">Everything residents need, available in one calm, accessible portal. Less uncertainty, faster communication and a clearer view of home.</p><div className="tenant-points">{tenantPoints.map((point, index) => <div key={point}><span>0{index + 1}</span><p>{point}</p></div>)}</div><Link className="text-link" to="/register">Create a Tenant Account <i className="bi bi-arrow-right" /></Link></div><div className="experience-visual tenant-visual"><div className="tenant-glow" /><TenantPreview /><div className="tenant-message"><i className="bi bi-chat-dots-fill" /><span><b>Request updated</b><small>Technician assigned · 2m ago</small></span></div></div></div></section>

        <section className="home-section workflow-section" id="how-it-works"><div className="home-container"><div className="section-heading centered"><div className="section-kicker">HOW RENTORA WORKS</div><h2>From sign-up to organised in four steps</h2><p>A straightforward start for managers and tenants alike.</p></div><div className="workflow"><span className="workflow-line" />{[["bi-person-plus", "Create Your Account", "Set up your secure Rentora account."], ["bi-person-badge", "Choose Your Role", "Select the experience designed for you."], ["bi-window-stack", "Access Your Dashboard", "See the information that matters most."], ["bi-check2-all", "Manage in One Place", "Stay on top of every daily workflow."]].map((step, index) => <article key={step[1]}><span className="step-number">{index + 1}</span><i className={`bi ${step[0]}`} /><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</div></div></section>

        <section className="home-section why-section" id="about"><div className="home-container split-layout"><div className="why-visual"><div className="building-card"><div className="building-sky building-photo"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=88" alt="Welcoming contemporary residential property" loading="lazy" /><span className="photo-badge"><i className="bi bi-house-check" /> Resident-first living</span></div><div className="building-status"><span><i className="bi bi-circle-fill" /> All systems organised</span><strong>One community.<br />One clear view.</strong></div></div><div className="mini-record"><i className="bi bi-folder-check" /><span><b>Records synced</b><small>Secure and accessible</small></span></div></div><div className="experience-copy"><div className="section-kicker">WHY RENTORA</div><h2>Built for better property relationships</h2><p className="lead">Good management is about more than records. Rentora helps teams respond faster, gives tenants better visibility and creates a more organised community.</p><div className="why-list">{whyPoints.map((point) => <div key={point.title}><i className={`bi ${point.icon}`} /><span><strong>{point.title}</strong><p>{point.text}</p></span></div>)}</div></div></div></section>

        <section className="home-section showcase-section" id="product"><div className="home-container"><div className="showcase-heading"><div><div className="section-kicker">PRODUCT PREVIEW</div><h2>Everything important,<br />beautifully in view.</h2></div><p>Dashboards surface what needs attention now while keeping the details close at hand.</p></div><div className="showcase-frame"><div className="showcase-tabs"><span className="active"><i className="bi bi-grid" /> Manager overview</span><span><i className="bi bi-person" /> Tenant portal</span><span><i className="bi bi-bar-chart" /> Reports</span></div><ManagerPreview compact /><div className="showcase-callout"><span><i className="bi bi-stars" /></span><div><small>THIS MONTH</small><strong>91% of rent recorded</strong><p>Your portfolio is tracking ahead of last month.</p></div></div></div></div></section>

        <section className="home-section final-cta"><div className="home-container cta-inner"><div className="cta-icon"><i className="bi bi-buildings-fill" /></div><div><div className="section-kicker">YOUR COMMUNITY, BETTER CONNECTED</div><h2>Ready to simplify apartment management?</h2><p>Join Rentora and manage your apartment community from one organised platform.</p></div><div className="cta-actions"><Link className="button button-light" to="/register">Create Account <i className="bi bi-arrow-right" /></Link><Link className="button button-ghost" to="/login">Sign In</Link></div></div></section>
      </main>

      <footer className="home-footer" id="footer"><div className="home-container footer-main"><div className="footer-brand"><Brand /><p>A modern, connected workspace for apartment managers and tenants.</p><div className="footer-status"><i className="bi bi-shield-check" /> Secure, role-based platform</div></div>{footerGroups.map((group) => <div className="footer-column" key={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => href.startsWith("/") ? <Link key={label} to={href}>{label}</Link> : <a key={label} href={href}>{label}</a>)}</div>)}</div><div className="home-container footer-bottom"><span>© 2026 Rentora</span><span>Apartment management, thoughtfully connected.</span><a href="#top">Back to top <i className="bi bi-arrow-up" /></a></div></footer>
    </div>
  );
}
