import {
  Package,
  Plane,
  Ship,
  ShoppingCart,
  Truck,
  FileCheck,
  Trophy,
  Clock,
  ShieldCheck,
  BadgePercent,
} from "lucide-react";

export const site = {
  name: "NepalEX",
  legalName: "Nepal Express Parcel and Logistics Pvt. Ltd.",
  tagline: "Nepal's Number 1 Courier & Logistics Network",
  since: 2012,
  phone: "+977-9851148010",
  emails: ["cs@nepalex.com", "expressmela@gmail.com"],
  hours: "Sunday – Friday / 10:00 AM – 7:00 PM",
  address: "Kathmandu, Nepal",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Rate Calculator", href: "/rate-calculator" },
  { label: "Track", href: "/track" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: 9, suffix: "+", label: "Years of expertise" },
  { value: 1, suffix: "M+", label: "Shipments delivered" },
  { value: 220, suffix: "+", label: "Destinations served" },
  { value: 99, suffix: "%", label: "On-time delivery" },
];

export const services = [
  {
    slug: "parcels",
    icon: Package,
    title: "Parcels",
    desc: "Transportation by postal systems, express mail companies, private couriers and LTL carriers — fast and tracked, doorstep to doorstep.",
  },
  {
    slug: "air-cargo",
    icon: Plane,
    title: "Air Cargo",
    desc: "Shipment of goods via air transportation, often on dedicated cargo aircraft, for time-critical freight worldwide.",
  },
  {
    slug: "sea-cargo",
    icon: Ship,
    title: "Sea Cargo",
    desc: "Shipment of goods via sea transportation on cargo and freight ships — the economical choice for heavy, bulk consignments.",
  },
  {
    slug: "ecommerce-logistics",
    icon: ShoppingCart,
    title: "Ecommerce Logistics",
    desc: "Fast, worldwide courier service from pickup to delivery for easy global shipping, built for online sellers.",
  },
  {
    slug: "import-export",
    icon: Truck,
    title: "Import / Export",
    desc: "End-to-end door-to-door and airport-to-airport handling for your international import and export shipments.",
  },
  {
    slug: "customs-clearance",
    icon: FileCheck,
    title: "Customs Clearance",
    desc: "Expert customs documentation and clearance so your consignments move across borders without delays.",
  },
];

export const whyChooseUs = [
  {
    icon: Trophy,
    title: "#1 Service Provider",
    desc: "Currently Nepal's number one courier service provider, with the largest volume of shipments in the country.",
  },
  {
    icon: Clock,
    title: "9+ Years of Experience",
    desc: "More than nine years in the field — one of the oldest and most trusted service providers in Nepal.",
  },
  {
    icon: ShieldCheck,
    title: "Fast & Reliable",
    desc: "Providing fast and reliable service since 2012. We take care of every consignment seriously.",
  },
  {
    icon: BadgePercent,
    title: "Best Deals",
    desc: "We provide the best deals among the competition — because we genuinely care about our customers.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Request a pickup",
    desc: "Book online in minutes — tell us what, where, and when. Personal or business account.",
  },
  {
    n: "02",
    title: "We collect & process",
    desc: "Our network picks up your parcel, weighs, documents and prepares it for the fastest route.",
  },
  {
    n: "03",
    title: "Customs & dispatch",
    desc: "We handle clearance and dispatch by air, sea or road to your chosen destination.",
  },
  {
    n: "04",
    title: "Track to doorstep",
    desc: "Follow your shipment live with a tracking number, right up to confirmed delivery.",
  },
];

export const faqs = [
  {
    q: "What areas do you deliver to?",
    a: "We provide both domestic delivery across Nepal and international shipping to 220+ destinations worldwide via air and sea freight.",
  },
  {
    q: "How do I get a price estimate?",
    a: "Use our Rate Calculator — choose a service provider and destination, enter the weight, and get an instant estimated rate.",
  },
  {
    q: "Can I open a business account?",
    a: "Yes. We support both personal and business accounts. Business accounts can register with a company name and PAN number for invoicing.",
  },
  {
    q: "How can I track my shipment?",
    a: "Every shipment receives a tracking number. Enter it on our Track page to see live status from pickup to delivery.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfer and other arrangements. Billing details are confirmed when your shipment request is processed.",
  },
];
