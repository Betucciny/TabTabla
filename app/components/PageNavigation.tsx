import { Link } from "react-router";

interface PageNavigationProps {
  currentPage?: "home" | "about" | "how-to-play" | "gallery" | "support";
}

export function PageNavigation({ currentPage }: PageNavigationProps) {
  const links = [
    { to: "/", label: "Home", page: "home" },
    { to: "/how-to-play", label: "How to Play", page: "how-to-play" },
    { to: "/about", label: "About", page: "about" },
    { to: "/gallery", label: "Card Gallery", page: "gallery" },
    { to: "/support", label: "Support", page: "support" },
  ];

  return (
    <nav className="mt-16 flex justify-center items-center gap-4 flex-wrap">
      {links.map((link, index) => (
        <div key={link.page} className="flex items-center gap-4">
          {index > 0 && <span className="text-gray-400">•</span>}
          <Link
            to={link.to}
            className={`text-lg font-semibold transition-colors ${
              currentPage === link.page
                ? "text-gray-500 cursor-default"
                : "text-loteria-orange hover:underline"
            }`}
            aria-current={currentPage === link.page ? "page" : undefined}
          >
            {link.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
