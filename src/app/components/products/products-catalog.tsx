"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Filter,
  Minus,
  Palette,
  Plus,
  Shirt,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";
import type { Product } from "../../../data/products";
import { CartItem, writeCart } from "../../../lib/cart";
import { useCart } from "../../../lib/use-cart";
import { formatUGX } from "../../../lib/format";

const reasons = [
  {
    title: "Print-Ready Selection",
    description:
      "We pick products that take color well, wear well, and keep their finish after repeated use.",
    icon: Sparkles,
  },
  {
    title: "Brand-Friendly Styling",
    description:
      "From minimalist logo placements to full graphic statements, the range supports different brand directions.",
    icon: Palette,
  },
  {
    title: "Comfort Meets Durability",
    description:
      "Good fabric feel matters just as much as appearance, especially for uniforms, merch, and everyday wear.",
    icon: Shirt,
  },
];

export default function ProductsCatalog({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const storedCartItems = useCart();
  const categories = [
    "All",
    ...Array.from(new Set(initialProducts.map((product) => product.category))),
  ];

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    visible: boolean;
  }>({
    text: "",
    visible: false,
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};

    initialProducts.forEach((product) => {
      initial[product.id] = product.colors[0]?.name ?? "Default";
    });

    return initial;
  });
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};

    initialProducts.forEach((product) => {
      initial[product.id] = product.sizes[0] ?? "One Size";
    });

    return initial;
  });

  const filteredProducts =
    activeCategory === "All"
      ? initialProducts
      : initialProducts.filter((product) => product.category === activeCategory);

  const cartItems = storedCartItems;
  const cartItemCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const addToCart = (
    product: Product,
    selectedColorName: string,
    selectedSize: string
  ) => {
    const selectedColorObj = product.colors.find(
      (color) => color.name === selectedColorName
    );
    if (!selectedColorObj) return;

    const existingIndex = cartItems.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === selectedColorName &&
        item.size === selectedSize
    );

    let nextCartItems: CartItem[];

    if (existingIndex !== -1) {
      nextCartItems = cartItems.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      nextCartItems = [
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          color: selectedColorName,
          size: selectedSize,
          colorSwatch: selectedColorObj.swatch,
          image: product.image,
          quantity: 1,
        },
      ];
    }

    writeCart(nextCartItems);

    setToastMessage({
      text: `${product.name} (${selectedColorName}, ${selectedSize}) added to cart`,
      visible: true,
    });
    setTimeout(
      () => setToastMessage((prev) => ({ ...prev, visible: false })),
      2000
    );
  };

  const updateQuantity = (
    id: string,
    color: string,
    size: string,
    delta: number
  ) => {
    const nextCartItems = cartItems
      .map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    writeCart(nextCartItems);
  };

  const removeItem = (id: string, color: string, size: string) => {
    writeCart(
      cartItems.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCartOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        isCartOpen
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen]);

  return (
    <main className="bg-white text-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-black tracking-tight">
            THREAD<span className="text-[hsl(355,82%,56%)]">&PRINT</span>
          </Link>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 transition hover:bg-gray-200"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-semibold">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(355,82%,56%)] text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <section className="border-b border-gray-200 bg-gray-50 pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
                Shop The Collection
              </p>
              <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                Pick a garment. <br /> Customize. Order.
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Premium blanks curated for your brand. Choose colors, add to
                cart, and move straight into ordering.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/order"
                className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white shadow-md transition hover:shadow-lg"
              >
                Start Custom Order
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
              >
                Print Services
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
            <Filter className="h-4 w-4 text-gray-500" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[hsl(355,82%,56%)] text-white shadow-md"
                    : "border border-gray-300 bg-white text-gray-600 hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Shop by category</h2>
            <p className="mt-2 text-gray-500">
              {filteredProducts.length} premium styles ready for customization
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <h3 className="text-2xl font-bold">No products available yet</h3>
            <p className="mt-3 text-gray-600">
              Update the local product catalog and they&apos;ll appear here automatically.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-[hsl(355,82%,56%)]"
            >
              Back home
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => {
              const currentColorName = selectedColors[product.id];
              const currentSize = selectedSizes[product.id];

              return (
                <article
                  key={product.id}
                  className="product-card group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300"
                >
                  <div className="relative h-80 overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {product.tag && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-800 shadow-sm">
                        {product.tag}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {product.rating} ({product.reviews})
                    </div>
                    {product.inStock && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-green-600 px-2 py-1 text-[10px] font-semibold uppercase text-white shadow">
                        In stock
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[hsl(355,82%,56%)]">
                      {product.category}
                    </div>
                    <h3 className="text-xl font-bold leading-tight">{product.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Color: {currentColorName}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() =>
                              setSelectedColors((prev) => ({
                                ...prev,
                                [product.id]: color.name,
                              }))
                            }
                            className={`h-6 w-6 rounded-full border border-gray-300 shadow-sm transition-all ${
                              selectedColors[product.id] === color.name
                                ? "ring-2 ring-[hsl(355,82%,56%)] ring-offset-1"
                                : ""
                            }`}
                            style={{ backgroundColor: color.swatch }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Sizes available
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [product.id]: size,
                              }))
                            }
                            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                              currentSize === size
                                ? "border-[hsl(355,82%,56%)] bg-[hsl(355,82%,56%)] text-white"
                                : "border-gray-300 bg-white text-gray-600 hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xl font-bold text-gray-900">
                          {formatUGX(product.price)}
                        </p>
                        {product.originalPrice ? (
                          <p className="text-xs text-gray-400 line-through">
                            {formatUGX(product.originalPrice)}
                          </p>
                        ) : null}
                      </div>
                      <button
                        onClick={() =>
                          addToCart(product, currentColorName, currentSize)
                        }
                        className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-[hsl(355,82%,56%)]"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <div className="inline-flex rounded-xl bg-gray-900 p-3 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold">{reason.title}</h3>
                <p className="mt-3 text-gray-600">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-gray-900 p-8 text-white md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-[hsl(24,95%,53%)]">
              Best For
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Teams, brands & custom drops
            </h2>
            <div className="mt-6 grid gap-3">
              {[
                "Branded staff uniforms and corporate kits",
                "Fashion collections and creative merch runs",
                "Event apparel, gifts, and activation pieces",
                "Small-batch custom orders with polished presentation",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl bg-white/10 p-3">
                  <Check className="mt-0.5 h-5 w-5 text-[hsl(24,95%,53%)]" />
                  <p className="text-sm text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-[hsl(355,82%,56%)]">
              Need Guidance?
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              We help match product to print method
            </h2>
            <p className="mt-4 text-gray-600">
              From DTF to embroidery, we&apos;ll recommend the best blank and
              finish for your budget and deadline.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[hsl(355,82%,56%)] transition hover:gap-3"
            >
              Talk to an expert <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-8 py-14 text-center text-white shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Ready to create?
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Choose a product, send artwork, we&apos;ll handle the finish
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/90">
            One statement item or a full branded batch, we make it look sharp.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/order"
              className="rounded-xl bg-white px-7 py-3 font-semibold text-[hsl(355,82%,56%)] transition hover:bg-gray-100"
            >
              Start an Order
            </Link>
            <Link
              href="/services"
              className="rounded-xl border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Compare Services
            </Link>
          </div>
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity">
          <div
            ref={drawerRef}
            className="cart-drawer fixed right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <ShoppingCart className="h-5 w-5" /> Your cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300" />
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-xl bg-black px-5 py-2 text-white"
                >
                  Start shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="mb-5 flex gap-4 border-b border-gray-100 pb-4"
                    >
                      <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-semibold">{item.name}</h4>
                          <button
                            onClick={() =>
                              removeItem(item.id, item.color, item.size)
                            }
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">Color: {item.color}</p>
                        <p className="text-xs text-gray-500">Size: {item.size}</p>
                        <p className="mt-1 text-sm font-bold">
                          {formatUGX(item.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.size, -1)
                            }
                            className="rounded-full border border-gray-300 p-1 hover:bg-gray-100"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.size, 1)
                            }
                            className="rounded-full border border-gray-300 p-1 hover:bg-gray-100"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 p-5">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Subtotal</span>
                    <span>{formatUGX(cartTotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Shipping & taxes calculated at checkout
                  </p>
                  <div className="mt-5 flex gap-3">
                    <Link
                      href="/checkout"
                      className="flex-1 rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] py-3 text-center font-semibold text-white"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Checkout
                    </Link>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="flex-1 rounded-xl border border-gray-300 py-3 text-center font-semibold"
                    >
                      Continue shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {toastMessage.visible && (
        <div className="toast-animation fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-lg">
          {toastMessage.text}
        </div>
      )}
    </main>
  );
}
