"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const es = {
  nav: { destinos: "Destinos", packs: "Packs", alojamientos: "Alojamientos", experiencias: "Experiencias", sobre: "Sobre nosotros", contacto: "Contacto", inicio: "Inicio" },
  cta: { reservar: "Reservar ahora", verPacks: "Ver packs", verTodos: "Ver todos los packs", contactar: "Contactar con expertos", planificar: "Planificar mi viaje", buscar: "Buscar viaje", favoritos: "Añadir a favoritos", compartir: "Compartir", compartido: "¡Enlace copiado!", verDetalles: "Ver detalles", filtrar: "Filtrar", limpiar: "Limpiar filtros", enviar: "Enviar mensaje" },
  hero: { eyebrow: "Marruecos · Viajes auténticos", title1: "Descubre Marruecos", title2: "como nunca antes", subtitle: "Viajes todo incluido: traslados, riads, experiencias auténticas y atención personalizada.", destino: "Destino", destinoPh: "¿A dónde quieres ir?", fechas: "Fechas", personas: "Personas" },
  sections: { destinosEyebrow: "Destinos populares", destinosTitle: "Lugares que enamoran", packsEyebrow: "Packs más populares", packsTitle: "Tu próxima aventura", ctaEyebrow: "¿Necesitas algo personalizado?", ctaTitle: "Creamos tu viaje a medida", ctaText: "Cuéntanos tus fechas, intereses y presupuesto. Diseñamos un itinerario único para ti.", readyEyebrow: "¿Listo para tu aventura?", readyTitle: "Explora nuestros packs y vive Marruecos al máximo." },
  bullets: { precio: "Mejor precio garantizado", atencion: "Atención 24/7", personal: "Viajes 100% personalizados", sinCargos: "Sin cargos ocultos", pago: "Pago seguro" },
  features: { desierto: "Excursiones al desierto", desiertoSub: "Aventuras únicas", gastro: "Gastronomía", gastroSub: "Sabores inolvidables", cultura: "Cultura y tradición", culturaSub: "Historia y autenticidad" },
  footer: { tagline: "Tu aventura en Marruecos comienza aquí", about: "Especialistas en viajes auténticos por Marruecos. Riads, desierto, gastronomía y cultura.", destinos: "Destinos", paginas: "Páginas", boletin: "Boletín", boletinText: "Recibe ofertas exclusivas y novedades de Marruecos.", emailPh: "Tu email", rights: "© 2026 Marruecos Viajes Auténticos. Todos los derechos reservados.", privacy: "Política de privacidad", terms: "Términos y condiciones" },
  packs: { metaTitle: "Packs de viaje a Marruecos — Todo incluido", heroEyebrow: "Todo incluido", heroTitle: "Nuestros packs de viaje", heroDesc: "Traslado, alojamiento, experiencias y guía local — todo cuidado al detalle.", duration: "Duración", anyDuration: "Cualquier duración", price: "Precio", anyPrice: "Cualquier precio", city: "Ciudad", anyCity: "Todas las ciudades", expType: "Tipo de experiencia", anyType: "Todas las experiencias", days1to3: "1-3 días", days4to6: "4-6 días", days7plus: "7+ días", priceLt: "Económico", priceMid: "Estándar", priceGt: "Premium", noResults: "No hay packs con esos filtros", popular: "Popular", from: "desde", nights: "noches", results: "resultado", results_plural: "resultados" },
  stays: { metaTitle: "Alojamientos en Marruecos — Riads, hoteles y boutique", heroEyebrow: "Dónde alojarse", heroTitle: "Alojamientos únicos en Marruecos", heroDesc: "Riads tradicionales, hoteles boutique y experiencias inolvidables.", destination: "Destino", anyDest: "Todos los destinos", typeLabel: "Tipo de alojamiento", anyTypeLabel: "Todos", maxPrice: "Precio máx", perNight: "/noche", services: "Servicios", anyService: "Cualquier servicio", noResults: "No hay alojamientos con esos filtros", reviews: "reseñas" },
  experiences: { metaTitle: "Experiencias en Marruecos — Spas, tours y gastronomía", heroEyebrow: "Vive lo auténtico", heroTitle: "Experiencias típicas marroquíes", heroDesc: "Hammams ancestrales, gastronomía, tours por la medina y aventuras en el desierto.", noResults: "No hay experiencias en esta categoría" },
  destinos: { metaTitle: "Destinos en Marruecos — Marrakech, Fez, Chefchaouen y más", heroEyebrow: "Explora", heroTitle: "Destinos imprescindibles", heroDesc: "De las medinas medievales a las dunas infinitas del Sahara.", selectPrompt: "Haz clic en un destino para ver todo lo disponible", packsHere: "Packs en este destino", staysHere: "Alojamientos disponibles", expsHere: "Experiencias para vivir", viewAll: "Ver todos", noItems: "Próximamente más opciones" },
  about: { metaTitle: "Sobre nosotros — Marruecos Viajes Auténticos", heroEyebrow: "Quiénes somos", heroTitle: "Expertos en crear viajes inolvidables", heroDesc: "Somos un equipo local apasionado por compartir la magia y autenticidad de Marruecos.", missionTitle: "Nuestra misión", missionP1: "Ofrecer experiencias únicas y personalizadas, cuidando cada detalle para que vivas Marruecos de la forma más auténtica.", missionP2: "Trabajamos con guías locales, riads familiares y artesanos del país para que tu viaje tenga alma — y deje huella positiva en las comunidades que visitas.", valuesTitle: "Nuestros valores", v1: "Pasión por Marruecos", v1d: "Equipo local que vive y ama el país.", v2: "Calidad garantizada", v2d: "Selección estricta de riads y partners.", v3: "Turismo responsable", v3d: "Apoyo a comunidades y proveedores locales.", v4: "Trato cercano", v4d: "Acompañamiento humano en cada paso.", testimonialsTitle: "Lo que dicen nuestros clientes", ctaTitle: "¿Listo para descubrir Marruecos?", ctaText: "Diseñamos tu viaje a medida. Sin compromiso." },
  contact: { metaTitle: "Contacto y reservas — Marruecos Viajes", heroEyebrow: "Contacto", heroTitle: "Estamos aquí para ayudarte a planificar tu viaje", heroDesc: "Cuéntanos qué buscas y te enviaremos una propuesta personalizada en menos de 24 h.", name: "Nombre completo", namePh: "Tu nombre", email: "Email", phone: "Teléfono", people: "Personas", dateOut: "Fecha de salida", dateBack: "Fecha de regreso", tripType: "Tipo de viaje", t1: "Pack todo incluido", t2: "Solo alojamiento", t3: "Experiencia puntual", t4: "Viaje a medida", prefs: "Cuéntanos tus preferencias", prefsPh: "Intereses, presupuesto aproximado, preferencias gastronómicas...", thanks: "¡Gracias! Te contactaremos en menos de 24 h.", office: "Oficina", hours: "Horario de atención", hoursVal1: "Lunes a Domingo", hoursVal2: "9:00 - 20:00h", mapLabel: "Mapa de ubicación" },
  detail: { description: "Descripción", includes: "Qué incluye", itinerary: "Itinerario", info: "Información práctica", reviews: "Reseñas", amenities: "Comodidades", location: "Ubicación", schedule: "Horario", perPerson: "por persona", perNight: "por noche", from: "desde", date: "Fecha", datePh: "Selecciona fecha", people: "Personas", p1: "1 persona", p2: "2 personas", p3: "3 personas", p4: "4+ personas", freeCancel: "Cancelación gratuita", instantConfirm: "Confirmación inmediata", securePay: "Pago seguro", others: "Otras experiencias que podrían interesarte", duration: "Duración aproximada", expIntro: "Una experiencia auténtica diseñada para sumergirte en la cultura marroquí con expertos locales.", incGuide: "Guía local certificado", incMaterial: "Material y entradas", incDrink: "Bebida tradicional", incTransport: "Transporte (donde aplica)", scheduleText: "Se adapta a tu llegada y a la disponibilidad de los guías locales.", stayDesc1: "Vive una experiencia única de relajación en un auténtico {{type}} marroquí.", stayDesc2: "Déjate llevar por los rituales ancestrales de bienestar. Un momento perfecto para desconectar y cuidar de ti.", stayInc1: "Acceso al hammam tradicional", stayInc2: "Exfoliación con jabón negro", stayInc3: "Masaje relajante con aceite de argán", stayInc4: "Té de menta y dulces marroquíes", stayLocation: "Situado en {{city}}, cerca de los rincones con más carácter local y con traslados disponibles bajo solicitud.", packDesc1: "Vive una experiencia única recorriendo {{city}} con un itinerario diseñado al detalle. {{short}}.", packDesc2: "Déjate llevar por los aromas de los zocos, el silencio del desierto y la calidez de la hospitalidad marroquí. Un viaje pensado para desconectar y descubrir.", packInc1: "Traslados desde aeropuerto", packInc2: "Alojamiento en riad", packInc3: "Guía local certificado", packInc4: "Excursión al desierto", packInc5: "Actividades culturales", packInc6: "Desayuno diario", day: "Día" },
  gallery: { prev: "Imagen anterior", next: "Imagen siguiente" },
  format: { days_one: "día", days_other: "días", nights_one: "noche", nights_other: "noches" },
  packType: { Cultural: "Cultural", Aventura: "Aventura", Lujo: "Lujo", Familiar: "Familiar" },
  stayType: { Riad: "Riad", Hotel: "Hotel", Boutique: "Boutique" },
  expCategory: { all: "Todas", Bienestar: "Bienestar", "Gastronomía": "Gastronomía", Cultural: "Cultural", Aventura: "Aventura" },
  amenity: { Desayuno: "Desayuno", "Wi-Fi": "Wi-Fi", Piscina: "Piscina", Terraza: "Terraza" },
  city: { Marrakech: "Marrakech", Fez: "Fez", Chefchaouen: "Chefchaouen", Merzouga: "Merzouga", Essaouira: "Essaouira" },
  country: { ES: "España", FR: "Francia", MX: "México" },
  destNames: { marrakech: "Marrakech", fez: "Fez", chefchaouen: "Chefchaouen", sahara: "Desierto del Sahara" },
  destBlurb: { marrakech: "La ciudad roja, zocos y palacios", fez: "Medina medieval, arte y artesanía", chefchaouen: "El pueblo azul de las montañas", sahara: "Dunas, camellos y noches estrelladas" },
  packCatalog: {
    "marrakech-desierto": { name: "Marrakech & Desierto", short: "Riad de lujo + noche en jaima beréber" },
    "ruta-imperial": { name: "Ruta Imperial", short: "Marrakech, Fez, Meknes y Rabat" },
    "ciudades-imperiales": { name: "Ciudades Imperiales", short: "Itinerario completo todo incluido" },
    "aventura-sahara": { name: "Aventura en el Sahara", short: "Merzouga, dunas y bivouac de lujo" },
    "gran-tour": { name: "Gran Tour de Marruecos", short: "El recorrido más completo del país" },
    "escapada-chef": { name: "Escapada a Chefchaouen", short: "Pueblo azul + ruta por el norte" },
  },
  stayCatalog: {
    "riad-lorangerie": { name: "Riad L'Orangerie" },
    "riad-fes-relais": { name: "Riad Fès Relais" },
    "dar-jasmine": { name: "Dar Jasmine" },
    "riad-azul": { name: "Riad Azul" },
  },
  expCatalog: {
    "hammam-spa": { name: "Hammam tradicional & Spa", short: "Ritual ancestral de relajación marroquí" },
    "clase-cocina": { name: "Clase de cocina marroquí", short: "Aprende a cocinar tagine y cuscús" },
    "tour-medina": { name: "Tour por la Medina", short: "Descubre los secretos de los zocos" },
    "excursion-desierto": { name: "Excursión al desierto", short: "Camellos, dunas y atardecer" },
    "tour-medina-2": { name: "Tour por la Medina de Fez", short: "Descubre la medina más antigua" },
    "ruta-atlas": { name: "Ruta por el Atlas", short: "Pueblos beréberes y montañas" },
  },
};

const en = {
  nav: { destinos: "Destinations", packs: "Packages", alojamientos: "Accommodations", experiencias: "Experiences", sobre: "About us", contacto: "Contact", inicio: "Home" },
  cta: { reservar: "Book now", verPacks: "View packages", verTodos: "View all packages", contactar: "Contact experts", planificar: "Plan my trip", buscar: "Search trips", favoritos: "Add to favourites", compartir: "Share", compartido: "Link copied!", verDetalles: "View details", filtrar: "Filter", limpiar: "Clear filters", enviar: "Send message" },
  hero: { eyebrow: "Morocco · Authentic travel", title1: "Discover Morocco", title2: "like never before", subtitle: "All-inclusive trips: transfers, riads, authentic experiences and personalised attention.", destino: "Destination", destinoPh: "Where do you want to go?", fechas: "Dates", personas: "Travellers" },
  sections: { destinosEyebrow: "Popular destinations", destinosTitle: "Places to fall in love with", packsEyebrow: "Most popular packages", packsTitle: "Your next adventure", ctaEyebrow: "Need something custom?", ctaTitle: "We create your tailor-made trip", ctaText: "Tell us your dates, interests and budget. We design a unique itinerary for you.", readyEyebrow: "Ready for your adventure?", readyTitle: "Explore our packages and experience Morocco to the fullest." },
  bullets: { precio: "Best price guaranteed", atencion: "24/7 support", personal: "100% personalised trips", sinCargos: "No hidden fees", pago: "Secure payment" },
  features: { desierto: "Desert excursions", desiertoSub: "Unique adventures", gastro: "Gastronomy", gastroSub: "Unforgettable flavours", cultura: "Culture & tradition", culturaSub: "History and authenticity" },
  footer: { tagline: "Your Moroccan adventure starts here", about: "Specialists in authentic travel across Morocco. Riads, desert, gastronomy and culture.", destinos: "Destinations", paginas: "Pages", boletin: "Newsletter", boletinText: "Receive exclusive offers and Morocco news.", emailPh: "Your email", rights: "© 2026 Marruecos Viajes Auténticos. All rights reserved.", privacy: "Privacy policy", terms: "Terms and conditions" },
  packs: { metaTitle: "Morocco travel packages — All inclusive", heroEyebrow: "All inclusive", heroTitle: "Our travel packages", heroDesc: "Transfer, accommodation, experiences and local guide — every detail taken care of.", duration: "Duration", anyDuration: "Any duration", price: "Price", anyPrice: "Any price", city: "City", anyCity: "All cities", expType: "Experience type", anyType: "All experiences", days1to3: "1-3 days", days4to6: "4-6 days", days7plus: "7+ days", priceLt: "Budget", priceMid: "Standard", priceGt: "Premium", noResults: "No packages match those filters", popular: "Popular", from: "from", nights: "nights", results: "result", results_plural: "results" },
  stays: { metaTitle: "Accommodation in Morocco — Riads, hotels and boutique", heroEyebrow: "Where to stay", heroTitle: "Unique accommodation in Morocco", heroDesc: "Traditional riads, boutique hotels and unforgettable experiences.", destination: "Destination", anyDest: "All destinations", typeLabel: "Accommodation type", anyTypeLabel: "All", maxPrice: "Max price", perNight: "/night", services: "Services", anyService: "Any service", noResults: "No accommodation matches those filters", reviews: "reviews" },
  experiences: { metaTitle: "Experiences in Morocco — Spas, tours and gastronomy", heroEyebrow: "Live the authentic", heroTitle: "Typical Moroccan experiences", heroDesc: "Ancient hammams, gastronomy, medina tours and desert adventures.", noResults: "No experiences in this category" },
  destinos: { metaTitle: "Destinations in Morocco — Marrakech, Fez, Chefchaouen and more", heroEyebrow: "Explore", heroTitle: "Must-see destinations", heroDesc: "From medieval medinas to the endless dunes of the Sahara.", selectPrompt: "Click a destination to see everything available", packsHere: "Packages in this destination", staysHere: "Available accommodation", expsHere: "Experiences to enjoy", viewAll: "View all", noItems: "More options coming soon" },
  about: { metaTitle: "About us — Marruecos Viajes Auténticos", heroEyebrow: "Who we are", heroTitle: "Experts in creating unforgettable trips", heroDesc: "We are a local team passionate about sharing the magic and authenticity of Morocco.", missionTitle: "Our mission", missionP1: "To offer unique, personalised experiences, caring for every detail so you can experience Morocco in the most authentic way.", missionP2: "We work with local guides, family riads and artisans of the country so that your trip has soul — and leaves a positive mark on the communities you visit.", valuesTitle: "Our values", v1: "Passion for Morocco", v1d: "Local team who lives and loves the country.", v2: "Guaranteed quality", v2d: "Strict selection of riads and partners.", v3: "Responsible tourism", v3d: "Support for local communities and providers.", v4: "Personal touch", v4d: "Human accompaniment every step of the way.", testimonialsTitle: "What our clients say", ctaTitle: "Ready to discover Morocco?", ctaText: "We design your trip to measure. No commitment." },
  contact: { metaTitle: "Contact and bookings — Morocco Travel", heroEyebrow: "Contact", heroTitle: "We're here to help you plan your trip", heroDesc: "Tell us what you're looking for and we'll send a personalised proposal within 24h.", name: "Full name", namePh: "Your name", email: "Email", phone: "Phone", people: "Travellers", dateOut: "Departure date", dateBack: "Return date", tripType: "Trip type", t1: "All-inclusive package", t2: "Stay only", t3: "Single experience", t4: "Tailor-made trip", prefs: "Tell us your preferences", prefsPh: "Interests, approximate budget, food preferences...", thanks: "Thank you! We'll contact you within 24h.", office: "Office", hours: "Opening hours", hoursVal1: "Monday to Sunday", hoursVal2: "9:00 – 20:00", mapLabel: "Location map" },
  detail: { description: "Description", includes: "What's included", itinerary: "Itinerary", info: "Practical info", reviews: "Reviews", amenities: "Amenities", location: "Location", schedule: "Schedule", perPerson: "per person", perNight: "per night", from: "from", date: "Date", datePh: "Pick a date", people: "Travellers", p1: "1 person", p2: "2 people", p3: "3 people", p4: "4+ people", freeCancel: "Free cancellation", instantConfirm: "Instant confirmation", securePay: "Secure payment", others: "Other experiences you may like", duration: "Approximate duration", expIntro: "An authentic experience designed to immerse you in Moroccan culture with local experts.", incGuide: "Certified local guide", incMaterial: "Materials and tickets", incDrink: "Traditional drink", incTransport: "Transport (where applicable)", scheduleText: "Adapts to your arrival and the availability of local guides.", stayDesc1: "Enjoy a unique relaxation experience in an authentic Moroccan {{type}}.", stayDesc2: "Let yourself be carried by ancestral wellness rituals. The perfect moment to disconnect and care for yourself.", stayInc1: "Access to traditional hammam", stayInc2: "Black soap exfoliation", stayInc3: "Relaxing argan oil massage", stayInc4: "Mint tea and Moroccan sweets", stayLocation: "Located in {{city}}, near the most charming local spots, with transfers available on request.", packDesc1: "Live a unique journey through {{city}} with a carefully crafted itinerary. {{short}}.", packDesc2: "Let yourself be carried by the scents of the souks, the silence of the desert and the warmth of Moroccan hospitality. A trip to disconnect and discover.", packInc1: "Airport transfers", packInc2: "Riad accommodation", packInc3: "Certified local guide", packInc4: "Desert excursion", packInc5: "Cultural activities", packInc6: "Daily breakfast", day: "Day" },
  gallery: { prev: "Previous image", next: "Next image" },
  format: { days_one: "day", days_other: "days", nights_one: "night", nights_other: "nights" },
  packType: { Cultural: "Cultural", Aventura: "Adventure", Lujo: "Luxury", Familiar: "Family" },
  stayType: { Riad: "Riad", Hotel: "Hotel", Boutique: "Boutique" },
  expCategory: { all: "All", Bienestar: "Wellness", "Gastronomía": "Gastronomy", Cultural: "Cultural", Aventura: "Adventure" },
  amenity: { Desayuno: "Breakfast", "Wi-Fi": "Wi-Fi", Piscina: "Pool", Terraza: "Terrace" },
  city: { Marrakech: "Marrakech", Fez: "Fez", Chefchaouen: "Chefchaouen", Merzouga: "Merzouga", Essaouira: "Essaouira" },
  country: { ES: "Spain", FR: "France", MX: "Mexico" },
  destNames: { marrakech: "Marrakech", fez: "Fez", chefchaouen: "Chefchaouen", sahara: "Sahara Desert" },
  destBlurb: { marrakech: "The red city, souks and palaces", fez: "Medieval medina, art and crafts", chefchaouen: "The blue village in the mountains", sahara: "Dunes, camels and starry nights" },
  packCatalog: {
    "marrakech-desierto": { name: "Marrakech & Desert", short: "Luxury riad + night in a Berber tent" },
    "ruta-imperial": { name: "Imperial Route", short: "Marrakech, Fez, Meknes and Rabat" },
    "ciudades-imperiales": { name: "Imperial Cities", short: "Full all-inclusive itinerary" },
    "aventura-sahara": { name: "Sahara Adventure", short: "Merzouga, dunes and luxury bivouac" },
    "gran-tour": { name: "Grand Tour of Morocco", short: "The most complete tour of the country" },
    "escapada-chef": { name: "Chefchaouen Getaway", short: "Blue village + northern route" },
  },
  stayCatalog: {
    "riad-lorangerie": { name: "Riad L'Orangerie" },
    "riad-fes-relais": { name: "Riad Fès Relais" },
    "dar-jasmine": { name: "Dar Jasmine" },
    "riad-azul": { name: "Riad Azul" },
  },
  expCatalog: {
    "hammam-spa": { name: "Traditional Hammam & Spa", short: "Ancestral Moroccan relaxation ritual" },
    "clase-cocina": { name: "Moroccan cooking class", short: "Learn to cook tagine and couscous" },
    "tour-medina": { name: "Medina tour", short: "Discover the secrets of the souks" },
    "excursion-desierto": { name: "Desert excursion", short: "Camels, dunes and sunset" },
    "tour-medina-2": { name: "Fez Medina tour", short: "Discover the oldest medina" },
    "ruta-atlas": { name: "Atlas Mountains route", short: "Berber villages and mountains" },
  },
};

const fr = {
  nav: { destinos: "Destinations", packs: "Circuits", alojamientos: "Hébergements", experiencias: "Expériences", sobre: "À propos", contacto: "Contact", inicio: "Accueil" },
  cta: { reservar: "Réserver maintenant", verPacks: "Voir les circuits", verTodos: "Voir tous les circuits", contactar: "Contacter nos experts", planificar: "Planifier mon voyage", buscar: "Chercher un voyage", favoritos: "Ajouter aux favoris", compartir: "Partager", compartido: "Lien copié !", verDetalles: "Voir les détails", filtrar: "Filtrer", limpiar: "Effacer les filtres", enviar: "Envoyer le message" },
  hero: { eyebrow: "Maroc · Voyages authentiques", title1: "Découvrez le Maroc", title2: "comme jamais auparavant", subtitle: "Voyages tout compris : transferts, riads, expériences authentiques et attention personnalisée.", destino: "Destination", destinoPh: "Où voulez-vous aller ?", fechas: "Dates", personas: "Voyageurs" },
  sections: { destinosEyebrow: "Destinations populaires", destinosTitle: "Des endroits dont on tombe amoureux", packsEyebrow: "Circuits les plus populaires", packsTitle: "Votre prochaine aventure", ctaEyebrow: "Besoin de quelque chose sur mesure ?", ctaTitle: "Nous créons votre voyage sur mesure", ctaText: "Dites-nous vos dates, vos intérêts et votre budget. Nous concevons un itinéraire unique pour vous.", readyEyebrow: "Prêt pour votre aventure ?", readyTitle: "Explorez nos circuits et vivez le Maroc au maximum." },
  bullets: { precio: "Meilleur prix garanti", atencion: "Assistance 24h/24", personal: "Voyages 100% personnalisés", sinCargos: "Sans frais cachés", pago: "Paiement sécurisé" },
  features: { desierto: "Excursions dans le désert", desiertoSub: "Aventures uniques", gastro: "Gastronomie", gastroSub: "Saveurs inoubliables", cultura: "Culture et tradition", culturaSub: "Histoire et authenticité" },
  footer: { tagline: "Votre aventure au Maroc commence ici", about: "Spécialistes des voyages authentiques au Maroc. Riads, désert, gastronomie et culture.", destinos: "Destinations", paginas: "Pages", boletin: "Newsletter", boletinText: "Recevez des offres exclusives et des nouvelles du Maroc.", emailPh: "Votre email", rights: "© 2026 Marruecos Viajes Auténticos. Tous droits réservés.", privacy: "Politique de confidentialité", terms: "Conditions générales" },
  packs: { metaTitle: "Circuits au Maroc — Tout compris", heroEyebrow: "Tout compris", heroTitle: "Nos circuits de voyage", heroDesc: "Transfert, hébergement, expériences et guide local — chaque détail soigné.", duration: "Durée", anyDuration: "Toute durée", price: "Prix", anyPrice: "Tout prix", city: "Ville", anyCity: "Toutes les villes", expType: "Type d'expérience", anyType: "Toutes les expériences", days1to3: "1-3 jours", days4to6: "4-6 jours", days7plus: "7+ jours", priceLt: "Économique", priceMid: "Standard", priceGt: "Premium", noResults: "Aucun circuit ne correspond à ces filtres", popular: "Populaire", from: "à partir de", nights: "nuits", results: "résultat", results_plural: "résultats" },
  stays: { metaTitle: "Hébergements au Maroc — Riads, hôtels et boutique", heroEyebrow: "Où séjourner", heroTitle: "Hébergements uniques au Maroc", heroDesc: "Riads traditionnels, hôtels boutique et expériences inoubliables.", destination: "Destination", anyDest: "Toutes les destinations", typeLabel: "Type d'hébergement", anyTypeLabel: "Tous", maxPrice: "Prix max", perNight: "/nuit", services: "Services", anyService: "Tout service", noResults: "Aucun hébergement ne correspond à ces filtres", reviews: "avis" },
  experiences: { metaTitle: "Expériences au Maroc — Spas, tours et gastronomie", heroEyebrow: "Vivez l'authentique", heroTitle: "Expériences typiquement marocaines", heroDesc: "Hammams ancestraux, gastronomie, tours de la médina et aventures dans le désert.", noResults: "Aucune expérience dans cette catégorie" },
  destinos: { metaTitle: "Destinations au Maroc — Marrakech, Fès, Chefchaouen et plus", heroEyebrow: "Explorer", heroTitle: "Destinations incontournables", heroDesc: "Des médinas médiévales aux dunes infinies du Sahara.", selectPrompt: "Cliquez sur une destination pour voir tout ce qui est disponible", packsHere: "Circuits dans cette destination", staysHere: "Hébergements disponibles", expsHere: "Expériences à vivre", viewAll: "Voir tout", noItems: "Plus d'options bientôt" },
  about: { metaTitle: "À propos — Marruecos Viajes Auténticos", heroEyebrow: "Qui sommes-nous", heroTitle: "Experts en création de voyages inoubliables", heroDesc: "Nous sommes une équipe locale passionnée par le partage de la magie et de l'authenticité du Maroc.", missionTitle: "Notre mission", missionP1: "Offrir des expériences uniques et personnalisées, en soignant chaque détail pour que vous viviez le Maroc de la façon la plus authentique.", missionP2: "Nous travaillons avec des guides locaux, des riads familiaux et des artisans du pays pour que votre voyage ait une âme — et laisse une empreinte positive sur les communautés que vous visitez.", valuesTitle: "Nos valeurs", v1: "Passion pour le Maroc", v1d: "Équipe locale qui vit et aime le pays.", v2: "Qualité garantie", v2d: "Sélection stricte de riads et partenaires.", v3: "Tourisme responsable", v3d: "Soutien aux communautés et prestataires locaux.", v4: "Relation personnelle", v4d: "Accompagnement humain à chaque étape.", testimonialsTitle: "Ce que disent nos clients", ctaTitle: "Prêt à découvrir le Maroc ?", ctaText: "Nous concevons votre voyage sur mesure. Sans engagement." },
  contact: { metaTitle: "Contact et réservations — Maroc Voyages", heroEyebrow: "Contact", heroTitle: "Nous sommes là pour vous aider à planifier votre voyage", heroDesc: "Dites-nous ce que vous cherchez et nous vous enverrons une proposition personnalisée sous 24h.", name: "Nom complet", namePh: "Votre nom", email: "Email", phone: "Téléphone", people: "Voyageurs", dateOut: "Date de départ", dateBack: "Date de retour", tripType: "Type de voyage", t1: "Circuit tout compris", t2: "Hébergement seulement", t3: "Expérience ponctuelle", t4: "Voyage sur mesure", prefs: "Parlez-nous de vos préférences", prefsPh: "Intérêts, budget approximatif, préférences alimentaires...", thanks: "Merci ! Nous vous contacterons sous 24h.", office: "Bureau", hours: "Horaires d'ouverture", hoursVal1: "Lundi au Dimanche", hoursVal2: "9:00 – 20:00", mapLabel: "Carte de localisation" },
  detail: { description: "Description", includes: "Ce qui est inclus", itinerary: "Itinéraire", info: "Infos pratiques", reviews: "Avis", amenities: "Équipements", location: "Emplacement", schedule: "Horaire", perPerson: "par personne", perNight: "par nuit", from: "à partir de", date: "Date", datePh: "Choisissez une date", people: "Voyageurs", p1: "1 personne", p2: "2 personnes", p3: "3 personnes", p4: "4+ personnes", freeCancel: "Annulation gratuite", instantConfirm: "Confirmation immédiate", securePay: "Paiement sécurisé", others: "D'autres expériences qui pourraient vous intéresser", duration: "Durée approximative", expIntro: "Une expérience authentique conçue pour vous plonger dans la culture marocaine avec des experts locaux.", incGuide: "Guide local certifié", incMaterial: "Matériel et entrées", incDrink: "Boisson traditionnelle", incTransport: "Transport (le cas échéant)", scheduleText: "S'adapte à votre arrivée et à la disponibilité des guides locaux.", stayDesc1: "Vivez une expérience unique de relaxation dans un authentique {{type}} marocain.", stayDesc2: "Laissez-vous porter par les rituels ancestraux de bien-être. Un moment parfait pour se déconnecter et prendre soin de soi.", stayInc1: "Accès au hammam traditionnel", stayInc2: "Gommage au savon noir", stayInc3: "Massage relaxant à l'huile d'argan", stayInc4: "Thé à la menthe et pâtisseries marocaines", stayLocation: "Situé à {{city}}, près des coins les plus charmants, avec transferts disponibles sur demande.", packDesc1: "Vivez une expérience unique en parcourant {{city}} avec un itinéraire soigneusement conçu. {{short}}.", packDesc2: "Laissez-vous emporter par les parfums des souks, le silence du désert et la chaleur de l'hospitalité marocaine. Un voyage pour se déconnecter et découvrir.", packInc1: "Transferts depuis l'aéroport", packInc2: "Hébergement en riad", packInc3: "Guide local certifié", packInc4: "Excursion dans le désert", packInc5: "Activités culturelles", packInc6: "Petit-déjeuner quotidien", day: "Jour" },
  gallery: { prev: "Image précédente", next: "Image suivante" },
  format: { days_one: "jour", days_other: "jours", nights_one: "nuit", nights_other: "nuits" },
  packType: { Cultural: "Culturel", Aventura: "Aventure", Lujo: "Luxe", Familiar: "Famille" },
  stayType: { Riad: "Riad", Hotel: "Hôtel", Boutique: "Boutique" },
  expCategory: { all: "Toutes", Bienestar: "Bien-être", "Gastronomía": "Gastronomie", Cultural: "Culturel", Aventura: "Aventure" },
  amenity: { Desayuno: "Petit-déjeuner", "Wi-Fi": "Wi-Fi", Piscina: "Piscine", Terraza: "Terrasse" },
  city: { Marrakech: "Marrakech", Fez: "Fès", Chefchaouen: "Chefchaouen", Merzouga: "Merzouga", Essaouira: "Essaouira" },
  country: { ES: "Espagne", FR: "France", MX: "Mexique" },
  destNames: { marrakech: "Marrakech", fez: "Fès", chefchaouen: "Chefchaouen", sahara: "Désert du Sahara" },
  destBlurb: { marrakech: "La ville rouge, souks et palais", fez: "Médina médiévale, art et artisanat", chefchaouen: "Le village bleu dans les montagnes", sahara: "Dunes, chameaux et nuits étoilées" },
  packCatalog: {
    "marrakech-desierto": { name: "Marrakech & Désert", short: "Riad de luxe + nuit sous tente berbère" },
    "ruta-imperial": { name: "Route Impériale", short: "Marrakech, Fès, Meknès et Rabat" },
    "ciudades-imperiales": { name: "Villes Impériales", short: "Itinéraire complet tout compris" },
    "aventura-sahara": { name: "Aventure au Sahara", short: "Merzouga, dunes et bivouac de luxe" },
    "gran-tour": { name: "Grand Tour du Maroc", short: "Le circuit le plus complet du pays" },
    "escapada-chef": { name: "Escapade à Chefchaouen", short: "Village bleu + route dans le nord" },
  },
  stayCatalog: {
    "riad-lorangerie": { name: "Riad L'Orangerie" },
    "riad-fes-relais": { name: "Riad Fès Relais" },
    "dar-jasmine": { name: "Dar Jasmine" },
    "riad-azul": { name: "Riad Azul" },
  },
  expCatalog: {
    "hammam-spa": { name: "Hammam traditionnel & Spa", short: "Rituel ancestral de relaxation marocain" },
    "clase-cocina": { name: "Cours de cuisine marocaine", short: "Apprenez à cuisiner le tagine et le couscous" },
    "tour-medina": { name: "Tour de la Médina", short: "Découvrez les secrets des souks" },
    "excursion-desierto": { name: "Excursion dans le désert", short: "Chameaux, dunes et coucher de soleil" },
    "tour-medina-2": { name: "Tour de la Médina de Fès", short: "Découvrez la médina la plus ancienne" },
    "ruta-atlas": { name: "Route de l'Atlas", short: "Villages berbères et montagnes" },
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: { es: { translation: es }, en: { translation: en }, fr: { translation: fr } },
      fallbackLng: "es",
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;
