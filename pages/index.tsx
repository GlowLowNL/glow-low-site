import { useState, type FormEvent } from "react";
import Head from "next/head";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("emails").insert({ email });

    if (error) {
      alert("Oeps! Dit e-mailadres staat al op de lijst 🚀");
    } else {
      alert("Bedankt! Je hoort van ons bij de lancering 🥳");
      setEmail("");
    }
  };

  return (
    <>
      <Head>
        <title>GlowLow – Schoonheidsdeals direct geleverd</title>
        <meta
          name="description"
          content="GlowLow volgt de prijzen van je favoriete beauty- en skincare-producten en stuurt je meteen een seintje als ze zakken."
        />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-rose-50 to-amber-50">
        <section className="text-center max-w-2xl">
          <h1 className="text-5xl font-extrabold text-rose-600">GlowLow</h1>
          <p className="mt-4 text-lg">
            Schoonheidsdeals, direct geleverd. <br />
            Stel een prijsalert in en ontspan – wij gaan laag, zodat jouw
            portemonnee hoog blijft.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              required
              type="email"
              placeholder="jij@voorbeeld.nl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-80 rounded-full px-5 py-3 text-lg shadow border border-gray-300"
            />
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow"
            >
              Houd me op de hoogte
            </button>
          </form>

          <p className="mt-2 text-sm text-gray-600">
            Geen spam. Eén mailtje zodra we live gaan.
          </p>
        </section>
        {/* Footer */}
<footer className="mt-12 text-sm text-gray-500 text-center">
  © {new Date().getFullYear()} GlowLow ·{" "}
  <a href="/disclaimer" className="underline mx-1">Disclaimer</a> ·{" "}
  <a href="/privacy" className="underline mx-1">Privacy</a> ·{" "}
  <a href="mailto:info@glowlow.nl" className="underline">Contact</a>
  <br />
  <span className="italic">
    Deze site gebruikt <strong>Awin</strong> affiliate-links.
  </span>
</footer>
      </main>
    </>
  );
}
