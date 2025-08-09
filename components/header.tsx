import { Search } from "./search";

export default function Header() {
  return (
    <header className="py-4 border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">GlowLow</a>
        </div>
        <div className="flex-1 flex justify-center px-8">
          <Search />
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/huidverzorging" className="text-gray-600 hover:text-purple-600 transition-colors">
            Huidverzorging
          </a>
          <a href="/make-up" className="text-gray-600 hover:text-purple-600 transition-colors">
            Make-up
          </a>
          <a href="/parfum" className="text-gray-600 hover:text-purple-600 transition-colors">
            Parfum
          </a>
        </nav>
      </div>
    </header>
  );
}
