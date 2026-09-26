import { StarIcon } from "@/components/icons";

/** Cinco estrelas douradas — todas as avaliações da Marília são nota máxima. */
export default function Estrelas({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="5 de 5 estrelas"
      className="inline-flex shrink-0 items-center gap-0.5 text-gold"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className={className} />
      ))}
    </span>
  );
}
