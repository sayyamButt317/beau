"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist-store";
import { cn } from "@/lib/cn";

type WishlistButtonProps = {
  productId: string;
  className?: string;
  label?: string;
};

export function WishlistButton({
  productId,
  className,
  label = "Save",
}: WishlistButtonProps) {
  const toggle = useWishlistStore((state) => state.toggle);
  const saved = useWishlistStore((state) => state.has(productId));

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm tracking-[0.06em] text-ink uppercase transition-colors hover:text-rose",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-4 transition-colors duration-200",
          saved && "fill-rose text-rose",
        )}
        strokeWidth={1.75}
      />
      {label}
    </button>
  );
}
