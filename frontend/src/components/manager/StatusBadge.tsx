interface StatusBadgeProps {
  value: string;
}

function StatusBadge({ value }: StatusBadgeProps) {
  const modifier = value.toLowerCase().replaceAll(' ', '-');
  return <span className={`manager-status manager-status--${modifier}`}>{value}</span>;
}

export default StatusBadge;
