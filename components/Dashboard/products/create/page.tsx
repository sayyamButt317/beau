"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, Plus, Save } from "lucide-react"
import { toast } from "sonner"
import { useMountFade } from "../../hooks/useGsap"
import { NotificationBell } from "../../ui/catalogPage"
import {
  CheckboxField,
  CreateNewLink,
  FormBreadcrumbs,
  FormSection,
  MAX_IMAGE_BYTES,
  MediaDropZone,
  MediaSlot,
  OutlineButton,
  PrimaryGoldButton,
  RadioField,
  RichTextEditor,
  SelectField,
  SidebarCard,
  TextAreaField,
  TextField,
  ToggleField,
} from "../../ui/productForm"
import { cormorant, dk } from "../../theme"
import type { ProductFormState, ProductPublishStatus } from "../../types"
import {
  ADD_PRODUCT_PAGE,
  BRAND_OPTIONS,
  COLLECTION_MULTI_OPTIONS,
  COUNTRY_OPTIONS,
  GEMSTONE_OPTIONS,
  METAL_COLOR_OPTIONS,
  METAL_PURITY_OPTIONS,
  METAL_TYPE_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
  STONE_COLOR_OPTIONS,
  STONE_SHAPE_OPTIONS,
  createEmptyProductForm,
  slugify,
} from "../formData"
import { mapProductFormToCreateBody } from "../mapToCreateBody"
import { mapApiProductToForm } from "../mapApiProduct"
import {
  CreateProductMutation,
  EditProductMutation,
} from "@/routes/admin/mutation"
import { useAdminGetProductById } from "@/routes/admin/query"

type AddProductPageViewProps = {
  productId?: string
}

export default function AddProductPageView({ productId }: AddProductPageViewProps) {
  const router = useRouter()
  const isEdit = Boolean(productId)
  const { mutate: createProduct, isPending: isCreating } = CreateProductMutation()
  const { mutate: editProduct, isPending: isEditing } = EditProductMutation()
  const isPending = isCreating || isEditing

  const {
    data: productRes,
    isLoading: isLoadingProduct,
    isError: isProductError,
    error: productError,
  } = useAdminGetProductById(productId ?? "")

  const headerRef = useMountFade<HTMLElement>(0.05)
  const [form, setForm] = useState<ProductFormState>(createEmptyProductForm)
  const [hydrated, setHydrated] = useState(!isEdit)

  useEffect(() => {
    if (!isEdit || !productRes?.data) return
    setForm(mapApiProductToForm(productRes.data))
    setHydrated(true)
  }, [isEdit, productRes])

  function patch<K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function patchNested<K extends keyof ProductFormState>(
    key: K,
    nested: Partial<ProductFormState[K]>,
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as object), ...nested } as ProductFormState[K],
    }))
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug || slugify(name),
    }))
  }

  function submitProduct(status: ProductPublishStatus) {
    if (!form.name.trim()) {
      toast.error("Product name is required")
      return
    }

    const payload = mapProductFormToCreateBody({ ...form, status })

    if (isEdit && productId) {
      editProduct(
        { ...payload, _id: productId },
        {
          onSuccess: () => {
            router.push("/admin/products")
          },
        },
      )
      return
    }

    createProduct(payload, {
      onSuccess: () => {
        router.push("/admin/products")
      },
    })
  }

  function handlePublish() {
    submitProduct("active")
  }

  function handleSaveDraft() {
    submitProduct("draft")
  }

  function readImageFiles(files: File[]): Promise<string[]> {
    const images = files.filter((f) => f.type.startsWith("image/"))
    if (!images.length) {
      toast.error("Please choose image files (PNG, JPG, or WEBP)")
      return Promise.resolve([])
    }

    const oversized = images.find((f) => f.size > MAX_IMAGE_BYTES)
    if (oversized) {
      toast.error(`“${oversized.name}” is over 5MB`)
      return Promise.resolve([])
    }

    return Promise.all(
      images.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(String(reader.result))
            reader.onerror = () => reject(new Error("Failed to read image"))
            reader.readAsDataURL(file)
          }),
      ),
    )
  }

  async function handleImageDrop(files: File[]) {
    const urls = await readImageFiles(files)
    if (!urls.length) return

    setForm((prev) => {
      const gallery = [...prev.media.gallery]
      let mainImage = prev.media.mainImage
      let cursor = 0

      if (!mainImage) {
        mainImage = urls[cursor++]
      }

      while (cursor < urls.length && gallery.length < 5) {
        gallery.push(urls[cursor++])
      }

      if (cursor < urls.length) {
        toast.message("Only main + 5 gallery images are kept")
      }

      return {
        ...prev,
        media: { ...prev.media, mainImage, gallery },
      }
    })
  }

  async function handleMainImage(file: File) {
    const [url] = await readImageFiles([file])
    if (!url) return
    patchNested("media", { mainImage: url })
  }

  async function handleGalleryImage(index: number, file: File) {
    const [url] = await readImageFiles([file])
    if (!url) return
    setForm((prev) => {
      const gallery = [...prev.media.gallery]
      gallery[index] = url
      return { ...prev, media: { ...prev.media, gallery } }
    })
  }

  function clearGalleryImage(index: number) {
    setForm((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        gallery: prev.media.gallery.filter((_, i) => i !== index),
      },
    }))
  }

  async function handleVideoDrop(files: File[]) {
    const video = files.find((f) => f.type.startsWith("video/"))
    if (!video) {
      toast.error("Please choose a video file")
      return
    }
    if (video.size > 50 * 1024 * 1024) {
      toast.error("Video must be under 50MB")
      return
    }
    const url = URL.createObjectURL(video)
    patchNested("media", { video: url })
    toast.success("Video selected")
  }

  async function handle360Drop(files: File[]) {
    const urls = await readImageFiles(files)
    if (!urls.length) return
    setForm((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        images360: [...prev.media.images360, ...urls].slice(0, 24),
      },
    }))
  }

  function toggleCollection(value: string) {
    setForm((prev) => ({
      ...prev,
      collections: prev.collections.includes(value)
        ? prev.collections.filter((c) => c !== value)
        : [...prev.collections, value],
    }))
  }

  const pageTitle = isEdit ? "Edit Product" : ADD_PRODUCT_PAGE.title
  const pageSubtitle = isEdit
    ? "Update this product in The Beau catalog."
    : ADD_PRODUCT_PAGE.subtitle
  const breadcrumbs = isEdit
    ? [
        { label: "Dashboard", href: "/admin/overview" },
        { label: "Products", href: "/admin/products" },
        { label: "Edit Product" },
      ]
    : [...ADD_PRODUCT_PAGE.breadcrumbs]
  const primaryLabel = isEdit
    ? isPending
      ? "Saving…"
      : "Save Changes"
    : isPending
      ? "Publishing…"
      : "Publish Product"

  if (isEdit && isLoadingProduct) {
    return (
      <div className="min-h-screen px-4 pb-28 pt-20 lg:px-8 lg:pt-8">
        <p className="text-sm" style={{ color: dk.onVar }}>
          Loading product…
        </p>
      </div>
    )
  }

  if (isEdit && isProductError) {
    return (
      <div className="min-h-screen px-4 pb-28 pt-20 lg:px-8 lg:pt-8">
        <p className="text-sm" style={{ color: dk.danger }} role="alert">
          Couldn’t load product
          {productError instanceof Error ? `: ${productError.message}` : "."}
        </p>
        <OutlineButton href="/admin/products">Back to Products</OutlineButton>
      </div>
    )
  }

  if (isEdit && !hydrated) {
    return (
      <div className="min-h-screen px-4 pb-28 pt-20 lg:px-8 lg:pt-8">
        <p className="text-sm" style={{ color: dk.onVar }}>
          Preparing form…
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 pb-28 pt-20 lg:px-8 lg:pt-8">
      <header ref={headerRef} className="mb-8">
        <FormBreadcrumbs items={breadcrumbs} />

        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className={`${cormorant.className} text-3xl sm:text-4xl`} style={{ color: dk.on }}>
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm" style={{ color: dk.onVar }}>
              {pageSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <NotificationBell />
            <OutlineButton href="/admin/products">Cancel</OutlineButton>
            <OutlineButton icon={Save} onClick={handleSaveDraft} disabled={isPending}>
              {isPending ? "Saving…" : "Save Draft"}
            </OutlineButton>
            <OutlineButton icon={Eye}>Preview</OutlineButton>
            <PrimaryGoldButton icon={Plus} onClick={handlePublish} disabled={isPending}>
              {primaryLabel}
            </PrimaryGoldButton>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <FormSection number={1} title="Product Information">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <TextField
                id="name"
                label="Product Name"
                value={form.name}
                onChange={handleNameChange}
                placeholder="e.g. Soft Blush"
                required
              />
              <TextField
                id="sku"
                label="SKU"
                value={form.sku}
                onChange={(v) => patch("sku", v)}
                placeholder="BEAU-FC-001"
                required
              />
              <TextField
                id="slug"
                label="Slug"
                value={form.slug}
                onChange={(v) => patch("slug", v)}
                placeholder="soft-blush"
              />
            </div>
            <TextAreaField
              id="short-desc"
              label="Short Description"
              value={form.shortDescription}
              onChange={(v) => patch("shortDescription", v)}
              placeholder="A brief summary shown on product cards..."
              rows={2}
            />
            <SelectField
              id="category"
              label="Category"
              value={form.category}
              onChange={(v) => patch("category", v)}
              options={PRODUCT_CATEGORY_OPTIONS}
            />
            <RichTextEditor
              id="full-desc"
              label="Full Description"
              value={form.fullDescription}
              onChange={(v) => patch("fullDescription", v)}
            />
          </FormSection>

          {/* Brand */}
          <FormSection number={2} title="Brand">
            <SelectField
              id="brand"
              label="Brand Name"
              value={form.brand}
              onChange={(v) => patch("brand", v)}
              options={BRAND_OPTIONS}
            />
            <p className="text-xs" style={{ color: dk.onFaint }}>
              Choose the brand this product belongs to — Kiko, Rhode, Huda Beauty,
              Sheglam, or The Beau.
            </p>
          </FormSection>

          {/* 3. Product Images */}
          <FormSection number={3} title="Product Images">
            <MediaDropZone
              title="Drag & Drop images here"
              hint="PNG, JPG or WEBP · Max 5MB each"
              onFiles={handleImageDrop}
            />
            <div>
              <p className="mb-2 text-xs font-medium" style={{ color: dk.onVar }}>
                Main Image
              </p>
              <div className="grid max-w-[140px] grid-cols-1 gap-3">
                <MediaSlot
                  label="Main"
                  src={form.media.mainImage}
                  onSelect={handleMainImage}
                  onClear={() => patchNested("media", { mainImage: null })}
                />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium" style={{ color: dk.onVar }}>
                Gallery Images
              </p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MediaSlot
                    key={i}
                    label={`Image ${i + 1}`}
                    src={form.media.gallery[i] ?? null}
                    onSelect={(file) => handleGalleryImage(i, file)}
                    onClear={
                      form.media.gallery[i] ? () => clearGalleryImage(i) : undefined
                    }
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium" style={{ color: dk.onVar }}>
                  Video (Optional)
                  {form.media.video ? " · selected" : ""}
                </p>
                <MediaDropZone
                  title="Upload product video"
                  compact
                  multiple={false}
                  accept="video/mp4,video/webm,video/quicktime"
                  buttonLabel="Upload Video"
                  onFiles={handleVideoDrop}
                />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium" style={{ color: dk.onVar }}>
                  360° Images (Optional)
                  {form.media.images360.length
                    ? ` · ${form.media.images360.length} added`
                    : ""}
                </p>
                <MediaDropZone
                  title="Upload 360° spin images"
                  compact
                  onFiles={handle360Drop}
                />
              </div>
            </div>
          </FormSection>

          {/* 3. Pricing */}
          <FormSection number={4} title="Pricing">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <TextField
                id="regular-price"
                label="Regular Price"
                value={form.pricing.regularPrice}
                onChange={(v) => patchNested("pricing", { regularPrice: v })}
                placeholder="0.00"
                prefix="PKR"
              />
              <TextField
                id="sale-price"
                label="Sale Price"
                value={form.pricing.salePrice}
                onChange={(v) => patchNested("pricing", { salePrice: v })}
                placeholder="0.00"
                prefix="PKR"
              />
              <TextField
                id="cost-price"
                label="Cost Price"
                value={form.pricing.costPrice}
                onChange={(v) => patchNested("pricing", { costPrice: v })}
                placeholder="0.00"
                prefix="PKR"
              />
            </div>
            <ToggleField
              label="Discount Schedule"
              checked={form.pricing.discountSchedule}
              onChange={(v) => patchNested("pricing", { discountSchedule: v })}
            />
            {form.pricing.discountSchedule && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  id="discount-start"
                  label="Start Date"
                  value={form.pricing.discountStart}
                  onChange={(v) => patchNested("pricing", { discountStart: v })}
                  placeholder="YYYY-MM-DD"
                />
                <TextField
                  id="discount-end"
                  label="End Date"
                  value={form.pricing.discountEnd}
                  onChange={(v) => patchNested("pricing", { discountEnd: v })}
                  placeholder="YYYY-MM-DD"
                />
              </div>
            )}
          </FormSection>

          {/* 4. Inventory */}
          <FormSection number={5} title="Inventory">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <TextField
                id="stock-qty"
                label="Stock Quantity"
                value={form.inventory.stockQuantity}
                onChange={(v) => patchNested("inventory", { stockQuantity: v })}
                placeholder="0"
              />
              <TextField
                id="low-stock"
                label="Low Stock Alert"
                value={form.inventory.lowStockAlert}
                onChange={(v) => patchNested("inventory", { lowStockAlert: v })}
                placeholder="5"
              />
              <TextField
                id="barcode"
                label="Barcode"
                value={form.inventory.barcode}
                onChange={(v) => patchNested("inventory", { barcode: v })}
                placeholder="Scan or enter barcode"
              />
            </div>
            <div className="flex flex-wrap gap-6">
              <CheckboxField
                label="Track inventory"
                checked={form.inventory.trackInventory}
                onChange={(v) => patchNested("inventory", { trackInventory: v })}
              />
              <CheckboxField
                label="Allow Back Orders"
                checked={form.inventory.allowBackOrders}
                onChange={(v) => patchNested("inventory", { allowBackOrders: v })}
              />
            </div>
          </FormSection>

          {/* Formula & Finish */}
          <FormSection number={6} title="Formula & Finish">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField
                id="finish"
                label="Finish"
                value={form.specs.metalType}
                onChange={(v) => patchNested("specs", { metalType: v })}
                options={METAL_TYPE_OPTIONS}
              />
              <SelectField
                id="coverage"
                label="Coverage"
                value={form.specs.metalPurity}
                onChange={(v) => patchNested("specs", { metalPurity: v })}
                options={METAL_PURITY_OPTIONS}
              />
              <SelectField
                id="undertone"
                label="Undertone"
                value={form.specs.metalColor}
                onChange={(v) => patchNested("specs", { metalColor: v })}
                options={METAL_COLOR_OPTIONS}
              />
              <SelectField
                id="shade-family"
                label="Shade Family"
                value={form.specs.gemstone}
                onChange={(v) => patchNested("specs", { gemstone: v })}
                options={GEMSTONE_OPTIONS}
              />
              <SelectField
                id="formula"
                label="Formula"
                value={form.specs.stoneShape}
                onChange={(v) => patchNested("specs", { stoneShape: v })}
                options={STONE_SHAPE_OPTIONS}
              />
              <SelectField
                id="skin-type"
                label="Skin Type"
                value={form.specs.stoneColor}
                onChange={(v) => patchNested("specs", { stoneColor: v })}
                options={STONE_COLOR_OPTIONS}
              />
              <SelectField
                id="country"
                label="Country of Origin"
                value={form.specs.countryOfOrigin}
                onChange={(v) => patchNested("specs", { countryOfOrigin: v })}
                options={COUNTRY_OPTIONS}
              />
              <TextField
                id="shelf-life"
                label="Shelf Life (months)"
                value={form.specs.makingCharges}
                onChange={(v) => patchNested("specs", { makingCharges: v })}
                placeholder="e.g. 24"
              />
            </div>
          </FormSection>
        </div>

        {/* ── Sidebar ─────────────────────────────────────────── */}
        <aside className="space-y-4 xl:sticky xl:top-8 xl:self-start">
          <SidebarCard title="Product Status">
            {(["draft", "active", "inactive", "discontinued"] as ProductPublishStatus[]).map(
              (status) => (
              <RadioField
                key={status}
                name="product-status"
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                value={status}
                checked={form.status === status}
                onChange={(v) => patch("status", v as ProductPublishStatus)}
              />
              ),
            )}
          </SidebarCard>

          <SidebarCard title="Visibility">
            <CheckboxField
              label="Online Store"
              checked={form.visibility.onlineStore}
              onChange={(v) => patchNested("visibility", { onlineStore: v })}
            />
            <CheckboxField
              label="Search"
              checked={form.visibility.search}
              onChange={(v) => patchNested("visibility", { search: v })}
            />
            <CheckboxField
              label="Homepage"
              checked={form.visibility.homepage}
              onChange={(v) => patchNested("visibility", { homepage: v })}
            />
            <CheckboxField
              label="Featured Product"
              checked={form.visibility.featuredProduct}
              onChange={(v) => patchNested("visibility", { featuredProduct: v })}
            />
          </SidebarCard>

          <SidebarCard
            title="Collections"
            action={<CreateNewLink label="Create New" />}
          >
            {COLLECTION_MULTI_OPTIONS.map((opt) => (
              <CheckboxField
                key={opt.value}
                label={opt.label}
                checked={form.collections.includes(opt.value)}
                onChange={() => toggleCollection(opt.value)}
              />
            ))}
          </SidebarCard>

          <SidebarCard title="Featured">
            <CheckboxField
              label="New Arrival"
              checked={form.featured.newArrival}
              onChange={(v) => patchNested("featured", { newArrival: v })}
            />
            <CheckboxField
              label="Best Seller"
              checked={form.featured.bestSeller}
              onChange={(v) => patchNested("featured", { bestSeller: v })}
            />
            <CheckboxField
              label="Trending"
              checked={form.featured.trending}
              onChange={(v) => patchNested("featured", { trending: v })}
            />
            <CheckboxField
              label="Limited Edition"
              checked={form.featured.limitedEdition}
              onChange={(v) => patchNested("featured", { limitedEdition: v })}
            />
            <CheckboxField
              label="Recommended"
              checked={form.featured.recommended}
              onChange={(v) => patchNested("featured", { recommended: v })}
            />
          </SidebarCard>
        </aside>
      </div>

      {/* Sticky bottom bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t px-4 py-3 backdrop-blur-md lg:left-[260px]"
        style={{
          borderColor: dk.panelBorder,
          background: "#FFFFFF",
        }}
      >
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs" style={{ color: dk.onVar }}>
            <span style={{ color: dk.accent }}>●</span> Unsaved changes · Last auto-saved 2 minutes ago
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <OutlineButton href="/admin/products">Cancel</OutlineButton>
            <OutlineButton icon={Save} onClick={handleSaveDraft} disabled={isPending}>
              {isPending ? "Saving…" : "Save Draft"}
            </OutlineButton>
            <PrimaryGoldButton icon={Plus} onClick={handlePublish} disabled={isPending}>
              {primaryLabel}
            </PrimaryGoldButton>
          </div>
        </div>
      </div>
    </div>
  )
}
