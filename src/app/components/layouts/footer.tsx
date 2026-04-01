import Link from "next/link";
import { Globe, MapPin, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[hsl(0,0%,7%)] pt-16 pb-8 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4">
        <div>
          <h2 className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-2xl font-bold text-transparent">
            INK & APPARELS
          </h2>
          <p className="mt-4 text-sm text-[hsl(0,0%,100%,0.7)]">
            Your quality and creative place for custom printing, branding, and
            apparel.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[hsl(0,0%,100%,0.7)]">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/order" className="hover:text-white">
                Order
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Our Services</h3>
          <ul className="space-y-2 text-sm text-[hsl(0,0%,100%,0.7)]">
            <li>UV Printing</li>
            <li>DTF Printing</li>
            <li>Vinyl Cutting</li>
            <li>Sublimation</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-[hsl(0,0%,100%,0.7)]">
            <li className="flex items-center gap-2">
              <Phone size={16} /> WhatsApp/Calls: 0704444845
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> Other calls: 0790084845
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Swift Plaza, SD 148
            </li>
            <li className="break-all">jamiebanku10@gmail.com</li>
          </ul>

          <div className="mt-4 flex gap-4">
            <a
              href="https://www.instagram.com/ink_n_apparels/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-[hsl(0,0%,95%,0.1)] p-2 transition hover:bg-[hsl(355,82%,56%)]"
            >
              <Globe size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@ink_n_apparelsventures"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="rounded-full bg-[hsl(0,0%,95%,0.1)] p-2 transition hover:bg-[hsl(355,82%,56%)]"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-[hsl(0,0%,95%,0.1)] pt-6 text-center text-sm text-[hsl(0,0%,100%,0.6)]">
        &copy; {new Date().getFullYear()} Ink & Apparels. All rights reserved.
      </div>
    </footer>
  );
}
