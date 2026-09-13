export type ProductShade = {
  id: string;
  code: string;
  name: string;
  description: string;
  swatch: string;
};

export type ProductDetail = {
  id: string;
  slug: string;
  name: string;
  finish: string;
  shade: string;
  price: number;
  priceLabel: string;
  href: string;
  imageSrc: string;
  imageHoverSrc: string;
  imageAlt: string;
  isPlaceholder: boolean;
  category: "face" | "eyes" | "lips" | "new";
  description: string;
  story: string;
  ingredients: string;
  howToUse: string;
  shades: ProductShade[];
  bestSeller?: boolean;
};

export type FeaturedHeroProduct = {
  name: string;
  finish: string;
  shade: string;
  priceLabel: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  isPlaceholder: boolean;
};

export type CatalogProduct = Pick<
  ProductDetail,
  | "id"
  | "name"
  | "finish"
  | "shade"
  | "priceLabel"
  | "href"
  | "imageSrc"
  | "imageAlt"
  | "isPlaceholder"
>;

export type ShadeOption = {
  id: string;
  name: string;
  mood: string;
  description: string;
  swatch: string;
  field: string;
  productTint: string;
};

export type TexturePanel = {
  id: string;
  title: string;
  caption: string;
  tone: string;
};

export type LookHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  productId: string;
};

export function formatPrice(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

const blushShades: ProductShade[] = [
  {
    id: "warm-nude",
    code: "01",
    name: "Warm Nude",
    description: "Warm nude with a soft peach undertone.",
    swatch: "#C8A995",
  },
  {
    id: "petal",
    code: "02",
    name: "Petal",
    description: "Soft petal pink for a quiet flush.",
    swatch: "#D9A7A5",
  },
  {
    id: "rosewood",
    code: "03",
    name: "Rosewood",
    description: "Muted rose with a satin finish.",
    swatch: "#B96C73",
  },
  {
    id: "berry",
    code: "04",
    name: "Berry",
    description: "Deep berry for evening definition.",
    swatch: "#7A3B4A",
  },
  {
    id: "cocoa",
    code: "05",
    name: "Cocoa",
    description: "Cocoa brown that flatters deeper undertones.",
    swatch: "#5C4033",
  },
];

const tintShades: ProductShade[] = [
  {
    id: "fair-porcelain",
    code: "01",
    name: "Porcelain",
    description: "Light coverage for fair cool skin.",
    swatch: "#F0E2D6",
  },
  {
    id: "sand",
    code: "02",
    name: "Sand",
    description: "Balanced beige for light-medium warm skin.",
    swatch: "#E0C4A8",
  },
  {
    id: "tan",
    code: "03",
    name: "Tan",
    description: "Golden tan for medium to deep warm skin.",
    swatch: "#C49A6C",
  },
  {
    id: "deep",
    code: "04",
    name: "Deep",
    description: "Rich depth with a soft neutral finish.",
    swatch: "#8B5E3C",
  },
];

const lipShades: ProductShade[] = [
  {
    id: "rosewater",
    code: "01",
    name: "Rosewater",
    description: "Sheer rose gloss with a watery shine.",
    swatch: "#E8B4B8",
  },
  {
    id: "nude-glass",
    code: "02",
    name: "Nude Glass",
    description: "Clear-nude shine that still looks like lips.",
    swatch: "#D4B5A0",
  },
  {
    id: "cherry",
    code: "03",
    name: "Cherry",
    description: "Juicy cherry with reflective gloss.",
    swatch: "#A84B57",
  },
];

export const products: ProductDetail[] = [
  {
    id: "soft-blush",
    slug: "soft-blush",
    name: "Soft Blush",
    finish: "Dewy",
    shade: "Warm Nude",
    price: 3200,
    priceLabel: "Rs. 3,200",
    href: "/product/soft-blush",
    imageSrc: "/products/hero-product-placeholder.svg",
    imageHoverSrc: "/products/hero-product-placeholder.svg",
    imageAlt: "Placeholder — Soft Blush packaging",
    isPlaceholder: true,
    category: "face",
    bestSeller: true,
    description:
      "A cream blush that melts into skin for a lived-in flush — never chalky, never loud.",
    story:
      "Built for everyday light. Soft Blush is pigment suspended in a breathable cream so color looks like it belongs to you.",
    ingredients: "Jojoba esters, mica, vitamin E, iron oxides.",
    howToUse: "Tap onto the high points of the cheeks and blend upward with fingers.",
    shades: blushShades,
  },
  {
    id: "veil-skin-tint",
    slug: "veil-skin-tint",
    name: "Veil Skin Tint",
    finish: "Sheer",
    shade: "Sand",
    price: 4100,
    priceLabel: "Rs. 4,100",
    href: "/product/veil-skin-tint",
    imageSrc: "/products/hero-product-placeholder.svg",
    imageHoverSrc: "/products/hero-product-placeholder.svg",
    imageAlt: "Placeholder — Veil Skin Tint packaging",
    isPlaceholder: true,
    category: "face",
    bestSeller: true,
    description:
      "A sheer skin tint that evens tone while keeping texture visible and honest.",
    story:
      "Coverage without costume. Veil sits lightly, blurs unevenness, and still lets skin feel like skin.",
    ingredients: "Squalane, niacinamide, mineral pigments.",
    howToUse: "Press a few drops over moisturized skin; build only where needed.",
    shades: tintShades,
  },
  {
    id: "glass-lip",
    slug: "glass-lip",
    name: "Glass Lip",
    finish: "Gloss",
    shade: "Rosewater",
    price: 2750,
    priceLabel: "Rs. 2,750",
    href: "/product/glass-lip",
    imageSrc: "/products/hero-product-placeholder.svg",
    imageHoverSrc: "/products/hero-product-placeholder.svg",
    imageAlt: "Placeholder — Glass Lip packaging",
    isPlaceholder: true,
    category: "lips",
    bestSeller: true,
    description:
      "A non-sticky gloss that catches light without drowning the lip line.",
    story:
      "Glass Lip is about reflection, not thickness — a clean shine that still feels wearable.",
    ingredients: "Hydrogenated polyisobutene, jojoba oil, vitamin E.",
    howToUse: "Swipe once for sheer glass, twice for richer color.",
    shades: lipShades,
  },
  {
    id: "soft-focus",
    slug: "soft-focus",
    name: "Soft Focus",
    finish: "Powder",
    shade: "Translucent",
    price: 3450,
    priceLabel: "Rs. 3,450",
    href: "/product/soft-focus",
    imageSrc: "/products/hero-product-placeholder.svg",
    imageHoverSrc: "/products/hero-product-placeholder.svg",
    imageAlt: "Placeholder — Soft Focus powder packaging",
    isPlaceholder: true,
    category: "face",
    bestSeller: true,
    description:
      "A translucent powder that softens shine while keeping skin dimension.",
    story:
      "Designed to finish, not flatten. Soft Focus sets without turning your face matte-dead.",
    ingredients: "Silica, rice starch, micronized powders.",
    howToUse: "Dust lightly through the T-zone with a fluffy brush.",
    shades: [
      {
        id: "translucent",
        code: "01",
        name: "Translucent",
        description: "Universal soft-focus finish.",
        swatch: "#E8DFD6",
      },
    ],
  },
  {
    id: "ink-liner",
    slug: "ink-liner",
    name: "Ink Liner",
    finish: "Matte",
    shade: "Noir",
    price: 2400,
    priceLabel: "Rs. 2,400",
    href: "/product/ink-liner",
    imageSrc: "/products/hero-product-placeholder.svg",
    imageHoverSrc: "/products/hero-product-placeholder.svg",
    imageAlt: "Placeholder — Ink Liner packaging",
    isPlaceholder: true,
    category: "eyes",
    bestSeller: false,
    description:
      "A precise matte liner with a flexible tip for soft wings or tight lines.",
    story:
      "Ink Liner is for definition that still feels modern — sharp when you want it, smudgeable when you don’t.",
    ingredients: "Water-resistant polymers, carbon black, glycerin.",
    howToUse: "Start at the outer corner and pull inward for control.",
    shades: [
      {
        id: "noir",
        code: "01",
        name: "Noir",
        description: "Deep matte black.",
        swatch: "#171414",
      },
      {
        id: "espresso",
        code: "02",
        name: "Espresso",
        description: "Soft brown for everyday definition.",
        swatch: "#3A2A22",
      },
    ],
  },
];

/** Featured hero SKU — photography still pending. */
export const featuredHeroProduct: FeaturedHeroProduct = {
  name: "Soft Blush",
  finish: "Dewy",
  shade: "Warm Nude",
  priceLabel: "Rs. 3,200",
  href: "/product/soft-blush",
  imageSrc: "/products/hero-product-placeholder.svg",
  imageAlt:
    "Placeholder packaging for Soft Blush — replace with real product photography",
  isPlaceholder: true,
};

export const newDropProducts: CatalogProduct[] = products.map((product) => ({
  id: product.id,
  name: product.name,
  finish: product.finish,
  shade: product.shade,
  priceLabel: product.priceLabel,
  href: product.href,
  imageSrc: product.imageSrc,
  imageAlt: product.imageAlt,
  isPlaceholder: product.isPlaceholder,
}));

export const bestSellerProducts = products.filter((product) => product.bestSeller);

export const shadeWorldOptions: ShadeOption[] = [
  {
    id: "nude",
    name: "Nude",
    mood: "Quiet confidence",
    description: "Warm nude with a soft peach undertone.",
    swatch: "#C8A995",
    field: "#EFE8DF",
    productTint: "#D4B5A0",
  },
  {
    id: "rose",
    name: "Rose",
    mood: "Soft flush",
    description: "Muted rose that reads natural on warm skin.",
    swatch: "#B96C73",
    field: "#F3E4E1",
    productTint: "#C97E84",
  },
  {
    id: "berry",
    name: "Berry",
    mood: "Evening depth",
    description: "Deep berry with a satin finish for night.",
    swatch: "#7A3B4A",
    field: "#E8D8D6",
    productTint: "#8E4A58",
  },
  {
    id: "cocoa",
    name: "Cocoa",
    mood: "Grounded warmth",
    description: "Cocoa brown that flatters deeper undertones.",
    swatch: "#5C4033",
    field: "#E7DFD6",
    productTint: "#6E4F3F",
  },
];

export const texturePanels: TexturePanel[] = [
  {
    id: "cream",
    title: "Cream",
    caption: "Blendable pigment that melts into skin.",
    tone: "#E8C8C3",
  },
  {
    id: "gloss",
    title: "Gloss",
    caption: "Light-catching surface without stickiness.",
    tone: "#D9A7A5",
  },
  {
    id: "powder",
    title: "Powder",
    caption: "Soft-focus finish that still feels like skin.",
    tone: "#C8A995",
  },
];

export const lookHotspots: LookHotspot[] = [
  { id: "lips", label: "Lips", x: 48, y: 68, productId: "glass-lip" },
  { id: "cheeks", label: "Cheeks", x: 62, y: 52, productId: "soft-blush" },
  { id: "eyes", label: "Eyes", x: 42, y: 38, productId: "ink-liner" },
  { id: "skin", label: "Skin", x: 55, y: 45, productId: "veil-skin-tint" },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export type ShadeMatchInput = {
  tone: "fair" | "light" | "medium" | "tan" | "deep";
  undertone: "cool" | "neutral" | "warm" | "unsure";
};

export function findShadeMatch({ tone, undertone }: ShadeMatchInput) {
  const resolvedUndertone = undertone === "unsure" ? "neutral" : undertone;

  if (tone === "fair" || tone === "light") {
    if (resolvedUndertone === "cool") {
      return {
        shadeName: "Petal",
        productSlug: "soft-blush",
        summary: "Perfect for fair-to-light skin with cool undertones.",
      };
    }
    return {
      shadeName: "Warm Nude",
      productSlug: "soft-blush",
      summary: "Perfect for fair-to-light skin with warm or neutral undertones.",
    };
  }

  if (tone === "medium") {
    if (resolvedUndertone === "cool") {
      return {
        shadeName: "Rosewood",
        productSlug: "soft-blush",
        summary: "Perfect for medium skin with cool undertones.",
      };
    }
    return {
      shadeName: "Warm Nude",
      productSlug: "soft-blush",
      summary: "Perfect for medium skin with warm undertones.",
    };
  }

  if (resolvedUndertone === "cool") {
    return {
      shadeName: "Berry",
      productSlug: "soft-blush",
      summary: `Perfect for ${tone} skin with cool undertones.`,
    };
  }

  return {
    shadeName: "Cocoa",
    productSlug: "soft-blush",
    summary: `Perfect for ${tone} skin with warm undertones.`,
  };
}
