import Link from "next/link";
import { PackageCheck, Mail, Phone, Clock, MapPin } from "lucide-react";
import { nav, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-ink-soft">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-ink">
                <PackageCheck className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="text-xl font-extrabold">
                Nepal<span className="text-gradient">EX</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.legalName}. {site.tagline} — fast, reliable, worldwide since{" "}
              {site.since}.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-cream">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-brand-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-cream">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/services"
                    className="text-sm text-muted transition-colors hover:text-brand-2"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-cream">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-2" />
                <a href={`tel:${site.phone}`} className="hover:text-cream">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-2" />
                <div className="flex flex-col">
                  {site.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="hover:text-cream">
                      {e}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-2" />
                {site.hours}
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-2" />
                {site.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
          <p>
            © {site.since}–{new Date().getFullYear()} {site.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-cream">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-cream">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
