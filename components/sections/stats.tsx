import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/lib/site";

export function Stats() {
  return (
    <section className="relative border-y border-line bg-ink-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-14 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i}>
            <div className="px-4 text-center">
              <p className="text-4xl font-extrabold text-gradient md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
