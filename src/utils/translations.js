export const esTranslations = {
  1: { title: "Fjallraven - Mochila Foldsack No. 1", desc: "Tu mochila perfecta para el uso diario y caminatas cortas. Guarda hasta portátiles de 15 pulgadas.", cat: "ropa de hombre" },
  2: { title: "Camisetas Slim Fit Premium para Hombre", desc: "Camisetas ajustadas de alta calidad, cómodas y ligeras para cualquier momento.", cat: "ropa de hombre" },
  3: { title: "Chaqueta de Algodón para Hombre", desc: "Excelente chaqueta de algodón para otoño y primavera. Práctica y con muchos bolsillos.", cat: "ropa de hombre" },
  4: { title: "Camisa Slim Fit Casual para Hombre", desc: "El color podría variar ligeramente en la pantalla. Úsala para cualquier ocasión casual.", cat: "ropa de hombre" },
  5: { title: "John Hardy Pulsera de Dragón de plata y oro", desc: "De la colección Legends, esta pulsera presenta el mítico dragón Naga.", cat: "joyería" },
  6: { title: "Joyas de Oro Micropavé PEtiTe", desc: "Gran satisfacción garantizada. Diseñada para mujeres que aman las joyas elegantes.", cat: "joyería" },
  7: { title: "Anillo Princesa Bañado en Oro Blanco", desc: "Anillo clásico creado para princesas. Regalo ideal para bodas o aniversarios.", cat: "joyería" },
  8: { title: "Pendientes Dobles de Acero Inoxidable y Oro Rosa", desc: "Hermosos pendientes colgantes, perfectos para lucir en eventos importantes.", cat: "joyería" },
  9: { title: "Disco Duro Externo Portátil WD 2TB", desc: "Compatible con USB 3.0 y 2.0. Rápida transferencia de datos. Plug and play.", cat: "electrónica" },
  10: { title: "Disco Duro SSD Externo SanDisk 1TB", desc: "Alta velocidad de lectura de estado sólido. Listo para usar en exteriores.", cat: "electrónica" },
  11: { title: "Disco SSD Silicon Power 256GB 3D NAND", desc: "Mejora del rendimiento gracias a la tecnología 3D NAND con velocidades ultrarrápidas.", cat: "electrónica" },
  12: { title: "Disco Duro Gaming WD 4TB para PS4", desc: "Lleva tu experiencia de juego a otro nivel expandiendo tu almacenamiento.", cat: "electrónica" },
  13: { title: "Monitor Acer SB220Q 21.5 pulgadas Full HD", desc: "Un monitor ultradelgado con un panel IPS de alta calidad y colores vibrantes.", cat: "electrónica" },
  14: { title: "Monitor Gaming Curvo Samsung CHG90 49\"", desc: "La inmersión total en los videojuegos con una curvatura envolvente e imágenes perfectas.", cat: "electrónica" },
  15: { title: "Abrigo de Invierno 3-en-1 BIYLACLESEN para Mujer", desc: "Ideal para el frío, snowboard y esquí. Repelente al agua y muy cálido.", cat: "ropa de mujer" },
  16: { title: "Chaqueta Biker de Cuero Sintético Lock and Love", desc: "Cuero sintético de poliuretano, diseño atractivo con cremalleras y detalles únicos.", cat: "ropa de mujer" },
  17: { title: "Chubasquero Cortavientos a Rayas para Mujer", desc: "Chaqueta impermeable perfecta para clima lluvioso y senderismo.", cat: "ropa de mujer" },
  18: { title: "Camiseta de Manga Corta y Cuello en V MBJ para Mujer", desc: "Top básico ajustado al cuerpo fabricado con materiales superligeros.", cat: "ropa de mujer" },
  19: { title: "Camiseta Deportiva Manga Corta Opna para Mujer", desc: "Tejido que absorbe la humedad, ideal para rutinas exigentes de ejercicio.", cat: "ropa de mujer" },
  20: { title: "Camiseta Casual de Algodón DANVOUY para Mujer", desc: "Camiseta suave y cómoda con diseño estampado de letras moderno.", cat: "ropa de mujer" }
};

export const translateProduct = (product, language) => {
  if (!product) return null;
  if (language === 'en') return product;
  
  const trans = esTranslations[product.id];
  return trans ? { ...product, title: trans.title, description: trans.desc, category: trans.cat } : product;
};