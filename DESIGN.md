# THE BEAU — Immersive Beauty Commerce Design System

> **Project:** The Beau — makeup / beauty e-commerce  
> **Design direction:** Editorial beauty + tactile cosmetics + cinematic product interaction  
> **Experience goal:** The visitor should feel like they have entered a beauty campaign, not a conventional online store.

---

## 1. Core Creative Direction

The website should feel **2025/2026 luxury beauty commerce**: cinematic, tactile, editorial, feminine without becoming overly pink, and highly interactive without becoming a technology demo.

The key idea:

> **Don't make the user browse a catalogue. Make the user discover beauty.**

The site should communicate:

- premium
- curated
- sensual
- modern
- confident
- tactile
- trustworthy
- social-first
- product-obsessed

Avoid the common "beauty Shopify template" look:

- no generic product-card grid as the first experience
- no huge pink gradient
- no excessive rounded cards
- no random glassmorphism
- no 15 different animations happening simultaneously
- no generic SaaS-style navigation
- no overuse of serif typography
- no stock-photo-looking hero
- no giant "SHOP NOW" button floating over everything

---

# 2. Brand Feeling

## The emotional sequence

The first visit should feel like:

**Intrigue → Touch → Discovery → Desire → Confidence → Purchase**

### 0–2 seconds

The user sees one beautiful product / campaign image and immediately understands:

> This is a serious beauty brand.

### 2–5 seconds

The product responds to scrolling or cursor movement.

Packaging rotates / moves / reveals texture.

### 5–15 seconds

The user begins discovering shades, finishes, ingredients, looks and social proof.

### 15–30 seconds

The website starts behaving like a digital beauty editorial.

Products are shown in context rather than as isolated SKU cards.

### Conversion moment

The user should feel:

> "I know exactly what this will look/feel like. I want it."

---

# 3. Visual Language

## Primary aesthetic

**Editorial Beauty × Cinematic Product Photography × Interactive 3D**

Think:

- luxury cosmetics campaign
- fashion magazine
- high-end product film
- tactile packaging
- clean e-commerce usability
- subtle futuristic interaction

Not:

- futuristic neon
- cyberpunk
- generic luxury black/gold
- pastel Instagram template

---

# 4. Color System

Use a restrained palette.

```css
--ink: #171414;
--ink-soft: #3A3534;

--paper: #F7F4EF;
--paper-warm: #EFE8DF;

--rose: #B96C73;
--rose-soft: #D9A7A5;

--nude: #C8A995;
--blush: #E8C8C3;

--white: #FFFFFF;
--line: rgba(23, 20, 20, 0.14);
```

### Rules

The primary interface should NOT be pink.

Use:

- warm off-white as the main canvas
- near-black for typography
- muted rose as an accent
- nude / blush only inside product imagery and selected interactions

The products themselves should supply most of the color.

---

# 5. Typography

Use typography as part of the brand identity.

## Recommended

### Display

**Cormorant Garamond**
or
**DM Serif Display**

Use for:

- campaign headlines
- product statements
- editorial moments

### UI / Body

**Manrope**
or
**Satoshi**
or
**Geist**

Use for:

- navigation
- product information
- prices
- buttons
- filters
- descriptions

### Important

Do not use the display serif everywhere.

Example:

```text
THE ART OF
EVERYDAY BEAUTY
```

Display typography should feel editorial.

Body typography should feel extremely clean.

---

# 6. Navigation

The navigation should be minimal.

Desktop:

```text
THE BEAU

Shop     Face     Eyes     Lips     New

                         Search   ♡   Bag
```

Use a transparent navigation over the hero.

As the user scrolls:

- navigation becomes warm white
- subtle blur
- thin bottom border
- logo remains stable
- no huge sticky header

Mobile:

```text
☰     THE BEAU     ♡   Bag
```

Navigation should feel like part of the campaign rather than website chrome.

---

# 7. Hero Experience

## Do NOT build a normal hero

Avoid:

```text
Big image
Big heading
Shop Now
```

Instead create a **product reveal scene**.

### Concept

A full viewport composition.

```text
┌──────────────────────────────────────────────────────────┐
│ THE BEAU                         Search   ♡   Bag         │
│                                                          │
│                 [floating product]                       │
│                                                          │
│       BEAUTY, BUT                      ┌──────────────┐  │
│       MAKE IT YOURS                    │ product info │  │
│                                        │              │  │
│       Discover the                     │ SHOP NOW     │  │
│       new collection                   └──────────────┘  │
│                                                          │
│                 ↓ SCROLL TO DISCOVER                     │
└──────────────────────────────────────────────────────────┘
```

### Hero animation

On page load:

1. background enters softly
2. product appears slightly oversized
3. product moves into its final position
4. typography reveals in two stages
5. CTA appears last
6. tiny ambient movement continues

Do NOT animate every element independently.

The hero should feel like one directed scene.

---

# 8. Signature Interaction: Exploded Product View

This is the site's main memorable interaction.

When the user enters a featured product:

```text
                  CAP
                   ↑
                   │
                   │
          ┌───────────────┐
          │     BODY      │
          └───────────────┘
                   │
                   ↓
                FORMULA
```

The product can visually separate into:

- cap
- applicator
- container
- formula
- shade
- packaging

As the user scrolls:

### Stage 01 — Product

The complete product.

### Stage 02 — Open

The cap separates.

### Stage 03 — Formula

The formula / pigment becomes visible.

### Stage 04 — Shade

The shade spreads across the screen.

### Stage 05 — Application

The product transitions into an actual beauty look.

### Stage 06 — Purchase

The product returns together and the CTA appears.

---

# 9. 3D Strategy

Use 3D only where it adds meaning.

Preferred stack:

- Three.js
- React Three Fiber
- @react-three/drei
- GSAP or Motion for surrounding UI
- GLTF / GLB assets
- compressed textures
- Draco compression where appropriate

If real 3D assets are not available, create the effect with:

- layered transparent PNG/WebP assets
- CSS transforms
- masked product images
- parallax
- scale/rotation
- controlled scroll progress

Do NOT create a fake 3D experience that looks worse than a high-quality 2D product image.

---

# 10. Scroll Storytelling

The website should be structured as a visual story.

## Section 01 — Campaign

Full-screen hero.

## Section 02 — New Drop

A horizontal product movement.

```text
NEW DROP

        product 01      product 02      product 03
             →               →               →
```

Products should feel like objects in a fashion editorial.

## Section 03 — Shade World

Large color field.

Example:

```text
YOUR SHADE.
YOUR MOOD.

     nude        rose        berry        cocoa
```

Hovering a shade changes:

- background
- product color
- model/look
- small descriptive copy

## Section 04 — The Texture

Show the actual texture.

Examples:

- cream spreading
- powder particles
- glossy lip surface
- pigment swatch
- shimmer catching light

Use macro photography/video where possible.

## Section 05 — Shop the Look

Show a finished makeup look.

Hotspots appear over:

- lips
- cheeks
- eyes
- skin

Clicking a hotspot opens the relevant product.

## Section 06 — Best Sellers

Now use conventional commerce UI.

This is where product cards become useful.

## Section 07 — Social Proof

Instagram-style editorial feed.

Avoid a basic 3-column grid.

Use asymmetric masonry.

## Section 08 — Brand Story

A calm editorial section.

Large image + short story.

## Section 09 — Final Conversion

Minimal.

```text
FIND YOUR NEXT FAVORITE.

Explore the collection

[ SHOP MAKEUP ]
```

---

# 11. Product Cards

Cards should not look like SaaS cards.

No:

```text
┌─────────────┐
│ image       │
│             │
├─────────────┤
│ Product     │
│ description │
│ Rs. 2,999   │
│ Add to cart │
└─────────────┘
```

Instead:

```text
┌─────────────────────────┐
│                         │
│                         │
│       PRODUCT           │
│                         │
│                         │
│                         │
│                         │
└─────────────────────────┘

PRODUCT NAME
finish / shade

Rs. 2,999                         +
```

On hover:

- product slightly enlarges
- second image appears
- shade information appears
- quick-add control slides in
- no giant overlay

---

# 12. Product Detail Page

Product detail should feel like a mini campaign.

### Above the fold

Left:

Large product image / interactive model.

Right:

```text
THE BEAU

PRODUCT NAME

A short, beautiful product description.

Rs. 3,200

Shade
○ ○ ● ○ ○ ○

Finish
DEWY

Quantity
−  1  +

[ ADD TO BAG ]

♡ SAVE

Free delivery over Rs. X
Cash on delivery available
Easy returns
```

### Below

Use immersive modules:

1. Product story
2. Texture
3. Shade spectrum
4. Application
5. Ingredients
6. How to use
7. Reviews
8. Related look
9. Complete the look

---

# 13. Shade Selector

Make shade selection visual.

Never rely only on names.

```text
NUDE

○ ○ ○ ○ ○ ○ ○ ○

01       02       03       04
```

On selection:

- product image updates
- swatch enlarges
- model look updates if available
- shade name changes
- small tone description appears

Example:

> Warm nude with a soft peach undertone.

---

# 14. "Find Your Shade" Experience

Create an optional guided experience.

```text
FIND YOUR SHADE

What's your skin tone?

○ Fair
○ Light
○ Medium
○ Tan
○ Deep

Next →
```

Then:

```text
What's your undertone?

○ Cool
○ Neutral
○ Warm
○ I'm not sure
```

Final:

```text
YOUR MATCH

Warm Beige

Perfect for medium skin
with warm undertones.

[ SHOP THIS SHADE ]
```

This increases confidence before purchase.

---

# 15. Microinteractions

Every interaction should have physical meaning.

### Buttons

Normal:

```text
ADD TO BAG
```

Hover:

```text
ADD TO BAG   →
```

The arrow should not be permanently displayed.

### Product image

Hover:

- subtle 1–2% scale
- slight light movement
- no excessive rotation

### Add to bag

The product thumbnail physically moves toward the bag icon.

Then:

```text
ADDED TO BAG
```

### Wishlist

Use a soft fill transition.

### Image reveal

Use clip-path or mask reveal instead of generic fade everywhere.

---

# 16. Cursor

Desktop can have a custom cursor, but keep it subtle.

Normal:

small circular cursor.

Over product:

```text
VIEW
```

Over image:

```text
EXPLORE
```

Over CTA:

normal cursor.

Never use a huge decorative cursor.

---

# 17. Motion Principles

Motion should communicate:

- physicality
- discovery
- hierarchy
- transformation

Not decoration.

### Preferred

- scroll-linked product movement
- image masks
- text splitting/reveal
- product rotation
- horizontal galleries
- subtle parallax
- spring-based UI
- magnetic CTA only where appropriate

### Avoid

- everything bouncing
- constant floating animations
- excessive blur
- page-wide smooth scrolling hacks
- animation on every card
- long 1+ second transitions for simple interactions

### Motion timings

```text
Micro interaction: 150–250ms
UI transition: 250–450ms
Image reveal: 500–800ms
Hero choreography: 900–1400ms
Major scroll sequence: 800–1600ms
```

Use `prefers-reduced-motion`.

---

# 18. Image Direction

The website will only look premium if the image assets are premium.

Prioritize:

### Product photography

- isolated product
- clean shadow
- transparent background where useful
- macro detail
- packaging close-up
- texture

### Campaign photography

- real skin
- real makeup
- strong lighting
- close crops
- editorial composition
- South Asian beauty representation

### Texture

Create close-up shots of:

- lipstick
- gloss
- cream
- powder
- shimmer
- pigment

---

# 19. Instagram Integration

Instagram should be treated as a **brand proof layer**, not simply an embedded feed.

Create a section:

```text
@THEBEAU.PK

BEAUTY IN REAL LIFE

[ image ] [ reel ] [ image ]
[ reel  ] [ image ] [ reel  ]
```

Clicking opens:

- post/reel
- product used
- shop product
- creator name

Use the brand's real social content wherever licensing and technical access allow.

---

# 20. Mobile Experience

Mobile is not a compressed desktop version.

Design mobile specifically.

### Hero

Full viewport.

Product centered.

Copy positioned near bottom.

### Product discovery

Use horizontal swipe.

### Exploded product

Use vertical scroll sequence.

### Shop the look

Tap hotspots.

### Navigation

Bottom-friendly interaction targets.

Minimum touch target:

```text
44 × 44px
```

---

# 21. Responsive Breakpoints

Recommended:

```css
--mobile: 640px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1440px;
```

Use fluid sizing with:

```css
clamp()
```

for:

- headings
- section spacing
- product sizes
- hero typography

Do not simply duplicate desktop spacing on mobile.

---

# 22. Accessibility

Premium design must still be accessible.

Required:

- keyboard navigation
- visible focus states
- semantic HTML
- alt text
- sufficient contrast
- reduced-motion support
- accessible product controls
- accessible dialogs
- accessible cart
- accessible shade selection

Never make a product interaction depend exclusively on hover.

---

# 23. Performance

The website may contain large visual assets, so performance is part of the design.

### Images

Use:

- AVIF
- WebP
- responsive `srcset`
- lazy loading below the fold
- priority loading for hero asset

### Video

Use:

- compressed MP4/WebM
- poster image
- muted autoplay where appropriate
- mobile-specific lightweight version

### 3D

- lazy-load 3D
- do not block initial render
- use low-poly fallback
- compressed GLB
- compressed textures
- mobile fallback to 2D

### Rule

**The first meaningful visual should load before the fancy interaction.**

---

# 24. Recommended Tech Stack

If using Next.js:

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Motion
React Three Fiber
Three.js
@react-three/drei
Lenis or native scroll
Zod
TanStack Query
Lucide
```

Do not install libraries simply because they are popular.

Every dependency should have a purpose.

---

# 25. Component Architecture

Recommended structure:

```text
components/
  navigation/
    Header.tsx
    MobileMenu.tsx

  hero/
    BeautyHero.tsx
    HeroProduct.tsx
    HeroReveal.tsx

  product/
    ProductCard.tsx
    ProductGallery.tsx
    ProductViewer.tsx
    ShadeSelector.tsx
    ProductStory.tsx
    TextureShowcase.tsx

  immersive/
    ExplodedProduct.tsx
    ScrollProductSequence.tsx
    Product3D.tsx
    ShopTheLook.tsx

  commerce/
    AddToBag.tsx
    MiniCart.tsx
    CartDrawer.tsx
    WishlistButton.tsx

  editorial/
    CampaignSection.tsx
    BrandStory.tsx
    InstagramFeed.tsx

  ui/
    MagneticButton.tsx
    Reveal.tsx
    ImageReveal.tsx
    SectionHeading.tsx
```

---

# 26. Home Page Wireframe

```text
┌───────────────────────────────────────────────────────┐
│ NAVIGATION                                             │
├───────────────────────────────────────────────────────┤
│                                                       │
│                 CINEMATIC HERO                        │
│                                                       │
│                    PRODUCT                            │
│                                                       │
│      BEAUTY, BUT                    PRODUCT DETAIL     │
│      MAKE IT YOURS                                    │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│                  NEW COLLECTION                       │
│                                                       │
│       PRODUCT       PRODUCT       PRODUCT             │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│                   SHADE WORLD                         │
│                                                       │
│     COLOR SWATCH → PRODUCT → MODEL LOOK              │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│                  TEXTURE EXPERIENCE                   │
│                                                       │
│               MACRO / VIDEO / 3D                     │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│                  SHOP THE LOOK                        │
│                                                       │
│              LARGE BEAUTY CAMPAIGN                    │
│                 •      •       •                     │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│                    BEST SELLERS                       │
│                                                       │
│        PRODUCT     PRODUCT     PRODUCT     PRODUCT    │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│                  THE BEAU COMMUNITY                   │
│                                                       │
│       SOCIAL / UGC / CREATOR CONTENT                  │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│                     OUR STORY                         │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                                       │
│               FINAL SHOPPING MOMENT                   │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

# 27. Product Discovery UX

Instead of forcing users through:

```text
Category → Filters → Product Grid
```

provide multiple discovery paths:

```text
SHOP BY

Product
Look
Shade
Finish
Mood
Concern
Best Sellers
New In
```

Examples:

```text
I want...
────────────────
something natural
something for a night out
a glossy lip
a soft blush
my everyday base
a wedding look
```

This makes the store feel more like a beauty advisor.

---

# 28. Search

Search should be intelligent.

User types:

```text
pink blush
```

Show:

- products
- shades
- looks
- related content

User types:

```text
natural makeup
```

Show:

```text
LOOKS
Natural everyday look

PRODUCTS
Soft Blush
Nude Lip
Skin Tint
```

---

# 29. Cart Experience

Do not immediately send the user to a full cart page.

Use a premium side drawer.

```text
YOUR BAG

────────────────────────

Product
Product name
Shade
Rs. 2,999

────────────────────────

You may also like

Product
Product
Product

────────────────────────

Subtotal             Rs. 5,998

[ CHECKOUT ]
```

The drawer should feel fast and calm.

---

# 30. Checkout

Checkout should become extremely simple.

Remove distractions.

```text
THE BEAU

Contact
Delivery
Payment

────────────────

Your order

Product
Product

Total

[ PLACE ORDER ]
```

Do not carry the full campaign aesthetic into checkout if it reduces clarity.

---

# 31. Design Anti-Patterns

Never allow the implementation to drift into:

### Generic AI website

```text
rounded cards
gradient backgrounds
huge centered heading
three feature cards
floating blobs
```

### Generic Shopify beauty store

```text
announcement bar
large banner
4-column product grid
sale badges everywhere
newsletter
```

### Generic luxury website

```text
black background
gold text
serif typography
slow fade animations
```

The Beau should have its own visual language.

---

# 32. Design QA Checklist

Before considering a page complete, check:

## Visual

- [ ] Does this look like a beauty campaign?
- [ ] Is the product the visual hero?
- [ ] Is the palette restrained?
- [ ] Is typography distinctive?
- [ ] Is there enough negative space?
- [ ] Does the page have a memorable moment?

## UX

- [ ] Can a first-time visitor understand what is sold?
- [ ] Can users discover products quickly?
- [ ] Can users understand shades?
- [ ] Can users add to bag without friction?
- [ ] Is mobile experience intentionally designed?

## Motion

- [ ] Is animation purposeful?
- [ ] Is there one major hero moment?
- [ ] Are interactions fast?
- [ ] Does reduced-motion work?

## Performance

- [ ] Hero loads quickly
- [ ] Images are optimized
- [ ] 3D is lazy-loaded
- [ ] Video does not block content
- [ ] No unnecessary animation library usage

---

# 33. Cursor Agent Instructions

When implementing this project, the coding agent must follow these rules:

1. Read `DESIGN.md` before creating or modifying UI.
2. Never introduce a generic SaaS aesthetic.
3. Never replace the design direction with a template.
4. Product imagery is more important than decorative UI.
5. Motion must have a reason.
6. Prefer one excellent interaction over many small animations.
7. Use real product imagery whenever available.
8. If an asset is missing, create a clearly marked placeholder rather than inventing brand photography.
9. Keep commerce interactions extremely clear.
10. Preserve accessibility and performance while adding visual effects.
11. Build mobile intentionally, not as an afterthought.
12. Before finishing, perform a visual QA pass at:
   - 390px
   - 768px
   - 1440px
   - 1920px
13. Check reduced-motion behavior.
14. Check keyboard navigation.
15. Check loading performance.
16. Do not add dependencies without a clear reason.

---

# 34. Recommended Cursor Skills

Cursor supports reusable `SKILL.md` files and can expose them to Agent through the `/` menu. Skills can also be used as Custom Modes. 

## Install / use these first

### 1. `frontend-design` — REQUIRED

Use the official Anthropic frontend-design skill.

Purpose:

- distinctive visual direction
- typography
- color
- layout
- motion
- avoiding generic AI-generated UI

Repository:

https://github.com/anthropics/skills/tree/main/skills/frontend-design

This is the most important skill for this project.

### 2. `web-artifacts-builder` — OPTIONAL

Useful if you want the agent to rapidly prototype interactive visual sections.

Use it for:

- interactive prototypes
- complex visual experiments
- isolated landing-page experiments

Do not let it override the main `DESIGN.md`.

### 3. Custom `beauty-commerce` skill — RECOMMENDED

Create:

```text
.cursor/
  skills/
    beauty-commerce/
      SKILL.md
```

Purpose:

- enforce this design system
- enforce product-first composition
- enforce beauty-commerce UX
- enforce animation rules
- enforce responsive behavior
- prevent generic UI drift

Suggested skill content:

```md
---
name: beauty-commerce
description: Build The Beau beauty e-commerce experience according to DESIGN.md. Use when creating or modifying pages, product experiences, navigation, product cards, shopping interactions, immersive sections, animations, or responsive UI.
---

# The Beau Beauty Commerce

Always read DESIGN.md before implementation.

The Beau is an immersive beauty-commerce experience, not a generic Shopify template.

## Rules

- Follow DESIGN.md as the visual source of truth.
- Product imagery is the primary visual material.
- Use editorial beauty composition.
- Avoid generic SaaS cards.
- Avoid excessive rounded containers.
- Avoid generic pink gradients.
- Use motion intentionally.
- Prefer scroll storytelling for major campaign moments.
- Keep purchasing interactions simple.
- Make mobile a first-class experience.
- Respect reduced motion.
- Optimize large images and 3D assets.
- Never invent brand-specific product claims.
- Never replace a real asset with generic stock imagery when a real asset is available.
```

---

# 35. Cursor Workflow

Use this order.

## Phase 1 — Design

Ask Agent to:

```text
Read DESIGN.md.

Do not code yet.

Analyze the existing project and produce:
1. current architecture
2. asset requirements
3. missing assets
4. component plan
5. animation plan
6. responsive strategy
7. performance risks

Then propose the implementation order.
```

## Phase 2 — Foundation

Build:

```text
fonts
colors
spacing
navigation
buttons
image system
responsive containers
motion primitives
```

## Phase 3 — Hero

Build only:

```text
navigation
hero
product reveal
hero CTA
```

Then visually review it.

## Phase 4 — Immersive Commerce

Build:

```text
new collection
shade world
texture section
exploded product
shop the look
```

## Phase 5 — Commerce

Build:

```text
product cards
product page
shade selector
cart drawer
wishlist
checkout
```

## Phase 6 — Polish

Run:

```text
desktop QA
tablet QA
mobile QA
accessibility QA
performance QA
motion QA
```

---

# 36. The One Thing That Makes This Website Special

Do not try to make every section "crazy".

The website needs **one unforgettable interaction**.

Recommended signature:

> **The product literally comes apart as you explore it, revealing the formula, shade, texture and final look.**

Everything else should become quieter around that moment.

That contrast is what makes the experience feel premium.

---

# 37. Final Design Statement

The Beau should feel like:

> **A beauty editorial you can shop.**

Not:

> **An online store with animations.**

The difference is important.

The website should make users stop scrolling, look closer at the product, explore the shade, understand the texture, see the product in use, and then buy with almost no friction.

**Editorial first. Product second. Commerce always available.**
