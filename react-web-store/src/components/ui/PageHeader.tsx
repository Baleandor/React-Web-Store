import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-lime-100">{title}</h1>
        {subtitle && <p className="mt-1 text-lime-200/70">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}
