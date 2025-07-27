import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

export function BrowsePage() {
  const navigate = useNavigate();
  const products = useQuery(api.products.list, { status: "available" }) || [];
  const isAdmin = useQuery(api.admin.isAdmin) || false;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Browse Artwork
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover my collection of unique, handcrafted pieces. Each artwork is
          an original creation made with passion and attention to detail.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-gray-400 dark:text-gray-500">
              🎨
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Artwork Available
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Check back soon for new pieces, or contact me about custom
            commissions!
          </p>
          <button
            onClick={() => {
              void navigate("/contact");
            }}
            className="px-6 py-3 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-400 transition-colors"
          >
            Contact for Custom Work
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => {
                void navigate(`/product/${product._id}`);
              }}
            >
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <span className="text-6xl">🎨</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    ${(product.price / 100).toFixed(2)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === "available"
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    }`}
                  >
                    {product.status === "available" ? "Available" : "Sold"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to action for visitors */}
      {!isAdmin && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Love what you see?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Get in touch to discuss custom commissions, ask questions about
            available pieces, or just say hello! I'd love to hear from you.
          </p>
          <button
            onClick={() => {
              void navigate("/contact");
            }}
            className="px-8 py-3 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-400 transition-colors font-semibold"
          >
            Contact Me
          </button>
        </div>
      )}
    </div>
  );
}
