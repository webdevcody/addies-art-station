import { useLocalCart, clearCart, removeFromCart } from "../lib/cartLocal";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Id } from "../../convex/_generated/dataModel";
import { Button } from "./Button";

// Loading component for better UX
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-600 dark:text-gray-400">
          Loading cart...
        </span>
      </div>
    </div>
  );
}

export function CartPage() {
  const [cart, setCart] = useLocalCart();
  // Convert productId strings to Convex Id<"products"> for the query
  const productIds = cart.map((item) => item.productId as Id<"products">);
  const products = useQuery(api.products.getMany, { ids: productIds }) || [];
  const isLoading =
    useQuery(api.products.getMany, { ids: productIds }) === undefined &&
    cart.length > 0;

  const getProduct = (id: string) =>
    products.find((p) => p && p._id === (id as Id<"products">));

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClear = () => {
    clearCart();
  };

  const total = cart.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🛍️</span>
                <h1 className="text-3xl font-bold">Your Cart</h1>
              </div>
              <p className="text-purple-100 text-lg">
                {cart.length === 0
                  ? "Your cart is waiting for some beautiful art"
                  : `${cart.length} item${cart.length !== 1 ? "s" : ""} ready for checkout`}
              </p>
            </div>
            <div className="text-6xl opacity-80">🎨</div>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-8xl mb-6 opacity-50">🛍️</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Discover beautiful, unique artwork that will bring joy to your
              space
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="text-xl">🎨</span>
              Browse Artwork
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-3xl">🎨</span>
                Cart Items
              </h2>

              <div className="space-y-4">
                {cart.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="w-24 h-24 object-cover rounded-xl shadow-md"
                            />
                          ) : (
                            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                              <span className="text-3xl">🎨</span>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {product.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Quantity: {item.quantity}
                            </span>
                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {formatCurrency(
                                (product.price * item.quantity) / 100
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="flex-shrink-0 p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 group"
                          title="Remove from cart"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-3xl">💳</span>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal ({cart.length} item{cart.length !== 1 ? "s" : ""})
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency(total / 100)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Free
                  </span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Total
                  </span>
                  <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(total / 100)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/checkout"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-4 px-6 rounded-2xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout ✨
                </Link>
                <button
                  onClick={handleClear}
                  className="px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="text-center">
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
