import { Link, NavLink } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLocalCart } from "../lib/cartLocal";
import { Authenticated } from "convex/react";

export function Header() {
  const [cart] = useLocalCart();
  const isAdmin = useQuery(api.admin.isAdmin) || false;

  return (
    <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              🎨
            </div>
            <span className="hidden sm:block">Addie's Art Station</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex gap-2">
            <NavLinkWrapper to="/browse" label="Browse Art" icon="🖼️" />
            <NavLinkWrapper to="/contact" label="Contact Me" icon="💌" />
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu for Navigation (hidden on desktop) */}
          <div className="md:hidden flex gap-2">
            <NavLinkWrapper to="/browse" label="Browse" icon="🖼️" />
            <NavLinkWrapper to="/contact" label="Contact" icon="💌" />
          </div>

          {/* Admin Button */}
          <Authenticated>
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }: { isActive: boolean }) =>
                  `px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105"
                      : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 hover:shadow-lg hover:scale-105"
                  }`
                }
              >
                <span className="text-lg">👑</span>
                <span className="hidden sm:block">Admin</span>
              </NavLink>
            )}
          </Authenticated>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative p-3 rounded-xl text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300 group"
            aria-label="Cart"
            title="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 group-hover:scale-110 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

function navLinkClassName({ isActive }: { isActive: boolean }): string {
  return `px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
    isActive
      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-lg transform scale-105"
      : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105"
  }`;
}

function NavLinkWrapper({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: string;
}) {
  return (
    <NavLink to={to} className={navLinkClassName}>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
