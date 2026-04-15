type FooterProps = {
  small?: boolean;
};

export default function Footer({ small = false }: FooterProps) {
  return (
    <div className="text-center max-w-3xl mt-3">
      {small ? (
        <p>TABTABLA® is an internationally registered trademark.</p>
      ) : (
        <p>
          © 2025–2026 Fernando Efrain Guzman Amaya. All rights reserved.
          Acknowledgments: Software developed by Roberto Ángel Herrera
          Rodríguez. Artwork created by Mauro Julio Lunari. TABTABLA® is an
          internationally registered trademark.
        </p>
      )}
    </div>
  );
}
