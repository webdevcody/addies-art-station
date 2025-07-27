import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

// Loading component for better UX
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-600 dark:text-gray-400">
          Loading artwork...
        </span>
      </div>
    </div>
  );
}

export function BrowsePage() {
  const navigate = useNavigate();
  const products = useQuery(api.products.list, { status: "available" }) || [];
  const isAdmin = useQuery(api.admin.isAdmin) || false;
  const isLoading =
    useQuery(api.products.list, { status: "available" }) === undefined;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🎨</span>
                <h1 className="text-4xl font-bold">Browse Artwork</h1>
              </div>
              <p className="text-purple-100 text-lg max-w-2xl">
                Discover my collection of unique, handcrafted pieces. Each
                artwork is an original creation made with passion and attention
                to detail.
              </p>
            </div>
            <div className="text-6xl opacity-80">✨</div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
            <LoadingSpinner />
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-8xl mb-6 opacity-50">🎨</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              No Artwork Available
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Check back soon for new pieces, or contact me about custom
              commissions!
            </p>
            <button
              onClick={() => void navigate("/contact")}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Contact for Custom Work ✨
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Products Grid */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <span className="text-3xl">🖼️</span>
                  Available Artwork
                </h2>
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                  {products.length} piece{products.length !== 1 ? "s" : ""}{" "}
                  available
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                    onClick={() => void navigate(`/product/${product._id}`)}
                  >
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 flex items-center justify-center">
                          <span className="text-6xl opacity-70">🎨</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                          {formatCurrency(product.price / 100)}
                        </span>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <span className="text-sm">✅</span>
                          Available
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action for visitors */}
            {!isAdmin && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg border border-purple-200 dark:border-purple-700">
                <div className="text-center max-w-3xl mx-auto">
                  <div className="text-6xl mb-6">💕</div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Love what you see?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                    Get in touch to discuss custom commissions, ask questions
                    about available pieces, or just say hello! I'd love to hear
                    from you and help you find the perfect piece for your space.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/50 dark:bg-gray-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">💌</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Custom Commissions
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        I'd love to create something unique just for you
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/50 dark:bg-gray-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">❓</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Have Questions?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Ask about any piece, materials, or sizing
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/50 dark:bg-gray-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">👋</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Say Hello
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        I love connecting with art enthusiasts!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => void navigate("/contact")}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Contact Me ✨
                  </button>
                </div>
              </div>
            )}

            {/* Artist Quote */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center max-w-2xl mx-auto">
                <div className="text-5xl mb-6">🎨</div>
                <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "Art is not what you see, but what you make others see. Every
                  piece I create is an invitation to feel, to dream, and to find
                  beauty in the everyday."
                </blockquote>
                <cite className="text-purple-600 dark:text-purple-400 font-semibold">
                  - Addie ✨
                </cite>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
