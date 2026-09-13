"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  findShadeMatch,
  type ShadeMatchInput,
} from "@/lib/products";
import { cn } from "@/lib/cn";

const tones: { id: ShadeMatchInput["tone"]; label: string }[] = [
  { id: "fair", label: "Fair" },
  { id: "light", label: "Light" },
  { id: "medium", label: "Medium" },
  { id: "tan", label: "Tan" },
  { id: "deep", label: "Deep" },
];

const undertones: { id: ShadeMatchInput["undertone"]; label: string }[] = [
  { id: "cool", label: "Cool" },
  { id: "neutral", label: "Neutral" },
  { id: "warm", label: "Warm" },
  { id: "unsure", label: "I'm not sure" },
];

type Step = "tone" | "undertone" | "result";

export function FindYourShade() {
  const [step, setStep] = useState<Step>("tone");
  const [tone, setTone] = useState<ShadeMatchInput["tone"] | null>(null);
  const [undertone, setUndertone] =
    useState<ShadeMatchInput["undertone"] | null>(null);

  const match =
    tone && undertone ? findShadeMatch({ tone, undertone }) : null;

  return (
    <section
      id="find-your-shade"
      aria-label="Find your shade"
      className="border border-line bg-paper p-6 md:p-8"
    >
      <p className="text-sm tracking-[0.16em] text-ink-soft uppercase">
        Find your shade
      </p>

      {step === "tone" ? (
        <div className="mt-5">
          <h3 className="font-display text-2xl tracking-[-0.02em] text-ink">
            What&apos;s your skin tone?
          </h3>
          <div className="mt-6 flex flex-wrap gap-3" role="radiogroup" aria-label="Skin tone">
            {tones.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={tone === option.id}
                onClick={() => setTone(option.id)}
                className={cn(
                  "min-h-11 cursor-pointer border px-4 text-sm tracking-[0.04em]",
                  tone === option.id
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink hover:border-ink/40",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <Button
            className="mt-8"
            disabled={!tone}
            onClick={() => setStep("undertone")}
          >
            Next
          </Button>
        </div>
      ) : null}

      {step === "undertone" ? (
        <div className="mt-5">
          <h3 className="font-display text-2xl tracking-[-0.02em] text-ink">
            What&apos;s your undertone?
          </h3>
          <div
            className="mt-6 flex flex-wrap gap-3"
            role="radiogroup"
            aria-label="Undertone"
          >
            {undertones.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={undertone === option.id}
                onClick={() => setUndertone(option.id)}
                className={cn(
                  "min-h-11 cursor-pointer border px-4 text-sm tracking-[0.04em]",
                  undertone === option.id
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink hover:border-ink/40",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary" showArrowOnHover={false} onClick={() => setStep("tone")}>
              Back
            </Button>
            <Button disabled={!undertone} onClick={() => setStep("result")}>
              See match
            </Button>
          </div>
        </div>
      ) : null}

      {step === "result" && match ? (
        <div className="mt-5">
          <p className="text-sm tracking-[0.12em] text-ink-soft uppercase">
            Your match
          </p>
          <h3 className="mt-2 font-display text-3xl tracking-[-0.02em] text-ink">
            {match.shadeName}
          </h3>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
            {match.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/product/${match.productSlug}`}
              className="inline-flex min-h-11 items-center bg-ink px-5 text-sm font-medium tracking-[0.04em] text-paper uppercase transition-colors hover:bg-ink-soft"
            >
              Shop this shade
            </Link>
            <Button
              variant="secondary"
              showArrowOnHover={false}
              onClick={() => {
                setStep("tone");
                setTone(null);
                setUndertone(null);
              }}
            >
              Start over
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
