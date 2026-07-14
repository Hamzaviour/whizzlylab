export type PricingTier = {
  name: string;
  range: string;
  features: string;
  delivery: string;
  featured?: boolean;
};

export type InfraFee = {
  name: string;
  range: string;
  note: string;
};

/** Pakistan market website development ranges (Whizzly Lab tiers) */
export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Static Portfolio / Basic Business",
    range: "PKR 15,000 – 60,000",
    features:
      "3–6 pages, contact form, mobile responsive — ideal for freelancers and small service startups",
    delivery: "2–4 weeks",
  },
  {
    name: "Standard Business CMS (WordPress)",
    range: "PKR 40,000 – 150,000",
    features:
      "Dynamic layouts, premium themes, blog, interactive appointment setups",
    delivery: "4–8 weeks",
    featured: true,
  },
  {
    name: "Standard E-commerce Store",
    range: "PKR 80,000 – 350,000",
    features:
      "WooCommerce or Shopify — cart, Easypaisa / JazzCash / bank gateways, basic inventory",
    delivery: "6–14 weeks",
  },
  {
    name: "Enterprise / Custom Web Application",
    range: "PKR 400,000 – 1,500,000+",
    features:
      "React / Node / Magento multi-vendor, ERP linkups, premium dashboards",
    delivery: "12–28+ weeks",
  },
];

/** Annual operational infrastructure (beyond development) */
export const INFRASTRUCTURE_FEES: InfraFee[] = [
  {
    name: "Local domain (.pk)",
    range: "PKR 1,800 – 2,500 / year",
    note: "Often billed ~PKR 3,350–3,600 for a fixed 2-year cycle",
  },
  {
    name: "Global domain (.com)",
    range: "PKR 3,500 – 5,000 / year",
    note: "Standard international registration",
  },
  {
    name: "Shared business hosting",
    range: "PKR 4,500 – 12,000 / year",
    note: "Roughly PKR 375–1,000 / month for low-traffic sites",
  },
  {
    name: "Cloud / VPS hosting",
    range: "PKR 25,000 – 120,000 / year",
    note: "Heavy traffic / e-commerce on AWS, DigitalOcean, etc.",
  },
  {
    name: "SSL certificate",
    range: "PKR 2,500 – 5,000 / year",
    note: "Frequently bundled free by higher-tier hosts",
  },
];

export const PRICING_INTRO_FROM = "PKR 15,000";
export const PRICING_INTRO_TO = "PKR 1,500,000+";
