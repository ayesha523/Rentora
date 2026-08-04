import type { ReactNode } from 'react';

export function ModuleToolbar({ search, onSearch, searchLabel, children }: { search: string; onSearch: (value: string) => void; searchLabel: string; children?: ReactNode }) {
  return (
    <div className="manager-toolbar">
      <label className="manager-control manager-control--search">
        <span>{searchLabel}</span>
        <span className="manager-control__field"><i className="bi bi-search" aria-hidden="true" /><input type="search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search…" /></span>
      </label>
      {children}
    </div>
  );
}

export function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="manager-control">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function EmptyState() {
  return <div className="manager-empty"><span><i className="bi bi-search" aria-hidden="true" /></span><strong>No matching records</strong><p>Try a broader search or clear one of the active filters.</p></div>;
}

export function DetailDrawer({ title, subtitle, open, onClose, children }: { title: string; subtitle: string; open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="manager-drawer-layer" role="presentation">
      <button type="button" className="manager-drawer-backdrop" aria-label="Close details" onClick={onClose} />
      <aside className="manager-drawer" role="dialog" aria-modal="true" aria-labelledby="manager-drawer-title">
        <div className="manager-drawer__accent" aria-hidden="true" />
        <header><div><span>Record details</span><h2 id="manager-drawer-title">{title}</h2><p>{subtitle}</p></div><button type="button" className="manager-icon-button" aria-label="Close details" onClick={onClose}><i className="bi bi-x-lg" aria-hidden="true" /></button></header>
        <div className="manager-drawer__body">{children}</div>
      </aside>
    </div>
  );
}

export function Feedback({ message }: { message: string }) {
  return <p className="manager-feedback" role="status" aria-live="polite">{message}</p>;
}
