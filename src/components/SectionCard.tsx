import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  children,
}: SectionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
      <h2 className="text-lg font-semibold mb-3">
        {title}
      </h2>

      {children}
    </div>
  );
}