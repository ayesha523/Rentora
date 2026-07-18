interface SectionHeaderProps {
  title: string;
  description: string;
  icon: string;
}

function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  return (
    <div className="manager-section-header">
      <span className="manager-section-header__icon" aria-hidden="true">
        <i className={`bi ${icon}`} />
      </span>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SectionHeader;
