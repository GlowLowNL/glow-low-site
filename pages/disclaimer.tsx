export default function Disclaimer() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Disclaimer &amp; affiliate-links</h1>

      <p className="mb-4">
        GlowLow vergelijkt prijzen bij Nederlandse beauty-webshops. Wanneer je
        via onze link een aankoop doet, kan GlowLow een kleine commissie
        ontvangen. Dit kost jou niets extra.
      </p>

      <p className="text-sm text-gray-600">
        Laatste update: {new Date().toLocaleDateString("nl-NL")}
      </p>
    </main>
  );
}
