import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

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

export function EmptyState({
  title = 'No data yet',
  description = 'Records will appear here when manager data is available.',
}: {
  title?: string;
  description?: string;
}) {
  return <div className="manager-empty"><span><i className="bi bi-inbox" aria-hidden="true" /></span><strong>{title}</strong><p>{description}</p></div>;
}

export function DetailDrawer({ title, subtitle, open, onClose, children }: { title: string; subtitle?: string; open: boolean; onClose: () => void; children: ReactNode }) {
  const drawerRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const drawer = drawerRef.current;
    drawer?.querySelector<HTMLElement>('button, input, select, textarea')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab' || !drawer) return;
      const focusable = [...drawer.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); previousFocus.current?.focus(); };
  }, [open]);
  if (!open) return null;
  return (
    <div className="manager-drawer-layer" role="presentation">
      <button type="button" className="manager-drawer-backdrop" aria-label="Close details" onClick={onClose} />
      <aside ref={drawerRef} className="manager-drawer" role="dialog" aria-modal="true" aria-labelledby="manager-drawer-title">
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

export function ManagerModal({ title, subtitle, open, onClose, children }: { title: string; subtitle?: string; open: boolean; onClose: () => void; children: ReactNode }) {
  const modalRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const modal = modalRef.current;
    const scrollArea = modal?.querySelector<HTMLElement>('.manager-form-scroll, .manager-modal__body');
    if (scrollArea) scrollArea.scrollTop = 0;
    modal?.querySelector<HTMLElement>('input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); return; }
      if (event.key !== 'Tab' || !modal) return;
      const focusable = [...modal.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]')];
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = originalOverflow; previousFocus.current?.focus(); };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className="manager-modal-layer" role="presentation">
      <button type="button" className="manager-modal-backdrop" aria-label="Close modal" onClick={onClose} />
      <section ref={modalRef} className="manager-modal" role="dialog" aria-modal="true" aria-labelledby="manager-modal-title">
        <div className="manager-modal__accent" aria-hidden="true" />
        <header><div><span>Record details</span><h2 id="manager-modal-title">{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button type="button" className="manager-icon-button" aria-label="Close modal" onClick={onClose}><i className="bi bi-x-lg" aria-hidden="true" /></button></header>
        <div className="manager-modal__body">{children}</div>
      </section>
    </div>,
    document.body,
  );
}

export function DataTable({ headers, children, label }: { headers: readonly string[]; children: ReactNode; label: string }) {
  return <div className="manager-panel manager-data-panel"><div className="table-responsive manager-table-wrap"><table className="table manager-table align-middle mb-0" aria-label={label}><thead><tr>{headers.map((header) => <th key={header || 'actions'} scope="col">{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div></div>;
}

export function TableActions({ onView, onEdit, onDelete }: { onView?: () => void; onEdit?: () => void; onDelete?: () => void }) {
  return <div className="manager-table-actions">{onView && <button type="button" onClick={onView}>View</button>}{onEdit && <button type="button" onClick={onEdit}>Edit</button>}{onDelete && <button type="button" className="danger" onClick={onDelete}>Delete</button>}</div>;
}

export function DeleteConfirmation({ open, recordName, submitting, onCancel, onConfirm }: { open: boolean; recordName: string; submitting?: boolean; onCancel: () => void; onConfirm: () => void }) {
  return <ManagerModal open={open} title="Delete record?" subtitle="This action must be confirmed." onClose={onCancel}><p>Delete <strong>{recordName}</strong>? This will call the configured delete handler.</p><div className="manager-form-actions"><button type="button" className="manager-secondary-button" onClick={onCancel}>Cancel</button><button type="button" className="manager-danger-button" disabled={submitting} onClick={onConfirm}>{submitting ? 'Deleting…' : 'Delete'}</button></div></ManagerModal>;
}
