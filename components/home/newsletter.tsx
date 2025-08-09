import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Newsletter() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-sky-100" />
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]" />
      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600">
            Mis nooit meer een deal
          </h2>
          <p className="text-neutral-600/80 mb-10 text-base md:text-lg leading-relaxed">
            Ontvang wekelijks de beste beautyaanbiedingen rechtstreeks in je inbox. Geen spam, alleen topdeals.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="je@email.com"
              className="h-12 rounded-full bg-white/70 backdrop-blur px-5 text-base border border-neutral-300 placeholder:text-neutral-400 focus-visible:ring-2"
            />
            <Button type="submit" variant="default" className="h-12 rounded-full px-8 text-sm font-medium shadow hover:shadow-md transition-shadow">
              Schrijf me in
            </Button>
          </form>
          <p className="text-xs text-neutral-500 mt-5">
            Door je aan te melden ga je akkoord met onze voorwaarden en privacybeleid.
          </p>
        </div>
      </div>
    </section>
  );
}
