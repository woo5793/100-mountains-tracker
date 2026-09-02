interface InfoRowProps {
  label: string;
  value: string;
}

export default function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex justify-between py-1">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}