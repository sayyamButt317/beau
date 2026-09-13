"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { texturePanels } from "@/lib/products";

export function TextureShowcase() {
  return (
    <section
      id="texture"
      aria-label="Texture"
      className="bg-paper py-[var(--space-section)]"
    >
      <div className="container-beau mb-10 md:mb-14">
        <Reveal>
          <SectionHeading
            title="The Texture"
            description="Macro detail of cream, gloss, and powder — feel the finish before you buy."
          />
        </Reveal>
      </div>

      <div className="container-beau grid gap-4 md:grid-cols-3 md:gap-5">
        {texturePanels.map((panel, index) => (
          <Reveal key={panel.id} delay={0.08 * index}>
            <figure className="group flex flex-col gap-4">
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ backgroundColor: panel.tone }}
              >
                {/* Abstract macro placeholder — replace with photography/video */}
                <div
                  className="absolute inset-0 opacity-70 mix-blend-multiply transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 30% 28%, rgba(255,255,255,0.55), transparent 42%),
                      radial-gradient(circle at 70% 65%, rgba(23,20,20,0.12), transparent 45%),
                      linear-gradient(160deg, transparent 40%, rgba(23,20,20,0.08))
                    `,
                  }}
                  aria-hidden
                />
                <p className="absolute bottom-4 left-4 text-[0.6875rem] tracking-[0.16em] text-ink/70 uppercase">
                  Placeholder macro
                </p>
              </div>
              <figcaption>
                <p className="font-display text-2xl tracking-[-0.02em] text-ink">
                  {panel.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {panel.caption}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
