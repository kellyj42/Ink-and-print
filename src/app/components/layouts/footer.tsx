import Link from "next/link";
import { Globe, MessageCircle, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[hsl(0,0%,7%)] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-4">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
            INK & APPARELS
          </h2>
          <p className="mt-4 text-[hsl(0,0%,100%,0.7)] text-sm">
            Your quality and creative place for custom printing, branding, and
            apparel.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-[hsl(0,0%,100%,0.7)] text-sm">
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

        {/* SERVICES */}
        <div>
          <h3 className="font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-[hsl(0,0%,100%,0.7)] text-sm">
            <li>UV Printing</li>
            <li>DTF Printing</li>
            <li>Vinyl Cutting</li>
            <li>Sublimation</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-[hsl(0,0%,100%,0.7)] text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> 0704444845
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Swift Plaza, SD 148
            </li>
          </ul>

          {/* SOCIALS */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="p-2 rounded-full bg-[hsl(0,0%,95%,0.1)] hover:bg-[hsl(355,82%,56%)] transition"
            >
              <Globe size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-[hsl(0,0%,95%,0.1)] hover:bg-[hsl(355,82%,56%)] transition"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-[hsl(0,0%,95%,0.1)] mt-10 pt-6 text-center text-sm text-[hsl(0,0%,100%,0.6)]">
        © {new Date().getFullYear()} Ink & Apparels. All rights reserved.
      </div>
    </footer>
  );
}
