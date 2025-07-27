import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { BrowsePage } from "./components/BrowsePage";
import { ProductPage } from "./components/ProductPage";
import { EditProductPage } from "./components/EditProductPage";
import { CartPage } from "./components/CartPage";
import { AdminPage } from "./components/AdminPage";
import { SuccessPage } from "./components/SuccessPage";
import { AdminLoginPage } from "./components/AdminLoginPage";
import { ContactPage } from "./components/ContactPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { ReturnPolicyPage } from "./components/ReturnPolicyPage";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route
            path="/admin"
            element={
              <Authenticated>
                <RequireAdmin>
                  <AdminPage />
                </RequireAdmin>
              </Authenticated>
            }
          />
        </Routes>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/login" element={<AdminLoginPage />} />

          <Route path="/product/:productId" element={<ProductPageRoute />} />
          <Route
            path="/product/:productId/edit"
            element={
              <Authenticated>
                <RequireAdmin>
                  <EditProductPage />
                </RequireAdmin>
              </Authenticated>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Redirect unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

import React from "react";

function RequireAdmin({ children }: { children: React.ReactElement }) {
  const isAdmin = useQuery(api.admin.isAdmin) || false;
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This area is restricted to administrators only.
          </p>
          <button
            onClick={() => void navigate("/")}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  return children;
}

function ProductPageRoute() {
  const { productId } = useParams<{ productId: string }>();
  if (!productId) return null;
  return <ProductPage productId={productId} />;
}
