import { frameUrl } from "../lib/frames";

export interface StoryCallout {
  n: string;
  title: string;
  body: string;
}

export interface ProductStoryData {
  id: string;
  /** Links to a Product in data/menu.ts for price/cart. */
  productId: string;
  eyebrow: string;
  whyLabel: string;
  titleLines: string[];
  lede: string;
  image: string;
  imageAlt: string;
  callouts: StoryCallout[];
  pattern: string;
  build: string[];
  priceNote: string;
}

/**
 * Signature stories. Add another entry + render <ProductStory story={…} />
 * to feature a second product — no component rebuild needed.
 */
export const PANEER_STACK_STORY: ProductStoryData = {
  id: "paneer-stack",
  productId: "the-paneer-stack",
  eyebrow: "Signature / 001",
  whyLabel: "Why it stacks",
  titleLines: ["THE", "PANEER", "STACK."],
  lede: "Grilled paneer, smoked cheese, caramelized onions and our signature smoky sauce, stacked into a brioche bun.",
  image: frameUrl(250),
  imageAlt: "THE PANEER STACK — grilled paneer, smoked cheese and smoky sauce in a toasted brioche bun",
  callouts: [
    { n: "01", title: "Paneer", body: "Grilled until golden." },
    { n: "02", title: "Cheese", body: "Smoked, melted edge to edge." },
    { n: "03", title: "Sauce", body: "Smoky house blend." },
    { n: "04", title: "Bun", body: "Toasted sesame brioche." },
  ],
  pattern: "Crispy / Creamy / Smoky",
  build: ["Paneer", "Cheese", "Onion", "Sauce", "Bun"],
  priceNote: "₹249",
};
