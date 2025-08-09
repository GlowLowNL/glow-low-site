import { Inter } from 'next/font/google';
 import Providers from '@/components/layout/providers';
 import Header from '@/components/layout/header';
 import Footer from '@/components/layout/footer';
import '@/styles/globals.css';

export const metadata = {
  title: "GlowLow - Vergelijk beauty prijzen en bespaar",
  description:
    "GlowLow is dé onafhankelijke prijsvergelijker voor cosmetica, parfum en huidverzorging in Nederland. Vind de beste deals voor jouw favoriete beauty producten.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'http://localhost:3000'),
  openGraph: {
    siteName: 'GlowLow',
    type: 'website',
    locale: 'nl_NL'
  },
  robots: { index: true, follow: true }
};

 const inter = Inter({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-inter' });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   return (
     <html lang="nl" className={inter.variable}>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
