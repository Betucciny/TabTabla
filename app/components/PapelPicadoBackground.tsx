interface PapelPicadoBackgroundProps {
  position: "top" | "bottom";
}

export function PapelPicadoBackground({
  position,
}: PapelPicadoBackgroundProps) {
  const baseClasses =
    "fixed left-0 w-full pointer-events-none z-10 max-h-[50px]";
  const positionClasses = position === "top" ? "top-0" : "bottom-0";
  const rotationClasses = position === "bottom" ? "rotate-180" : "";

  return (
    <div className={`${baseClasses} ${positionClasses} ${rotationClasses}`}>
      <img
        src="/papel-picado.svg"
        alt="Papel Picado Banner"
        className="w-full h-[30px]"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
