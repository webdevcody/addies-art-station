import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearCart } from "../lib/cartLocal";

export function SuccessPage() {
  const navigate = useNavigate();

  // Clear the cart when user reaches success page (indicating successful payment)
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Success Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Thank You!
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Your order has been placed successfully!
            </p>
          </div>

          {/* What happens next card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 max-w-md mx-auto shadow-lg border border-purple-200 dark:border-purple-700 mb-8">
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-6 flex items-center justify-center gap-2">
              <span className="text-2xl">✨</span>
              What happens next?
            </h3>
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">📧</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  You'll receive an email confirmation
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🎨</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Your artwork will be carefully packaged
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">🚚</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  We'll ship it to you with love!
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => void navigate("/browse")}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Browse More Art ✨
          </button>
        </div>

        {/* Additional Information Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Order Information */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-4xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Order Details
              </h2>
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Status:
                  </span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    Processing
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Estimated Delivery:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    5-7 business days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Tracking:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Email coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg border border-purple-200 dark:border-purple-700">
            <div className="text-center">
              <div className="text-4xl mb-4">💌</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Need Help?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Have questions about your order? I'm here to help! Feel free to
                reach out anytime.
              </p>
              <button
                onClick={() => void navigate("/contact")}
                className="px-6 py-3 border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 transform hover:scale-105"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 shadow-xl text-center">
          <div className="text-white">
            <div className="text-5xl mb-4">💕</div>
            <h2 className="text-3xl font-bold mb-4">
              Thank you for supporting my art!
            </h2>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto leading-relaxed">
              Your purchase means the world to me and helps me continue creating
              beautiful pieces. I can't wait for you to enjoy your new artwork!
            </p>
            <p className="text-purple-200 mt-4 font-semibold">- Addie ✨</p>
          </div>
        </div>
      </div>
    </div>
  );
}
