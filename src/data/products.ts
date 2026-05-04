export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  colors: { name: string; swatch: string }[];
  sizes: string[];
  tag?: string;
  image: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "apparel-round-neck-tee",
    name: "Round Neck Tee Collection",
    category: "Apparel",
    price: 45000,
    originalPrice: 55000,
    rating: 4.8,
    reviews: 126,
    description:
      "Clean everyday round-neck tees in multiple colors, ready for branding, retail, or casual uniforms.",
    features: ["Soft touch", "Multi-color range", "Print ready"],
    colors: [
      { name: "White", swatch: "#f5f5f5" },
      { name: "Brown", swatch: "#7a4a2c" },
      { name: "Pink", swatch: "#ec5ba8" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    tag: "Best Seller",
    image: "/products/company/tee-grid.jpg",
    inStock: true,
  },
  {
    id: "apparel-premium-tee-pair",
    name: "Premium Plain Tee Pair",
    category: "Apparel",
    price: 55000,
    originalPrice: 65000,
    rating: 4.7,
    reviews: 81,
    description:
      "A clean premium tee option with a slightly elevated finish for simple fashion drops and custom branding.",
    features: ["Premium finish", "Soft fabric", "Smart casual look"],
    colors: [
      { name: "Brown", swatch: "#8a5a37" },
      { name: "Rust", swatch: "#a55f2b" },
      { name: "Black", swatch: "#161616" },
    ],
    sizes: ["M", "L", "XL"],
    tag: "Premium",
    image: "/products/company/brown-tee-pair.jpg",
    inStock: true,
  },
  {
    id: "apparel-color-tee-set",
    name: "Color Tee Set",
    category: "Apparel",
    price: 50000,
    originalPrice: 60000,
    rating: 4.6,
    reviews: 59,
    description:
      "Bright and earthy tee options for fashion brands, activations, and coordinated casual wear.",
    features: ["Bold colors", "Retail ready", "Brand friendly"],
    colors: [
      { name: "Teal", swatch: "#1ca3b8" },
      { name: "Brown", swatch: "#6f4a2f" },
      { name: "Cream", swatch: "#e9dfcc" },
    ],
    sizes: ["M", "L", "XL"],
    tag: "Color Pick",
    image: "/products/company/teal-brown-tees.jpg",
    inStock: true,
  },
  {
    id: "streetwear-crewneck-collection",
    name: "Crewneck Sweatshirt Collection",
    category: "Streetwear",
    price: 95000,
    originalPrice: 115000,
    rating: 4.8,
    reviews: 72,
    description:
      "Heavy casual sweatshirts in multiple tones for premium streetwear, campus branding, and seasonal merch.",
    features: ["Warm interior", "Streetwear fit", "Color variety"],
    colors: [
      { name: "White", swatch: "#f7f7f7" },
      { name: "Yellow", swatch: "#f3c742" },
      { name: "Maroon", swatch: "#7b2031" },
    ],
    sizes: ["L", "XL", "XXL"],
    tag: "Street Classic",
    image: "/products/company/crewneck-collection.jpg",
    inStock: true,
  },
  {
    id: "streetwear-zip-hoodie-collection",
    name: "Zip Hoodie Collection",
    category: "Streetwear",
    price: 120000,
    originalPrice: 145000,
    rating: 4.9,
    reviews: 94,
    description:
      "Layered zip hoodies in neutral shades for custom merch, team wear, and modern casual collections.",
    features: ["Zip front", "Warm fleece feel", "Neutral palette"],
    colors: [
      { name: "White", swatch: "#f5f5f5" },
      { name: "Olive", swatch: "#b3b58e" },
      { name: "Wine", swatch: "#7b2d36" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    tag: "Top Drop",
    image: "/products/company/hoodie-collection.jpg",
    inStock: true,
  },
  {
    id: "polo-classic-range",
    name: "Classic Polo Range",
    category: "Polos",
    price: 70000,
    originalPrice: 82000,
    rating: 4.7,
    reviews: 88,
    description:
      "Reliable plain polo shirts in core colors for teams, school wear, events, and polished everyday branding.",
    features: ["Collar finish", "Team ready", "Easy branding"],
    colors: [
      { name: "Navy", swatch: "#223a6e" },
      { name: "Black", swatch: "#111111" },
      { name: "Pink", swatch: "#e88ab5" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    tag: "Corporate Pick",
    image: "/products/company/polo-collection.jpg",
    inStock: true,
  },
  {
    id: "polo-color-circle",
    name: "Corporate Polo Circle",
    category: "Polos",
    price: 72000,
    originalPrice: 85000,
    rating: 4.8,
    reviews: 64,
    description:
      "A polished polo selection in brighter tones suited for front desk teams, promo crews, and branded uniforms.",
    features: ["Clean collar detail", "Color range", "Office friendly"],
    colors: [
      { name: "Orange", swatch: "#ea7d1b" },
      { name: "Cream", swatch: "#efe6c8" },
      { name: "Green", swatch: "#329158" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    tag: "Team Favorite",
    image: "/products/company/polo-circle.jpg",
    inStock: true,
  },
  {
    id: "corporate-dress-shirt",
    name: "Executive Dress Shirt",
    category: "Corporate",
    price: 95000,
    originalPrice: 110000,
    rating: 4.6,
    reviews: 37,
    description:
      "A formal shirt option for office teams, events, hospitality, and polished corporate presentation.",
    features: ["Formal collar", "Neat finish", "Presentation ready"],
    colors: [
      { name: "Lilac", swatch: "#d6c0e8" },
      { name: "White", swatch: "#f4f4f4" },
      { name: "Sky", swatch: "#9fd0ef" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    tag: "Executive",
    image: "/products/company/dress-shirt.jpg",
    inStock: true,
  },
  {
    id: "workwear-olive-vest",
    name: "Olive Utility Vest",
    category: "Workwear",
    price: 120000,
    originalPrice: 140000,
    rating: 4.7,
    reviews: 42,
    description:
      "A practical multi-pocket vest for field teams, outdoor crews, activations, and branded utility wear.",
    features: ["Multi-pocket", "Field ready", "Brandable chest area"],
    colors: [
      { name: "Olive", swatch: "#4c5c43" },
      { name: "Black", swatch: "#151515" },
      { name: "Khaki", swatch: "#9e8a61" },
    ],
    sizes: ["L", "XL", "XXL"],
    tag: "Workwear",
    image: "/products/company/olive-vest.jpg",
    inStock: true,
  },
  {
    id: "workwear-field-vest",
    name: "Field Utility Vest",
    category: "Workwear",
    price: 125000,
    originalPrice: 145000,
    rating: 4.8,
    reviews: 35,
    description:
      "Structured black utility vest ideal for security teams, event crews, supervisors, and visible branded roles.",
    features: ["Zip front", "Structured pockets", "Durable look"],
    colors: [
      { name: "Black", swatch: "#101010" },
      { name: "Navy", swatch: "#243b72" },
      { name: "Grey", swatch: "#7f848d" },
    ],
    sizes: ["L", "XL", "XXL", "3XL"],
    tag: "Field Ready",
    image: "/products/company/black-vest-front.jpg",
    inStock: true,
  },
  {
    id: "workwear-branding-sample",
    name: "Custom Branding Vest Sample",
    category: "Workwear",
    price: 135000,
    originalPrice: 155000,
    rating: 4.9,
    reviews: 29,
    description:
      "A branded vest sample showing how company names, logos, and business details can be placed on workwear.",
    features: ["Printed branding", "Back placement", "Client sample"],
    colors: [
      { name: "Black", swatch: "#111111" },
      { name: "White", swatch: "#f4f4f4" },
      { name: "Red", swatch: "#c93a3a" },
    ],
    sizes: ["L", "XL", "XXL"],
    tag: "Brand Sample",
    image: "/products/company/black-vest-back.jpg",
    inStock: true,
  },
  {
    id: "headwear-sun-visors",
    name: "Plain Sun Visors",
    category: "Headwear",
    price: 35000,
    originalPrice: 42000,
    rating: 4.5,
    reviews: 26,
    description:
      "Simple headwear pieces for promo teams, outdoor events, hospitality, and lightweight branded campaigns.",
    features: ["Lightweight", "Outdoor ready", "Easy branding"],
    colors: [
      { name: "Olive", swatch: "#607446" },
      { name: "White", swatch: "#f5f5f5" },
      { name: "Black", swatch: "#121212" },
    ],
    sizes: ["One Size"],
    tag: "Promo Pick",
    image: "/products/company/visors.jpg",
    inStock: true,
  },
];
