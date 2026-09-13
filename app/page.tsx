import { BeautyHero } from "@/components/Client/hero/BeautyHero";
import { NewDropRail } from "@/components/Client/editorial/NewDropRail";
import { BestSellers } from "@/components/Client/editorial/BestSellers";
import { ShadeWorld } from "@/components/Client/immersive/ShadeWorld";
import { TextureShowcase } from "@/components/Client/immersive/TextureShowcase";
import { ExplodedProduct } from "@/components/Client/immersive/ExplodedProduct";
import { ShopTheLook } from "@/components/Client/immersive/ShopTheLook";

/**
 * Home: campaign hero → immersive story → commerce best sellers.
 */
export default function Home() {
  return (
    <div className="bg-paper">
      <BeautyHero />
      <NewDropRail />
      <ShadeWorld />
      <TextureShowcase />
      <ExplodedProduct />
      <ShopTheLook />
      <BestSellers />
    </div>
  );
}
