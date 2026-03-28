import { Link } from "react-router";
import { PapelPicadoBackground } from "~/components/PapelPicadoBackground";
import { PageNavigation } from "~/components/PageNavigation";
import type { Route } from "./+types/support";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `TabTabla® Lotería - Support the Project` },
    {
      name: "description",
      content: `Support TabTabla Lotería and help keep the game online`,
    },
  ];
}

export default function Support() {
  const donationTiers = [
    {
      amount: 5,
      emoji: "☕",
      title: "Quick Cheer",
      description: "Buy me a coffee to fuel development!",
      url: "https://www.paypal.me/ferguzmxkr/5USD",
    },
    {
      amount: 10,
      emoji: "🎉",
      title: "Lotería Supporter",
      description: "Show your love for the game!",
      url: "https://www.paypal.me/ferguzmxkr/10USD",
    },
    {
      amount: 20,
      emoji: "🌮",
      title: "Taco Sponsor",
      description: "Sponsor tacos for the developer!",
      url: "https://www.paypal.me/ferguzmxkr/20USD",
    },
    {
      amount: 50,
      emoji: "🇲🇽",
      title: "Lotería Legend",
      description: "Become a legendary supporter!",
      url: "https://www.paypal.me/ferguzmxkr/50USD",
    },
  ];

  return (
    <>
      <PapelPicadoBackground position="top" />
      <PapelPicadoBackground position="bottom" />
      <div className="flex bg-loteria-blue min-h-screen">
        <div className="mx-auto max-w-3xl p-8 rounded-lg shadow-lg my-10 text-loteria-blue bg-white">
          <header className="text-center">
            <h1 className="text-4xl font-black tracking-wide md:text-5xl">
              Support the Project
            </h1>
            <p className="mt-2 text-lg">
              Help keep TabTabla Lotería online and ad-free
            </p>
          </header>

          {/* Why Support Section */}
          <section className="mt-12">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              Why Support?
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                TabTabla Lotería is <strong>free to play</strong> and will
                always remain so. Your support helps cover:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="mr-2 text-loteria-orange font-bold">•</span>
                  <span>Server hosting costs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-loteria-orange font-bold">•</span>
                  <span>Domain and maintenance expenses</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-loteria-orange font-bold">•</span>
                  <span>New features and improvements</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-loteria-orange font-bold">•</span>
                  <span>Coffee and tacos for the developer! ☕🌮</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Donation Tiers Section */}
          <section className="mt-12">
            <h2 className="mb-6 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              Support Tiers
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {donationTiers.map((tier) => (
                <a
                  key={tier.amount}
                  href={tier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg border-2 border-loteria-orange bg-gradient-to-br from-loteria-cream to-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-6xl mb-3">{tier.emoji}</div>
                    <h3 className="text-2xl font-bold text-loteria-blue mb-2">
                      {tier.title}
                    </h3>
                    <p className="text-3xl font-black text-loteria-orange mb-2">
                      ${tier.amount} USD
                    </p>
                    <p className="text-gray-600">{tier.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-loteria-orange font-semibold group-hover:gap-3 transition-all">
                      <span>Donate Now</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Custom Amount Section */}
          <section className="mt-12 text-center bg-loteria-blue/5 rounded-lg p-6">
            <h2 className="mb-4 text-2xl font-bold">
              Want to donate a different amount?
            </h2>
            <p className="text-lg mb-4">
              Every contribution, big or small, is deeply appreciated!
            </p>
            <a
              href="https://www.paypal.me/ferguzmxkr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-loteria-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Custom Amount
            </a>
          </section>

          {/* Thank You Section */}
          <section className="mt-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">¡Muchas Gracias! 🙏</h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto">
              Your support means the world to us and helps keep this project
              alive. Whether you donate or simply enjoy playing, thank you for
              being part of the TabTabla community!
            </p>
          </section>

          {/* Navigation */}
          <PageNavigation currentPage="support" />
        </div>
      </div>
    </>
  );
}
