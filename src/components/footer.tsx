import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-blue-400">Climate</span>
              <span>Crisis</span>
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              A data visualization project to raise awareness about climate
              change and its impacts on our planet.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Data Sources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="https://www.nasa.gov/climate-change/"
                  className="hover:text-white transition-colors"
                >
                  NASA Climate Change
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.noaa.gov/"
                  className="hover:text-white transition-colors"
                >
                  NOAA
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.ipcc.ch/"
                  className="hover:text-white transition-colors"
                >
                  IPCC
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.globalcarbonproject.org/"
                  className="hover:text-white transition-colors"
                >
                  Global Carbon Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Take Action</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="https://www.un.org/en/actnow"
                  className="hover:text-white transition-colors"
                >
                  UN Act Now
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.conservation.org/"
                  className="hover:text-white transition-colors"
                >
                  Conservation International
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.worldwildlife.org/"
                  className="hover:text-white transition-colors"
                >
                  World Wildlife Fund
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.greenpeace.org/"
                  className="hover:text-white transition-colors"
                >
                  Greenpeace
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Climate Crisis. All data is from public
            sources.
          </p>
          <p className="mt-2">
            Created for educational purposes. This is not a commercial project.
          </p>
        </div>
      </div>
    </footer>
  );
}
