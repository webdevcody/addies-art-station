import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { addToCart, useLocalCart } from "../lib/cartLocal";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { Button } from "./Button";
import { toast } from "sonner";

// Loading component for better UX
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-600 dark:text-gray-400">
          Loading artwork...
        </span>
      </div>
    </div>
  );
}

export function ProductPage({
  productId: propProductId,
}: {
  productId?: string;
}) {
  const { productId: routeProductId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  // Convert to Convex Id type if present
  const productId = (propProductId || routeProductId) as
    | Id<"products">
    | undefined;
  const product = useQuery(
    api.products.get,
    productId ? { id: productId } : "skip"
  );
  const isAdmin = useQuery(api.admin.isAdmin) || false;
  const [cart] = useLocalCart();
  const [added, setAdded] = useState(false);

  const isLoading = product === undefined && productId;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleAdd = () => {
    if (!product) return;

    const itemInCart = cart.find((item) => item.productId === product._id);
    if (itemInCart) {
      toast.error("This item is already in your cart.", {
        dismissible: true,
      });
      return;
    }
    addToCart(product._id, 1);
    setAdded(true);
    toast.success("Added to cart! 🎉", {
      dismissible: true,
    });
    setTimeout(() => setAdded(false), 1200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
        <div className="max-w-6xl mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-8xl mb-6 opacity-50">🎨</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Artwork not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              The artwork you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => void navigate("/browse")}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Browse All Artwork
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <button
            onClick={() => void navigate("/browse")}
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Browse
          </button>
        </div>

        {/* Main Product Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  <span className="text-8xl opacity-50">🎨</span>
                </div>
              )}
            </div>

            {/* Video if available */}
            {product.videoUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span className="text-xl">🎬</span>
                  Video Preview
                </h3>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <video
                    src={product.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    poster={product.imageUrl || undefined}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Info Card */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              {/* Status Badge */}
              <div className="mb-4">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    product.status === "available"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                  }`}
                >
                  <span className="text-lg">
                    {product.status === "available" ? "✅" : "🔴"}
                  </span>
                  {product.status === "available" ? "Available" : "Sold"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {product.title}
              </h1>

              {/* Price */}
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-6">
                {formatCurrency(product.price / 100)}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  About This Artwork
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {product.status === "available" && (
                  <button
                    onClick={handleAdd}
                    disabled={added}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-2xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {added ? (
                      <>
                        <span className="text-xl">✅</span>
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <span className="text-xl">🛍️</span>
                        Add to Cart
                      </>
                    )}
                  </button>
                )}

                {isAdmin && (
                  <button
                    onClick={() =>
                      void navigate(`/product/${product._id}/edit`)
                    }
                    className="px-6 py-4 border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 rounded-2xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">✏️</span>
                    Edit Product
                  </button>
                )}
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="text-2xl">💎</span>
                Why Choose This Artwork?
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Handcrafted with passion and attention to detail
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 dark:bg-pink-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Original artwork - you won't find this anywhere else
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    High-quality materials for lasting beauty
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 dark:bg-pink-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Carefully packaged and shipped with love
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl">
                <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                  "Each piece I create is infused with emotion and meaning. I
                  hope this artwork brings as much joy to your space as it
                  brought me to create."
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  - Addie ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Love this piece? 💕
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Explore more of my collection or get in touch to discuss custom
            commissions!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => void navigate("/browse")}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              Browse More Art
            </button>
            <button
              onClick={() => void navigate("/contact")}
              className="px-8 py-3 border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 font-semibold rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
