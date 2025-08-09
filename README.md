# GlowLow - Beauty Prijsvergelijker

Een moderne, elegante prijsvergelijkingssite voor beautyproducten. Gebouwd met Next.js 14 (App Router), shadcn/ui, en TanStack Query.

## 🚀 Features

- **🔍 Geavanceerde zoekfunctie** met autocomplete
- **📊 Prijshistorie grafieken** met Recharts  
- **🛍️ Realtime prijsvergelijking** tussen retailers
- **📱 Volledig responsive** design
- **⚡ Optimale performance** met Next.js App Router
- **🎨 Modern UI** geïnspireerd door Glossier en Apple

## 🏗️ Projectstructuur

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage 
│   └── product/[id]/      # Dynamische productpagina's
├── components/            # React componenten
│   ├── ui/               # shadcn/ui base componenten  
│   ├── layout/           # Layout componenten (Header, Footer)
│   ├── home/             # Homepage specifieke componenten
│   └── product/          # Product gerelateerde componenten
├── lib/                  # Utilities en API functies
│   ├── mockApi.ts        # Mock API voor ontwikkeling
│   └── utils.ts          # shadcn/ui utilities
├── types/                # TypeScript type definities
└── styles/               # CSS/Tailwind configuratie
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui  
- **Data Fetching:** TanStack Query
- **Charts:** Recharts
- **Language:** TypeScript
- **Icons:** Lucide React

## 🏃‍♂️ Development

```bash
# Installeer dependencies
npm install

# Start development server  
npm run dev

# Build voor productie
npm run build
```

## 📝 API Endpoints (Mock)

- `GET /products` - Lijst van alle producten (gepagineerd)
- `GET /products/{id}` - Specifiek product detail  
- `GET /price-history/{id}` - Prijshistorie voor product

## 🎨 Design Richtlijnen

- **Kleurschema:** Neutrals met subtiele accenten
- **Typography:** Inter font family
- **Spacing:** Consistent 8px grid systeem  
- **Components:** Gebaseerd op shadcn/ui voor consistentie

## 🔄 Component Organisatie

### Layout Components (`components/layout/`)
- `header.tsx` - Site header met navigatie en zoekbalk
- `footer.tsx` - Site footer
- `providers.tsx` - React Query en andere providers

### Home Components (`components/home/`)  
- `hero.tsx` - Homepage hero sectie
- `featured-products.tsx` - Aanbevolen producten
- `categories.tsx` - Categorieën showcase
- `brands.tsx` - Populaire merken
- `newsletter.tsx` - Email signup
- `search.tsx` - Zoekfunctionaliteit met autocomplete

### Product Components (`components/product/`)
- `product-card.tsx` - Herbruikbare productkaart
- `product-page.tsx` - Volledige productpagina layout
- `offers-list.tsx` - Lijst van aanbiedingen per retailer
- `price-history-chart.tsx` - Prijsgeschiedenis grafiek
