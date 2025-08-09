"use client";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CANONICAL_BRANDS } from '@/lib/config';

interface Props { variant?: 'sort'; }

export default function ClientCategoryFilters({ variant }: Props) {
  if (variant === 'sort') return <SortSelect />;
  return <FilterPanel />;
}

function useQueryUpdater() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function update(next: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams?.toString());
    Object.entries(next).forEach(([k,v]) => {
      if (v == null || v === '' ) params.delete(k); else params.set(k, v);
    });
    params.delete('page'); // reset pagination
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }
  return update;
}

function FilterPanel() {
  const searchParams = useSearchParams();
  const update = useQueryUpdater();
  const [min, setMin] = useState(searchParams.get('min') || '');
  const [max, setMax] = useState(searchParams.get('max') || '');
  const activeBrands = (searchParams.get('brand')?.split(',') || []).filter(Boolean);
  const toggleBrand = (b: string) => {
    const set = new Set(activeBrands);
    if (set.has(b)) set.delete(b); else set.add(b);
    const value = Array.from(set).join(',');
    update({ brand: value || undefined });
  };
  const applyPrices = () => update({ min: min || undefined, max: max || undefined });
  const clear = () => { setMin(''); setMax(''); update({ brand: undefined, min: undefined, max: undefined, sort: undefined }); };
  return (
    <div className="space-y-6 sticky top-20">
      <div className="flex items-center justify-between"><h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Filters</h2><button onClick={clear} className="text-xs text-purple-600 hover:underline">Reset</button></div>
      <section>
        <h3 className="text-xs font-medium uppercase mb-2 text-muted-foreground">Prijs (€)</h3>
        <div className="flex gap-2 items-center">
          <input value={min} onChange={e=>setMin(e.target.value)} placeholder="min" className="w-20 rounded border px-2 py-1 text-xs bg-background" inputMode="decimal" />
          <span className="text-muted-foreground text-xs">-</span>
            <input value={max} onChange={e=>setMax(e.target.value)} placeholder="max" className="w-20 rounded border px-2 py-1 text-xs bg-background" inputMode="decimal" />
          <button onClick={applyPrices} className="ml-auto text-xs px-2 py-1 rounded bg-purple-600 text-white hover:bg-purple-500">OK</button>
        </div>
      </section>
      <section>
        <h3 className="text-xs font-medium uppercase mb-2 text-muted-foreground">Merken</h3>
        <div className="space-y-1 max-h-52 overflow-auto pr-1">
          {CANONICAL_BRANDS.map(b => (
            <label key={b} className="flex items-center gap-2 text-xs cursor-pointer select-none">
              <input type="checkbox" className="accent-purple-600" checked={activeBrands.includes(b)} onChange={()=>toggleBrand(b)} />
              <span className="truncate">{b}</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

function SortSelect() {
  const searchParams = useSearchParams();
  const update = useQueryUpdater();
  const [value, setValue] = useState(searchParams.get('sort') || '');
  useEffect(()=>{ setValue(searchParams.get('sort') || ''); }, [searchParams]);
  const change = (v: string) => { setValue(v); update({ sort: v || undefined }); };
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-muted-foreground">Sorteren</label>
      <select value={value} onChange={e=>change(e.target.value)} className="text-sm rounded border bg-background px-2 py-1">
        <option value="">Standaard</option>
        <option value="price_asc">Prijs ↑</option>
        <option value="price_desc">Prijs ↓</option>
        <option value="rating_desc">Beoordeling</option>
        <option value="newest">Nieuwste</option>
      </select>
    </div>
  );
}
