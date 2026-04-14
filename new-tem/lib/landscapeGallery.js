/**
 * Landscape-only pool — same 16:9 display frames site-wide (object-fit: cover).
 * No portrait-oriented assets. Add wide images under public/images/ and append.
 */
export const landscapeGallery = [
  { src: "/images/bike-landscape-1.png", alt: "Tem Motorrs electric bike — urban waterfront" },
  { src: "/images/bike-landscape-2.png", alt: "Tem Motorrs electric bike — bridge and skyline" },
  { src: "/images/bike-landscape-3.png", alt: "Tem Motorrs electric bike — coastal highway" },
  { src: "/images/bike-landscape-4.png", alt: "Tem Motorrs electric bike — open landscape" },
  { src: "/images/bike-beach-wide.jpeg", alt: "Tem Motorrs at sunset on the coast" },
  { src: "/images/bike-city.jpeg", alt: "Tem Motorrs in the city at dusk" },
  { src: "/images/bike-bridge.jpeg", alt: "Tem Motorrs on the sea link" },
  { src: "/images/bike-mountain-road.jpeg", alt: "Tem Motorrs on a mountain road" },
  { src: "/images/bike-alps.jpeg", alt: "Tem Motorrs on an alpine trail" },
  { src: "/images/bike-rohtang.jpeg", alt: "Tem Motorrs at Rohtang Pass" },
];

export function landscapeAt(index) {
  return landscapeGallery[index % landscapeGallery.length];
}

export function landscapeSlice(start, end) {
  return landscapeGallery.slice(start, end);
}
