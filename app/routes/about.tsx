import { Link } from "react-router";
import { PapelPicadoBackground } from "~/components/PapelPicadoBackground";
import { PageNavigation } from "~/components/PageNavigation";
import type { Route } from "./+types/about";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `TabTabla® Lotería - About` },
    { name: "description", content: `Juego de Lotería | About` },
  ];
}

export default function About() {
  const teamMembers = [
    {
      name: "Fernando Efrain Guzman Amaya",
      role: "Mexican cultural soul from South Korea, the heart of the lotería",
      photo: "/profiles/Fer.png",
      links: [
        {
          platform: "LinkedIn",
          url: "https://www.linkedin.com/in/fernando-guzman-global-leader/",
          icon: "💼",
        },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/efrazmxkr/",
          icon: "📸",
        },
        {
          platform: "WhatsApp",
          url: "https://wa.me/19512613351",
          icon: "💬",
        },
      ],
    },
    {
      name: "Roberto Ángel Herrera Rodríguez",
      role: "The code wizard who brought digital lotería to life",
      photo: "/profiles/Rob.png",
      links: [
        {
          platform: "GitHub",
          url: "https://github.com/betucciny",
          icon: "💻",
        },

        {
          platform: "LinkedIn",
          url: "https://www.linkedin.com/in/roberto-a-herrera-1bb656232/",
          icon: "💼",
        },
      ],
    },
    {
      name: "Mauro Julio Lunari",
      role: "Argentine illustrator from Córdoba, Argentina breathing life into every card",
      photo: "/profiles/Mau.png",
      links: [
        {
          platform: "Instagram",
          url: "https://www.instagram.com/morpheusartcenter?igsh=MXZkNWs5N3ExeHU3dg==",
          icon: "🎨",
        },
      ],
    },
  ];

  return (
    <>
      <PapelPicadoBackground position="top" />
      <PapelPicadoBackground position="bottom" />
      <div className="flex bg-loteria-blue">
        <div className=" mx-auto max-w-3xl p-8 rounded-lg shadow-lg my-10 text-loteria-blue bg-white">
          <header className="text-center">
            <h1 className="text-4xl font-black tracking-wide  md:text-5xl">
              Digital Loteria
            </h1>
            <p className="mt-2 text-lg ">
              The classic Mexican bingo game, brought online for friends and
              family.
            </p>
          </header>

          {/* The Story Section */}
          <section className="mt-12">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              About This Project
            </h2>
            <p className="text-lg leading-relaxed ">
              This version of Loteria was built as a fun project for a friend so
              we could play together online during parties. The goal was to
              create a simple, fast, and authentic experience that captures the
              spirit of gathering around a table and shouting "¡LOTERÍA!".
            </p>
          </section>

          {/* Cultural Breviary Section */}
          <section className="mt-12">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              Cultural Breviary
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <strong>Mexican lotería:</strong> 54 cards that arrived with the
                Spanish (18th century), but Mexico gave it soul with cheeky
                verses, indigenous art, and popular humor.
              </p>
              <p>
                Since 1887, grandmas chant the verses, kids mark with beans,
                parents yell "¡Lotería!", and friends party hard!
              </p>
              <p>
                A living tradition that brings everyone together —no matter age,
                gender, or where you're from.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="mb-6 border-b-2 border-white/20 pb-2 text-3xl font-bold text-center">
              Meet the Compas!
            </h2>
            <div className="space-y-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-gradient-to-br from-loteria-cream to-white rounded-lg shadow-lg border-2 border-loteria-orange/20"
                >
                  {/* Photo - Left Side */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-loteria-orange shadow-lg">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to a placeholder if image doesn't exist
                          e.currentTarget.src = "/question.png";
                        }}
                      />
                    </div>
                  </div>

                  {/* Info - Right Side */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-loteria-blue mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg text-gray-700 italic mb-4">
                      {member.role}
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {member.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-loteria-orange text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold text-sm"
                        >
                          <span>{link.icon}</span>
                          <span>{link.platform}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Navigation */}
          <PageNavigation currentPage="about" />
        </div>
      </div>
    </>
  );
}
