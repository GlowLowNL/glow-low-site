import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface Crumb { href?: string; label: string; }
interface BreadcrumbsProps { items: Crumb[]; className?: string; }

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:text-foreground transition-colors font-medium">
                  {c.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold">{c.label}</span>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
