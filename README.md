# GlowLow - Beauty Price Comparison Platform

GlowLow is a comprehensive beauty product price comparison platform that aggregates data from multiple European retailers, providing users with real-time price comparisons, historical trends, and direct purchase links.

## 🌟 Features

### Core Functionality
- **Product Catalog**: Browse thousands of beauty products with normalized data
- **Price Comparison**: Compare prices across multiple European retailers
- **Real-time Updates**: Live price tracking with automatic updates
- **Search & Filters**: Advanced filtering by brand, category, price range, and more
- **Price History**: 30-day price charts to track trends and identify deals
- **Direct Purchase**: Click-through to retailers for seamless purchasing

### User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Fast Performance**: Pre-rendered pages and efficient caching
- **SEO Optimized**: Built for search engine visibility
- **Accessible**: WCAG compliant design principles

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 with Pages Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with design system
- **Components**: Radix UI primitives with custom styling
- **Data Fetching**: TanStack Query for efficient state management
- **Charts**: Recharts for price history visualization

### Key Design Decisions
- **URL-first Filtering**: All search and filter states are preserved in URLs
- **Mock API Layer**: Development-ready with easy transition to real backend
- **Component Architecture**: Reusable UI components with consistent design
- **Type Safety**: Full TypeScript coverage for reliable development

## 📁 Project Structure

```
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, etc.)
│   ├── Layout.tsx       # Main layout with navigation
│   ├── ProductCard.tsx  # Product display component
│   ├── ProductGrid.tsx  # Product grid layout
│   └── SearchAndFilters.tsx # Search and filtering interface
├── lib/                 # Utility functions and configuration
│   ├── api.ts          # API configuration
│   ├── mockApi.ts      # Development mock data service
│   ├── queries.ts      # React Query hooks
│   └── utils.ts        # Helper utilities
├── pages/              # Next.js pages
│   ├── products/       # Product-related pages
│   │   └── [id].tsx   # Product detail page
│   ├── products.tsx    # Product listing page
│   └── index.tsx      # Homepage
├── types/              # TypeScript type definitions
│   └── product.ts     # Product and API types
└── styles/            # Global styles
    └── globals.css    # Tailwind imports and design tokens
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd glow-low-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run test` - Run test suite

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Database (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Replacing Mock Data

The project currently uses mock data for development. To connect to a real backend:

1. **Update API configuration** in `lib/api.ts`
2. **Replace mock service** calls in `lib/queries.ts`
3. **Set environment variables** for your API endpoints

## 📊 Data Model

### Core Entities

**Product**
- Basic product information (name, brand, category, description)
- Image URL and specifications (volume, color, etc.)
- Ratings and review data

**PriceOffer**
- Real-time pricing from each retailer
- Stock status and sale information
- Direct purchase links

**PriceHistory**
- Historical price data for trend analysis
- Sale period tracking

### API Endpoints

```typescript
GET /products         // Paginated product catalog with filters
GET /products/{id}    // Detailed product with all offers
GET /price-history/{id}?retailer={retailer}&days={n} // Price history
GET /categories       // Available categories
GET /brands          // Available brands
```

## 🎨 Design System

### Colors
- **Primary**: Rose/Pink for main actions and branding
- **Secondary**: Neutral grays for supporting elements
- **Success**: Green for positive actions (low prices, in stock)
- **Warning**: Red/Orange for sales and urgent actions

### Components
- Built on Radix UI primitives for accessibility
- Consistent spacing using Tailwind's design tokens
- Responsive breakpoints for mobile-first design

## 🔄 Future Enhancements

### Planned Features
- **Price Alerts**: Email notifications when products reach target prices
- **User Accounts**: Wishlist and personalized recommendations
- **Advanced Filtering**: Ingredient search, skin type matching
- **Comparison Tool**: Side-by-side product comparison
- **API Integration**: Real retailer connections

### Performance Optimizations
- **ISR**: Incremental Static Regeneration for product pages
- **Edge Caching**: CDN optimization for images and static content
- **Database Optimization**: Indexing and query optimization

## 📈 Analytics & Monitoring

### Key Metrics
- **Product Discovery**: Search usage and filter effectiveness
- **Conversion Tracking**: Click-through rates to retailers
- **Performance**: Page load times and Core Web Vitals
- **User Engagement**: Time on site and return visits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 Business Model

GlowLow operates on an affiliate commission model:
- **Revenue**: Commission from retailer partnerships
- **Value Proposition**: Free price comparison for users
- **Transparency**: Clear disclosure of affiliate relationships

---

**Built with ❤️ for beauty enthusiasts across Europe**
