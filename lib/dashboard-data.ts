/* ------------------------------------------------------------------ */
/*  NepalEX Client Dashboard — dummy data, types & formatters          */
/*  All data is deterministic (fixed base date) so SSR + client match. */
/* ------------------------------------------------------------------ */

export type ShipmentStatus =
  | "Pending"
  | "Picked Up"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "On Hold"
  | "Cancelled";

export type ServiceType =
  | "Air Express"
  | "Air Economy"
  | "Sea Cargo"
  | "Domestic";

export type PaymentState = "Paid" | "Unpaid";

export interface Shipment {
  id: string; // AWB
  recipient: string;
  company?: string;
  origin: string;
  destination: string;
  country: string;
  service: ServiceType;
  status: ShipmentStatus;
  date: string; // ISO
  eta: string; // ISO
  weight: number; // kg
  pieces: number;
  cost: number; // NPR
  payment: PaymentState;
}

export interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  shipmentId: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue";
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: "Bank Transfer" | "eSewa" | "Khalti" | "Cash" | "Card";
  invoiceId: string;
  status: "Success" | "Pending" | "Failed";
}

export interface Pickup {
  id: string;
  date: string;
  window: string;
  address: string;
  contact: string;
  items: number;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export interface AddressBookEntry {
  id: string;
  label: string;
  name: string;
  phone: string;
  line: string;
  city: string;
  country: string;
  type: "Sender" | "Receiver";
  isDefault: boolean;
}

export interface Notification {
  id: string;
  kind: "shipment" | "billing" | "system" | "promo";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: "Open" | "Pending" | "Resolved";
  priority: "Low" | "Medium" | "High";
  updated: string;
  messages: number;
}

/* ----------------------------- helpers ---------------------------- */

const BASE = new Date("2026-05-29T10:00:00Z").getTime();
const DAY = 86_400_000;

function shift(days: number): string {
  return new Date(BASE + days * DAY).toISOString();
}

export function formatNPR(n: number): string {
  return "Rs. " + n.toLocaleString("en-IN");
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function relativeTime(iso: string): string {
  const diff = Math.round((new Date(iso).getTime() - BASE) / DAY);
  if (diff === 0) return "Today";
  if (diff === -1) return "Yesterday";
  if (diff < 0) return `${-diff}d ago`;
  if (diff === 1) return "Tomorrow";
  return `in ${diff}d`;
}

/** Tailwind class fragments per status / state. */
export const statusStyles: Record<string, string> = {
  // shipment
  Delivered: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "In Transit": "bg-sky-500/15 text-sky-400 border-sky-500/30",
  "Out for Delivery": "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  "Picked Up": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "On Hold": "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Cancelled: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  // payment / invoice
  Paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Unpaid: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Overdue: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  Success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Failed: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  // pickup
  Scheduled: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  // ticket
  Open: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  // priority
  High: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Low: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

export function statusClass(s: string): string {
  return (
    statusStyles[s] ?? "bg-slate-500/15 text-slate-300 border-slate-500/30"
  );
}

/* ----------------------------- seed data -------------------------- */

const RECIPIENTS = [
  "Aarav Sharma", "Sita Gurung", "Bishal Thapa", "Anjali Rai", "Prakash KC",
  "Maya Tamang", "Rajesh Adhikari", "Nisha Shrestha", "Kiran Bhandari",
  "Deepak Magar", "Sunita Lama", "Hari Poudel", "Global Tex Ltd",
  "Himalaya Crafts", "Everest Imports", "Sagarmatha Foods", "Lumbini Traders",
  "Annapurna Exports", "Pokhara Handlooms", "Kathmandu Threads",
];

const ROUTES: { dest: string; country: string }[] = [
  { dest: "New York", country: "USA" },
  { dest: "London", country: "UK" },
  { dest: "Dubai", country: "UAE" },
  { dest: "Sydney", country: "Australia" },
  { dest: "Tokyo", country: "Japan" },
  { dest: "Delhi", country: "India" },
  { dest: "Toronto", country: "Canada" },
  { dest: "Frankfurt", country: "Germany" },
  { dest: "Singapore", country: "Singapore" },
  { dest: "Doha", country: "Qatar" },
  { dest: "Pokhara", country: "Nepal" },
  { dest: "Biratnagar", country: "Nepal" },
];

const SERVICES: ServiceType[] = [
  "Air Express", "Air Economy", "Sea Cargo", "Domestic",
];

const STATUSES: ShipmentStatus[] = [
  "Delivered", "In Transit", "Out for Delivery", "Picked Up",
  "Pending", "On Hold", "Cancelled", "Delivered", "In Transit", "Delivered",
];

function makeShipments(): Shipment[] {
  const out: Shipment[] = [];
  for (let i = 0; i < 32; i++) {
    const route = ROUTES[i % ROUTES.length];
    const service =
      route.country === "Nepal" ? "Domestic" : SERVICES[i % 3];
    const status = STATUSES[i % STATUSES.length];
    const weight = Math.round((1 + (i % 9) * 1.7) * 10) / 10;
    const pieces = 1 + (i % 4);
    const base = service === "Sea Cargo" ? 320 : service === "Domestic" ? 140 : 1450;
    const cost = Math.round((600 + base * weight) / 10) * 10;
    out.push({
      id: `NPX${(20480 - i).toString().padStart(6, "0")}`,
      recipient: RECIPIENTS[i % RECIPIENTS.length],
      company: i % 5 === 0 ? "Business Account" : undefined,
      origin: "Kathmandu, NP",
      destination: route.dest,
      country: route.country,
      service,
      status,
      date: shift(-i * 2 - (i % 3)),
      eta: shift(-i * 2 + 5),
      weight,
      pieces,
      cost,
      payment: status === "Cancelled" ? "Unpaid" : i % 4 === 0 ? "Unpaid" : "Paid",
    });
  }
  return out;
}

export const shipments: Shipment[] = makeShipments();

export const invoices: Invoice[] = shipments
  .filter((_, i) => i % 2 === 0)
  .map((s, i) => ({
    id: `INV-${(9120 - i).toString()}`,
    date: s.date,
    dueDate: shift(-i * 4 + 10),
    shipmentId: s.id,
    amount: s.cost,
    status:
      s.payment === "Paid" ? "Paid" : i % 3 === 0 ? "Overdue" : "Unpaid",
  }));

export const payments: Payment[] = invoices
  .filter((inv) => inv.status === "Paid")
  .map((inv, i) => ({
    id: `PAY-${(7710 - i).toString()}`,
    date: inv.date,
    amount: inv.amount,
    method: (["Bank Transfer", "eSewa", "Khalti", "Card", "Cash"] as const)[
      i % 5
    ],
    invoiceId: inv.id,
    status: (["Success", "Success", "Pending", "Success", "Failed"] as const)[
      i % 5
    ],
  }));

export const pickups: Pickup[] = Array.from({ length: 9 }, (_, i) => ({
  id: `PU-${(3050 - i).toString()}`,
  date: shift(-i * 3 + 2),
  window: (["09:00 – 12:00", "12:00 – 15:00", "15:00 – 18:00"] as const)[i % 3],
  address: [
    "Thamel, Kathmandu", "Lalitpur, Patan", "Baneshwor, Kathmandu",
    "Bhaktapur Durbar Sq.", "Maharajgunj, KTM", "Kalanki, Kathmandu",
  ][i % 6],
  contact: RECIPIENTS[i % RECIPIENTS.length],
  items: 1 + (i % 5),
  status: (["Scheduled", "Completed", "Completed", "Cancelled", "Scheduled"] as const)[
    i % 5
  ],
}));

export const addressBook: AddressBookEntry[] = [
  { id: "AD-1", label: "Head Office", name: "NepalEX Co.", phone: "+977-9851148010", line: "Tinkune, Subidhanagar", city: "Kathmandu", country: "Nepal", type: "Sender", isDefault: true },
  { id: "AD-2", label: "Warehouse", name: "NepalEX Cargo", phone: "+977-9801010101", line: "Balkumari Industrial Rd", city: "Lalitpur", country: "Nepal", type: "Sender", isDefault: false },
  { id: "AD-3", label: "John Carter", name: "John Carter", phone: "+1-212-555-0188", line: "5th Avenue, Manhattan", city: "New York", country: "USA", type: "Receiver", isDefault: false },
  { id: "AD-4", label: "Emma Wilson", name: "Emma Wilson", phone: "+44-20-7946-0991", line: "221B Baker Street", city: "London", country: "UK", type: "Receiver", isDefault: false },
  { id: "AD-5", label: "Al Maktoum LLC", name: "Al Maktoum", phone: "+971-4-555-2210", line: "Sheikh Zayed Rd", city: "Dubai", country: "UAE", type: "Receiver", isDefault: false },
  { id: "AD-6", label: "Pokhara Branch", name: "NepalEX Pokhara", phone: "+977-9856020202", line: "Lakeside, Ward 6", city: "Pokhara", country: "Nepal", type: "Sender", isDefault: false },
];

export const notifications: Notification[] = [
  { id: "N1", kind: "shipment", title: "Shipment delivered", message: "NPX020480 to New York was delivered and signed for.", time: shift(0), read: false },
  { id: "N2", kind: "billing", title: "Invoice due soon", message: "Invoice INV-9120 of Rs. 21,450 is due in 3 days.", time: shift(0), read: false },
  { id: "N3", kind: "shipment", title: "Out for delivery", message: "NPX020478 is out for delivery in London.", time: shift(-1), read: false },
  { id: "N4", kind: "system", title: "New rate card", message: "Updated Gulf zone rates are now in effect.", time: shift(-1), read: true },
  { id: "N5", kind: "shipment", title: "Pickup scheduled", message: "Pickup PU-3050 confirmed for 09:00–12:00.", time: shift(-2), read: true },
  { id: "N6", kind: "promo", title: "Festive discount", message: "Get 12% off air express shipments this Dashain.", time: shift(-3), read: true },
  { id: "N7", kind: "billing", title: "Payment received", message: "We received Rs. 18,300 via eSewa for INV-9116.", time: shift(-4), read: true },
];

export const tickets: Ticket[] = [
  { id: "TK-2041", subject: "Customs hold on NPX020466", category: "Customs", status: "Open", priority: "High", updated: shift(0), messages: 4 },
  { id: "TK-2039", subject: "Update receiver phone number", category: "Shipment", status: "Pending", priority: "Medium", updated: shift(-1), messages: 2 },
  { id: "TK-2034", subject: "Invoice INV-9108 clarification", category: "Billing", status: "Resolved", priority: "Low", updated: shift(-5), messages: 6 },
  { id: "TK-2030", subject: "Bulk pickup request", category: "Pickup", status: "Resolved", priority: "Medium", updated: shift(-8), messages: 3 },
];

/* --------------------------- analytics ---------------------------- */

export const monthlyVolume = [
  { label: "Dec", shipments: 142, spend: 386000 },
  { label: "Jan", shipments: 168, spend: 441000 },
  { label: "Feb", shipments: 156, spend: 402000 },
  { label: "Mar", shipments: 201, spend: 528000 },
  { label: "Apr", shipments: 224, spend: 610000 },
  { label: "May", shipments: 248, spend: 672000 },
];

export const statusDistribution = [
  { label: "Delivered", value: 64, color: "#34d399" },
  { label: "In Transit", value: 21, color: "#38bdf8" },
  { label: "Pending", value: 9, color: "#fbbf24" },
  { label: "Cancelled", value: 6, color: "#fb7185" },
];

export const topDestinations = [
  { label: "USA", value: 312 },
  { label: "UK", value: 244 },
  { label: "UAE", value: 198 },
  { label: "Australia", value: 156 },
  { label: "India", value: 132 },
  { label: "Japan", value: 88 },
];

export const weeklyActivity = [
  { label: "Mon", value: 18 },
  { label: "Tue", value: 24 },
  { label: "Wed", value: 31 },
  { label: "Thu", value: 27 },
  { label: "Fri", value: 36 },
  { label: "Sat", value: 22 },
  { label: "Sun", value: 12 },
];

/* ----------------------------- lookups ---------------------------- */

export function getShipment(id: string): Shipment | undefined {
  return shipments.find((s) => s.id.toLowerCase() === id.toLowerCase());
}

export const STATUS_OPTIONS: ShipmentStatus[] = [
  "Pending", "Picked Up", "In Transit", "Out for Delivery", "Delivered",
  "On Hold", "Cancelled",
];

export const SERVICE_OPTIONS: ServiceType[] = [
  "Air Express", "Air Economy", "Sea Cargo", "Domestic",
];

export const trackingStages: { status: ShipmentStatus; label: string }[] = [
  { status: "Pending", label: "Order received" },
  { status: "Picked Up", label: "Picked up" },
  { status: "In Transit", label: "In transit" },
  { status: "Out for Delivery", label: "Out for delivery" },
  { status: "Delivered", label: "Delivered" },
];
