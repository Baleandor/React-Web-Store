import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  children?: ReactNode;
};

export default function EmptyState({ title, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 card px-6 py-16 text-center">
      <p className="text-xl font-semibold text-lime-100">{title}</p>
      {children}
    </div>
  );
}
