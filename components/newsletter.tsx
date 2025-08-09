import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Newsletter() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mis nooit meer een deal
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Ontvang wekelijks de beste beautyaanbiedingen rechtstreeks in je inbox. 
            Geen spam, alleen topdeals.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="je@email.com"
              className="bg-white text-black placeholder:text-gray-500"
            />
            <Button type="submit" variant="secondary" className="whitespace-nowrap">
              Schrijf me in
            </Button>
          </form>
          
          <p className="text-xs text-primary-foreground/60 mt-4">
            Door je aan te melden ga je akkoord met onze voorwaarden en privacybeleid.
          </p>
        </div>
      </div>
    </section>
  );
}
