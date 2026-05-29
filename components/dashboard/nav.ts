import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Truck,
  Radar,
  Receipt,
  CreditCard,
  BookUser,
  Calculator,
  BarChart3,
  Bell,
  LifeBuoy,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const dashboardNav: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/client", icon: LayoutDashboard },
      { label: "Analytics", href: "/client/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Shipping",
    items: [
      { label: "Shipments", href: "/client/shipments", icon: Package },
      { label: "New Shipment", href: "/client/create", icon: PlusCircle },
      { label: "Pickups", href: "/client/pickups", icon: Truck },
      { label: "Tracking", href: "/client/tracking", icon: Radar },
      { label: "Rate Calculator", href: "/client/rates", icon: Calculator },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Invoices", href: "/client/billing", icon: Receipt },
      { label: "Payments", href: "/client/payments", icon: CreditCard },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Address Book", href: "/client/addresses", icon: BookUser },
      { label: "Notifications", href: "/client/notifications", icon: Bell, badge: "3" },
      { label: "Support", href: "/client/support", icon: LifeBuoy },
      { label: "Settings", href: "/client/settings", icon: Settings },
    ],
  },
];
