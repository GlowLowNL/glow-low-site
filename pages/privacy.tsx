export default function Privacy() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy- &amp; cookieverklaring</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">Wie zijn wij?</h2>
      <p>
        GlowLow is een eenmanszaak gevestigd in Nederland. Vragen? Mail&nbsp;
        <a className="underline" href="mailto:info@glowlow.nl">info@glowlow.nl</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Welke gegevens verzamelen we?</h2>
      <ul className="list-disc pl-6">
        <li>E-mail­adres – alleen als je je inschrijft voor een alert.</li>
        <li>Geanonimiseerde statistieken via Plausible (geen cookies).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Wat doen we met die gegevens?</h2>
      <p>We sturen je het gevraagde prijsalert-mailtje en analyseren anoniem verkeer om de site te verbeteren.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Bewaartermijn & rechten</h2>
      <p>Je kunt altijd inzage of verwijdering vragen via het bovenstaande e-mail­adres.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
      <p>GlowLow plaatst standaard geen tracking-cookies. Als dat verandert vragen we eerst toestemming.</p>
    </main>
  );
}
