import clsx from "clsx";

const defaultWords = [
  "9 mins Fast charging", "AI Safety", "300km Range", "BMS Charger",
  "Magnetless Motor", "Structural Battery", "Premium", "Urban Mobility",
  "Built To Think", "24 Patents", "D2C Launch", "Future Ready",
];

export default function Marquee({ words = defaultWords, dark = false }) {
  return (
    <div className={clsx("marquee-wrap", dark && "marquee-wrap-dark")}>
      <div className="marquee-track">
        {[...words, ...words].map((word, i) => (
          <span key={i}>
            {word} <span className="marquee-dot">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
