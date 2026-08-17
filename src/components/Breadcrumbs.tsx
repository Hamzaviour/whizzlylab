import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="h-3 w-3 text-foreground/30" />
            )}
            {isLast ? (
              <span className="text-foreground/50" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-foreground/50 transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
