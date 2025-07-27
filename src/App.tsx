import { Authenticated, Unauthenticated } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { BrowsePage } from "./components/BrowsePage";
import { ProductPage } from "./components/ProductPage";
import { CartPage } from "./components/CartPage";
import { AdminPage } from "./components/AdminPage";
import { SuccessPage } from "./components/SuccessPage";
import { AdminLoginPage } from "./components/AdminLoginPage";
import { ContactPage } from "./components/ContactPage";
import { useLocalCart } from "./lib/cartLocal";
import { Footer } from "./components/Footer";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { ReturnPolicyPage } from "./components/ReturnPolicyPage";

export default function App() {
  const [cart] = useLocalCart();
  // isAdmin logic unchanged
  // const isAdmin = useQuery(api.admin.isAdmin) || false;

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
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
              {/* <Authenticated>
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
                    Upload Artwork
                  </NavLink>
                )}
              </Authenticated> */}
            </nav>
          </div>
          <div className="flex items-center gap-4">
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

        <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route
              path="/secret-admin-portal-xyz789"
              element={<AdminLoginPage />}
            />

            <Route path="/product/:productId" element={<ProductPageRoute />} />
            <Route path="/cart" element={<CartPage />} />
            {/* <Route
              path="/admin"
              element={
                <Authenticated>
                  <RequireAdmin>
                    <AdminPage />
                  </RequireAdmin>
                </Authenticated>
              }
            /> */}
            <Route path="/success" element={<SuccessPage />} />

            {/* Redirect unknown routes to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

import React from "react";

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

// function RequireAdmin({ children }: { children: React.ReactElement }) {
//   const isAdmin = useQuery(api.admin.isAdmin) || false;
//   const navigate = useNavigate();

//   if (!isAdmin) {
//     return (
//       <div className="text-center py-12">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Access Restricted</h2>
//           <p className="text-gray-600 mb-6">This area is restricted to administrators only.</p>
//           <button
//             onClick={() => navigate("/")}
//             className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }
//   return children;
// }

function ProductPageRoute() {
  const { productId } = useParams<{ productId: string }>();
  if (!productId) return null;
  return <ProductPage productId={productId} />;
}
