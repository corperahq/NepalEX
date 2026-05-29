import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHead({
  title,
  description,
  breadcrumb,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <nav className="mb-2 flex items-center gap-1 text-xs text-muted">
          <Link href="/client" className="hover:text-cream">
            Client
          </Link>
          {breadcrumb?.map((b) => (
            <span key={b.label} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {b.href ? (
                <Link href={b.href} className="hover:text-cream">
                  {b.label}
                </Link>
              ) : (
                <span className="text-cream">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
