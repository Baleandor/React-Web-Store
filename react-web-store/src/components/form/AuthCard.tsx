import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthCard({ title, children, footer }: AuthCardProps) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex flex-col gap-6 card p-8">
        <h1 className="text-center text-3xl font-bold text-lime-100">
          {title}
        </h1>
        {children}
        <p className="text-center text-sm text-lime-200/80">{footer}</p>
      </div>
    </div>
  );
}
