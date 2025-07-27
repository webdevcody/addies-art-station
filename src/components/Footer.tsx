import { Link } from "react-router-dom";
import { DarkModeToggle } from "./DarkModeToggle";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Shop Section */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛍️</span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                Shop
              </h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/browse"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform">
                    🎨
                  </span>
                  Browse Art
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💬</span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                Support
              </h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform">
                    💌
                  </span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform">
                    📦
                  </span>
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📋</span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                Legal
              </h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform">
                    📄
                  </span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform">
                    🔒
                  </span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin Section */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👑</span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                Admin
              </h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform">
                    🔑
                  </span>
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Artist Quote */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 mb-8 shadow-lg border border-purple-200 dark:border-purple-700">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-4xl mb-4">🎨</div>
            <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              "Art washes away from the soul the dust of everyday life."
            </blockquote>
            <cite className="text-purple-600 dark:text-purple-400 font-semibold">
              - Pablo Picasso
            </cite>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl py-6 px-8 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🎨</span>
              </div>
              <p className="text-white text-center sm:text-left font-medium">
                © {new Date().getFullYear()} Addie's Art Station. All rights
                reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <DarkModeToggle />
              <div className="text-white/80 text-sm">
                Made with 💕 for art lovers
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
