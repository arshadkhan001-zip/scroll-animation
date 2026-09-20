import { frameUrl } from "../lib/frames";

export type Category = "burgers" | "sides" | "drinks" | "combos" | "desserts";

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  ingredients: string[];
  price: number;
  /** Runtime still path (film frame) or undefined = type-only row. */
  image?: string;
  vegetarian: boolean;
  featured?: boolean;
  tag?: "SIGNATURE" | "SPICY" | "NEW";
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "burgers", label: "Burgers" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
  { id: "combos", label: "Combos" },
  { id: "desserts", label: "Desserts" },
];

const still = (n: number) => frameUrl(n);

export const PRODUCTS: Product[] = [
  // ——— BURGERS ———
  {
    id: "the-original",
    name: "THE ORIGINAL",
    category: "burgers",
    description: "The one everything else is measured against.",
    ingredients: ["Crispy vegetable patty", "American-style cheese", "Caramelized onions", "House sauce", "Brioche bun"],
    price: 199,
    image: still(220),
    vegetarian: true,
    featured: true,
    tag: "SIGNATURE",
  },
  {
    id: "the-fire",
    name: "THE FIRE",
    category: "burgers",
    description: "Heat that builds, never shouts.",
    ingredients: ["Spicy vegetable patty", "Pepper jack-style cheese", "Jalapeños", "Crispy onions", "Fire sauce"],
    price: 229,
    image: still(190),
    vegetarian: true,
    tag: "SPICY",
  },
  {
    id: "the-crunch",
    name: "THE CRUNCH",
    category: "burgers",
    description: "Potato, corn, and an audible crust.",
    ingredients: ["Crispy potato & corn patty", "Cheddar", "Lettuce", "Pickles", "Signature sauce"],
    price: 209,
    image: still(140),
    vegetarian: true,
  },
  {
    id: "the-paneer-stack",
    name: "THE PANEER STACK",
    category: "burgers",
    description: "Grilled paneer, smoked cheese, zero restraint.",
    ingredients: ["Grilled paneer", "Smoked cheese", "Caramelized onions", "Lettuce", "Smoky sauce"],
    price: 249,
    image: still(250),
    vegetarian: true,
    featured: true,
    tag: "SIGNATURE",
  },
  {
    id: "the-double-veg",
    name: "THE DOUBLE VEG",
    category: "burgers",
    description: "Two patties. Twice the intent.",
    ingredients: ["Double crispy vegetable patties", "Double cheese", "Grilled onions", "Stacked sauce"],
    price: 279,
    image: still(308),
    vegetarian: true,
  },
  {
    id: "mushroom-melt",
    name: "MUSHROOM MELT",
    category: "burgers",
    description: "Fire-grilled mushrooms under a Swiss-style blanket.",
    ingredients: ["Grilled mushrooms", "Swiss-style cheese", "Caramelized onions", "Creamy sauce"],
    price: 249,
    image: still(130),
    vegetarian: true,
  },
  {
    id: "tandoori-paneer",
    name: "TANDOORI PANEER",
    category: "burgers",
    description: "Charred, spiced, cooled with mint.",
    ingredients: ["Tandoori paneer", "Onion", "Lettuce", "Mint sauce", "Creamy tandoori sauce"],
    price: 239,
    image: still(100),
    vegetarian: true,
    tag: "NEW",
  },
  {
    id: "cheesy-masala",
    name: "CHEESY MASALA",
    category: "burgers",
    description: "Masala spice, double cheese, jalapeño spark.",
    ingredients: ["Spiced potato patty", "Double cheese", "Jalapeños", "Masala sauce"],
    price: 229,
    image: still(280),
    vegetarian: true,
    tag: "SPICY",
  },
  // ——— SIDES ———
  {
    id: "stacked-fries",
    name: "STACKED FRIES",
    category: "sides",
    description: "Twice-cooked, sea salt, sear dust.",
    ingredients: ["Potato", "Sea salt", "Sear dust"],
    price: 129,
    vegetarian: true,
  },
  {
    id: "peri-peri-fries",
    name: "PERI-PERI FRIES",
    category: "sides",
    description: "Fiery dust, cooling mayo alongside.",
    ingredients: ["Potato", "Peri-peri spice", "Cooling mayo"],
    price: 149,
    vegetarian: true,
    tag: "SPICY",
  },
  {
    id: "loaded-cheese-fries",
    name: "LOADED CHEESE FRIES",
    category: "sides",
    description: "Cheese sauce, burnt onion, pickles.",
    ingredients: ["Fries", "Cheese sauce", "Burnt onion", "Pickles"],
    price: 179,
    vegetarian: true,
    tag: "SIGNATURE",
  },
  {
    id: "crispy-potato-bites",
    name: "CRISPY POTATO BITES",
    category: "sides",
    description: "Golden, poppable, dangerously shareable.",
    ingredients: ["Potato", "Crisp coating", "Stacked salt"],
    price: 119,
    vegetarian: true,
  },
  {
    id: "onion-rings",
    name: "ONION RINGS",
    category: "sides",
    description: "Beer-battered, stacked sauce for dunking.",
    ingredients: ["Onion", "Beer batter", "Stacked sauce"],
    price: 139,
    vegetarian: true,
  },
  {
    id: "mozzarella-sticks",
    name: "MOZZARELLA STICKS",
    category: "sides",
    description: "Molten core, herb crumb.",
    ingredients: ["Mozzarella", "Herb crumb", "Marinara"],
    price: 169,
    vegetarian: true,
  },
  // ——— DRINKS ———
  {
    id: "classic-cola",
    name: "CLASSIC COLA",
    category: "drinks",
    description: "Ice-cold, over crushed ice.",
    ingredients: ["Cola", "Crushed ice"],
    price: 79,
    vegetarian: true,
  },
  {
    id: "lemon-fizz",
    name: "LEMON FIZZ",
    category: "drinks",
    description: "Charred lemon, soda, sea salt.",
    ingredients: ["Lemon", "Soda", "Sea salt"],
    price: 99,
    vegetarian: true,
  },
  {
    id: "iced-tea",
    name: "ICED TEA",
    category: "drinks",
    description: "Slow-brewed, light peach.",
    ingredients: ["Black tea", "Peach", "Ice"],
    price: 99,
    vegetarian: true,
  },
  {
    id: "mint-cooler",
    name: "MINT COOLER",
    category: "drinks",
    description: "Crushed mint, lime, soda.",
    ingredients: ["Mint", "Lime", "Soda"],
    price: 109,
    vegetarian: true,
  },
  {
    id: "mango-fizz",
    name: "MANGO FIZZ",
    category: "drinks",
    description: "Alphonso pulp, sparkling lift.",
    ingredients: ["Mango", "Soda", "Ice"],
    price: 119,
    vegetarian: true,
  },
  {
    id: "chocolate-shake",
    name: "CHOCOLATE SHAKE",
    category: "drinks",
    description: "Dark cocoa, vanilla soft-serve base.",
    ingredients: ["Cocoa", "Milk", "Soft serve"],
    price: 149,
    vegetarian: true,
  },
  // ——— COMBOS ———
  {
    id: "stacked-combo",
    name: "THE STACKED COMBO",
    category: "combos",
    description: "Any veg signature + fries + drink. The full film.",
    ingredients: ["Any veg signature burger", "Stacked fries", "Drink of choice"],
    price: 349,
    image: still(250),
    vegetarian: true,
    tag: "SIGNATURE",
  },
  // ——— DESSERTS ———
  {
    id: "chocolate-brownie",
    name: "CHOCOLATE BROWNIE",
    category: "desserts",
    description: "Dense, dark, sea-salted.",
    ingredients: ["Dark chocolate", "Sea salt"],
    price: 99,
    vegetarian: true,
  },
  {
    id: "brownie-ice-cream",
    name: "BROWNIE + ICE CREAM",
    category: "desserts",
    description: "Warm brownie, cold vanilla.",
    ingredients: ["Brownie", "Vanilla ice cream"],
    price: 149,
    vegetarian: true,
    tag: "SIGNATURE",
  },
  {
    id: "vanilla-soft-serve",
    name: "VANILLA SOFT SERVE",
    category: "desserts",
    description: "Slow-churned, impossibly smooth.",
    ingredients: ["Milk", "Vanilla bean"],
    price: 89,
    vegetarian: true,
  },
];

export const inr = (n: number) => `₹${n}`;
