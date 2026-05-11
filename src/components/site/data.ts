// Image paths — place these in /public/assets/
// All image references use /assets/ prefix for Next.js public folder

export const destinations = [
  { slug: "marrakech", name: "Marrakech", image: "/assets/dest-marrakech.jpg", blurb: "La ciudad roja, zocos y palacios" },
  { slug: "fez", name: "Fez", image: "/assets/dest-fez.jpg", blurb: "Medina medieval, arte y artesanía" },
  { slug: "chefchaouen", name: "Chefchaouen", image: "/assets/dest-chefchaouen.jpg", blurb: "El pueblo azul de las montañas" },
  { slug: "sahara", name: "Desierto del Sahara", image: "/assets/dest-sahara.jpg", blurb: "Dunas, camellos y noches estrelladas" },
];

export type Pack = {
  slug: string;
  name: string;
  image: string;
  gallery: string[];
  duration: string;
  nights: number;
  price: number;
  rating: number;
  reviews: number;
  city: string;
  type: "Cultural" | "Aventura" | "Lujo" | "Familiar";
  popular?: boolean;
  short: string;
};

export const packs: Pack[] = [
  { slug: "marrakech-desierto", name: "Marrakech & Desierto", image: "/assets/pack-desierto.jpg", gallery: ["/assets/pack-desierto.jpg", "/assets/dest-marrakech.jpg", "/assets/dest-sahara.jpg", "/assets/riad-1.jpg"], duration: "5 días", nights: 4, price: 450, rating: 4.8, reviews: 128, city: "Marrakech", type: "Aventura", popular: true, short: "Riad de lujo + noche en jaima beréber" },
  { slug: "ruta-imperial", name: "Ruta Imperial", image: "/assets/pack-imperial.jpg", gallery: ["/assets/pack-imperial.jpg", "/assets/dest-fez.jpg", "/assets/dest-marrakech.jpg", "/assets/riad-2.jpg"], duration: "7 días", nights: 6, price: 680, rating: 4.9, reviews: 96, city: "Fez", type: "Cultural", popular: true, short: "Marrakech, Fez, Meknes y Rabat" },
  { slug: "ciudades-imperiales", name: "Ciudades Imperiales", image: "/assets/pack-ciudades.jpg", gallery: ["/assets/pack-ciudades.jpg", "/assets/dest-fez.jpg", "/assets/dest-marrakech.jpg", "/assets/riad-3.jpg"], duration: "8 días", nights: 7, price: 750, rating: 4.7, reviews: 76, city: "Fez", type: "Cultural", popular: true, short: "Itinerario completo todo incluido" },
  { slug: "aventura-sahara", name: "Aventura en el Sahara", image: "/assets/dest-sahara.jpg", gallery: ["/assets/dest-sahara.jpg", "/assets/pack-desierto.jpg", "/assets/riad-4.jpg", "/assets/dest-marrakech.jpg"], duration: "4 días", nights: 3, price: 390, rating: 4.6, reviews: 54, city: "Merzouga", type: "Aventura", short: "Merzouga, dunas y bivouac de lujo" },
  { slug: "gran-tour", name: "Gran Tour de Marruecos", image: "/assets/dest-marrakech.jpg", gallery: ["/assets/dest-marrakech.jpg", "/assets/pack-imperial.jpg", "/assets/dest-fez.jpg", "/assets/dest-sahara.jpg"], duration: "10 días", nights: 9, price: 980, rating: 4.9, reviews: 88, city: "Marrakech", type: "Lujo", short: "El recorrido más completo del país" },
  { slug: "escapada-chef", name: "Escapada a Chefchaouen", image: "/assets/dest-chefchaouen.jpg", gallery: ["/assets/dest-chefchaouen.jpg", "/assets/pack-ciudades.jpg", "/assets/riad-4.jpg", "/assets/dest-fez.jpg"], duration: "3 días", nights: 2, price: 270, rating: 4.7, reviews: 42, city: "Chefchaouen", type: "Cultural", short: "Pueblo azul + ruta por el norte" },
];

export type Stay = {
  slug: string;
  name: string;
  image: string;
  gallery: string[];
  city: string;
  type: "Riad" | "Hotel" | "Boutique";
  price: number;
  rating: number;
  reviews: number;
  amenities: string[];
};

export const stays: Stay[] = [
  { slug: "riad-lorangerie", name: "Riad L'Orangerie", image: "/assets/riad-1.jpg", gallery: ["/assets/riad-1.jpg", "/assets/riad-2.jpg", "/assets/exp-hammam.jpg", "/assets/dest-marrakech.jpg"], city: "Marrakech", type: "Riad", price: 120, rating: 4.8, reviews: 76, amenities: ["Desayuno", "Piscina", "Wi-Fi"] },
  { slug: "riad-fes-relais", name: "Riad Fès Relais", image: "/assets/riad-2.jpg", gallery: ["/assets/riad-2.jpg", "/assets/riad-1.jpg", "/assets/exp-medina.jpg", "/assets/dest-fez.jpg"], city: "Fez", type: "Riad", price: 110, rating: 4.7, reviews: 63, amenities: ["Desayuno", "Terraza", "Wi-Fi"] },
  { slug: "dar-jasmine", name: "Dar Jasmine", image: "/assets/riad-3.jpg", gallery: ["/assets/riad-3.jpg", "/assets/riad-1.jpg", "/assets/exp-cocina.jpg", "/assets/dest-marrakech.jpg"], city: "Essaouira", type: "Boutique", price: 130, rating: 4.6, reviews: 91, amenities: ["Desayuno", "Piscina", "Wi-Fi"] },
  { slug: "riad-azul", name: "Riad Azul", image: "/assets/riad-4.jpg", gallery: ["/assets/riad-4.jpg", "/assets/dest-chefchaouen.jpg", "/assets/riad-2.jpg", "/assets/exp-medina.jpg"], city: "Chefchaouen", type: "Riad", price: 90, rating: 4.5, reviews: 58, amenities: ["Desayuno", "Terraza", "Wi-Fi"] },
];

export type Experience = {
  slug: string;
  name: string;
  image: string;
  gallery: string[];
  category: "Bienestar" | "Gastronomía" | "Cultural" | "Aventura";
  price: number;
  duration: string;
  rating: number;
  short: string;
};

export const experiences: Experience[] = [
  { slug: "hammam-spa", name: "Hammam tradicional & Spa", image: "/assets/exp-hammam.jpg", gallery: ["/assets/exp-hammam.jpg", "/assets/riad-1.jpg", "/assets/riad-3.jpg", "/assets/exp-medina.jpg"], category: "Bienestar", price: 35, duration: "2 horas", rating: 4.9, short: "Ritual ancestral de relajación marroquí" },
  { slug: "clase-cocina", name: "Clase de cocina marroquí", image: "/assets/exp-cocina.jpg", gallery: ["/assets/exp-cocina.jpg", "/assets/exp-medina.jpg", "/assets/riad-2.jpg", "/assets/dest-marrakech.jpg"], category: "Gastronomía", price: 60, duration: "4 horas", rating: 4.8, short: "Aprende a cocinar tagine y cuscús" },
  { slug: "tour-medina", name: "Tour por la Medina", image: "/assets/exp-medina.jpg", gallery: ["/assets/exp-medina.jpg", "/assets/dest-marrakech.jpg", "/assets/pack-imperial.jpg", "/assets/riad-1.jpg"], category: "Cultural", price: 25, duration: "3 horas", rating: 4.7, short: "Descubre los secretos de los zocos" },
  { slug: "excursion-desierto", name: "Excursión al desierto", image: "/assets/dest-sahara.jpg", gallery: ["/assets/dest-sahara.jpg", "/assets/pack-desierto.jpg", "/assets/dest-marrakech.jpg", "/assets/riad-4.jpg"], category: "Aventura", price: 90, duration: "1 día", rating: 4.9, short: "Camellos, dunas y atardecer" },
  { slug: "tour-medina-2", name: "Tour por la Medina de Fez", image: "/assets/exp-medina.jpg", gallery: ["/assets/exp-medina.jpg", "/assets/dest-fez.jpg", "/assets/riad-2.jpg", "/assets/pack-imperial.jpg"], category: "Cultural", price: 30, duration: "3 horas", rating: 4.6, short: "Descubre la medina más antigua" },
  { slug: "ruta-atlas", name: "Ruta por el Atlas", image: "/assets/dest-marrakech.jpg", gallery: ["/assets/dest-marrakech.jpg", "/assets/dest-sahara.jpg", "/assets/pack-ciudades.jpg", "/assets/riad-3.jpg"], category: "Aventura", price: 75, duration: "1 día", rating: 4.7, short: "Pueblos beréberes y montañas" },
];
