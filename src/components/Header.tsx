import { Link, NavLink } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLocalCart } from "../lib/cartLocal";
import { Authenticated } from "convex/react";

export function Header() {
  const [cart] = useLocalCart();
  const isAdmin = useQuery(api.admin.isAdmin) || false;

  return (
    <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm h-16 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 shadow-sm px-4">
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-2xl font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-2"
        >
          🎨 Addie's Art Station
        </Link>
        <nav className="flex gap-1">
          {/* Public navigation links */}
          <NavLinkWrapper to="/browse" label="Browse Art" />
          <NavLinkWrapper to="/contact" label="Contact Me" />
          {/* Admin-only navigation links */}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Authenticated>
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }: { isActive: boolean }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </Authenticated>
        <Link
          to="/cart"
          className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
          aria-label="Cart"
          title="Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
            />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 dark:bg-pink-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

function navLinkClassName({ isActive }: { isActive: boolean }): string {
  return `px-4 py-2 rounded-lg font-medium transition-colors ${
    isActive
      ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
      : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
  }`;
}

function NavLinkWrapper({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className={navLinkClassName}>
      {label}
    </NavLink>
  );
}
