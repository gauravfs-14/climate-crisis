import { Navbar } from "@/components/navbar";
import { ScrollytellingContainer } from "@/components/scrollytelling-container";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 to-black/90 z-0" />
          <div className="absolute inset-0 bg-[url('/earth-bg.jpg')] bg-cover bg-center opacity-40 z-[-1]" />
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Our Planet in <span className="text-blue-400">Crisis</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-8">
              A data-driven journey through the climate emergency
            </p>
            <div className="animate-bounce mt-16">
              <p className="text-sm text-gray-400 mb-2">Scroll to begin</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto text-gray-400"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </div>
        </section>

        <ScrollytellingContainer />
      </main>
      <Footer />
    </div>
  );
}
