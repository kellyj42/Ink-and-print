import { CheckCircle, Clock, Users, ShieldCheck } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="w-full py-20 bg-[hsl(0,0%,100%)]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[hsl(0,0%,7%)]">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="mt-4 text-[hsl(0,0%,7%,0.7)]">
            We deliver quality, speed, and reliability you can trust.
          </p>
        </div>

        {/* Trust Cards */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Card 1 */}
          <div className="bg-[hsl(0,0%,95%)] p-6 rounded-2xl text-center hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] text-white">
              <CheckCircle size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-[hsl(0,0%,7%)]">
              Premium Quality
            </h3>
            <p className="mt-2 text-sm text-[hsl(0,0%,7%,0.7)]">
              High-quality prints that last long without fading.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[hsl(0,0%,95%)] p-6 rounded-2xl text-center hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] text-white">
              <Clock size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-[hsl(0,0%,7%)]">
              Fast Turnaround
            </h3>
            <p className="mt-2 text-sm text-[hsl(0,0%,7%,0.7)]">
              Quick production and delivery for all your orders.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[hsl(0,0%,95%)] p-6 rounded-2xl text-center hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] text-white">
              <Users size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-[hsl(0,0%,7%)]">
              Trusted by Clients
            </h3>
            <p className="mt-2 text-sm text-[hsl(0,0%,7%,0.7)]">
              Serving individuals, schools, and businesses.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[hsl(0,0%,95%)] p-6 rounded-2xl text-center hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] text-white">
              <ShieldCheck size={24} />
            </div>
            <h3 className="mt-4 font-semibold text-[hsl(0,0%,7%)]">
              Reliable Service
            </h3>
            <p className="mt-2 text-sm text-[hsl(0,0%,7%,0.7)]">
              Consistent results you can depend on every time.
            </p>
          </div>

        </div>

        {/* Bottom Trust Statement */}
        <div className="mt-16 text-center">
          <p className="text-lg text-[hsl(0,0%,7%,0.7)]">
            ✔ 100+ Happy Clients &nbsp;&nbsp; ✔ High Quality Prints &nbsp;&nbsp; ✔ Affordable Pricing
          </p>
        </div>

      </div>
    </section>
  );
}