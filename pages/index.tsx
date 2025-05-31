import { useState } from "react";
import Head from "next/head";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
        <title>GlowLow – Beauty bargains, delivered</title>
        <meta
          name="description"
          content="GlowLow watches prices on your favourite beauty & skincare products and pings you the moment they drop."
        />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-rose-50 to-amber-50">
        <section className="text-center max-w-2xl">
          <h1 className="text-5xl font-extrabold text-rose-600">GlowLow</h1>
          <p className="mt-4 text-lg">
            Beauty bargains, delivered. <br />
            Set a price alert and relax – we’ll glow&nbsp;low, so your wallet
            doesn’t go&nbsp;high.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-80 rounded-full px-5 py-3 text-lg shadow border border-gray-300"
            />
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow"
            >
              Notify me
            </button>
          </form>

          <p className="mt-2 text-sm text-gray-600">
            Zero spam. We’ll e-mail you once when we launch.
          </p>
        </section>
      </main>
    </>
  );
}
