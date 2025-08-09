import { Search } from "../home/search";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 gap-4">
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">GlowLow</Link>
        </div>
        <div className="flex-1 flex justify-center px-4 max-w-xl w-full">
          <Search />
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/category/huidverzorging" className="text-gray-600 hover:text-purple-600 transition-colors">
            Huidverzorging
          </Link>
          <Link href="/category/make-up" className="text-gray-600 hover:text-purple-600 transition-colors">
            Make-up
          </Link>
          <Link href="/category/parfum" className="text-gray-600 hover:text-purple-600 transition-colors">
            Parfum
          </Link>
        </nav>
      </div>
    </header>
  );
}
