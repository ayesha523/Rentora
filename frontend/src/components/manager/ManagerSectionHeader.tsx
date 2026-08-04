interface ManagerSectionHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionIcon?: string;
  onAction?: () => void;
}

function ManagerSectionHeader({ eyebrow, title, description, actionLabel, actionIcon = 'bi-plus-lg', onAction }: ManagerSectionHeaderProps) {
  return (
    <header className="manager-page-header">
      <div>
        {eyebrow && <span className="manager-page-header__eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actionLabel && (
        <button type="button" className="manager-primary-button" onClick={onAction}>
          <i className={`bi ${actionIcon}`} aria-hidden="true" />
          {actionLabel}
        </button>
      )}
    </header>
  );
}

export default ManagerSectionHeader;
