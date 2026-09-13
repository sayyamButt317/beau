import Link from "next/link";

export const metadata = {
  title: "Checkout",
  description: "Complete your The Beau order.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-paper pb-20 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="container-beau mx-auto max-w-xl">
        <p className="text-sm tracking-[0.22em] text-ink uppercase">The Beau</p>
        <h1 className="mt-4 font-display text-4xl tracking-[-0.02em] text-ink">
          Checkout
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Contact, delivery, and payment stay intentionally calm here. Connect a
          payment provider when you&apos;re ready — bag contents already sync from
          the drawer.
        </p>
        <div className="mt-10 space-y-4 border border-line p-6 text-sm text-ink-soft">
          <p>1. Contact</p>
          <p>2. Delivery</p>
          <p>3. Payment</p>
        </div>
        <Link
          href="/shop"
          className="mt-8 inline-flex min-h-11 items-center border border-line px-5 text-sm tracking-[0.04em] text-ink uppercase transition-colors hover:border-ink/40"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
