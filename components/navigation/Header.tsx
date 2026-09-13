"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/product", label: "Products" },
  { href: "/shop?category=face", label: "Face" },
  { href: "/shop?category=eyes", label: "Eyes" },
  { href: "/shop?category=lips", label: "Lips" },
  { href: "/shop?category=new", label: "New" },
] as const;

type HeaderProps = {
  transparent?: boolean;
};

export function Header({ transparent = true }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const menuId = useId();
  const openCart = useCartStore((state) => state.open);
  const cartCount = useCartStore((state) => state.count());
  const wishlistCount = useWishlistStore((state) => state.count());

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const solid = !transparent || scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
          solid
            ? "border-b border-line bg-paper/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-beau flex h-[var(--header-h)] items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-10">
            <button
              type="button"
              className="inline-flex size-11 cursor-pointer items-center justify-center text-ink md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <Link
              href="/"
              className="font-sans text-sm font-semibold tracking-[0.22em] text-ink uppercase"
            >
              The Beau
            </Link>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-7 md:flex"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.8125rem] tracking-[0.04em] text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="hidden size-11 cursor-pointer items-center justify-center text-ink sm:inline-flex"
              aria-label="Search"
            >
              <Search className="size-[1.125rem]" strokeWidth={1.75} />
            </button>
            <Link
              href="/wishlist"
              className="relative inline-flex size-11 items-center justify-center text-ink"
              aria-label={
                hydrated && wishlistCount > 0
                  ? `Wishlist, ${wishlistCount} saved`
                  : "Wishlist"
              }
            >
              <Heart className="size-[1.125rem]" strokeWidth={1.75} />
              {hydrated && wishlistCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-rose" />
              ) : null}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex size-11 cursor-pointer items-center justify-center text-ink"
              aria-label={
                hydrated && cartCount > 0 ? `Bag, ${cartCount} items` : "Bag"
              }
            >
              <ShoppingBag className="size-[1.125rem]" strokeWidth={1.75} />
              {hydrated && cartCount > 0 ? (
                <span className="absolute right-1 top-1.5 min-w-4 rounded-full bg-ink px-1 text-center text-[0.625rem] leading-4 text-paper">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id={menuId}
        open={menuOpen}
        links={navLinks}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
