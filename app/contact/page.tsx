import type { Metadata } from "next";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with NepalEX. Call, email or send us a message — we're here to help with all your courier and cargo needs.",
};

export default function ContactPage() {
  const details = [
    { icon: Phone, label: "Call us", value: site.phone, href: `tel:${site.phone}` },
    { icon: Mail, label: "Email us", value: site.emails.join("  ·  "), href: `mailto:${site.emails[0]}` },
    { icon: Clock, label: "Working hours", value: site.hours },
    { icon: MapPin, label: "Visit us", value: site.address },
  ];

  return (
    <>
      <PageHeader
        eyebrow="We are here"
        title={
          <>
            Let&apos;s get your <span className="text-gradient">shipment moving</span>
          </>
        }
        subtitle="Questions, quotes or partnerships — our team is ready to help."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="space-y-4">
          {details.map((d, i) => (
            <Reveal key={d.label} delay={i}>
              <div className="flex items-start gap-4 rounded-2xl border border-line bg-ink-card p-6">
                <span className="brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ink">
                  <d.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="mt-1 block font-semibold transition-colors hover:text-brand-2"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-semibold">{d.value}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1}>
          <ContactForm />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">
          Frequently asked <span className="text-gradient">questions</span>
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i}>
              <details className="group rounded-2xl border border-line bg-ink-card p-6 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between font-semibold marker:content-['']">
                  {f.q}
                  <span className="text-brand-2 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
