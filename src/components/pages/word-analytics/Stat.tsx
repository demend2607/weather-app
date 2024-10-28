interface StatProps {
  number: number;
  label: string;
}

export default function Stat({ number, label }: StatProps) {
  return (
    <div className="stat">
      <span className={`stat_number ${number < 0 ? "stat-limit" : ""}`}>{number}</span>
      <h2 className="stat_head">{label}</h2>
    </div>
  );
}
