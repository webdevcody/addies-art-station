import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  const allProducts =
    useQuery(api.products.list, { status: "available" }) || [];
  const featuredProducts = allProducts.slice(0, 3);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Addie's Art Station
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover unique, handcrafted artwork that brings color and joy to
            your space. Each piece tells a story and is created with passion and
            attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                void navigate("/browse");
              }}
              className="px-8 py-4 bg-purple-600 dark:bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-700 dark:hover:bg-purple-400 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Browse All Artwork
            </button>
            <button
              onClick={() => {
                void navigate("/contact");
              }}
              className="px-8 py-4 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-xl font-semibold hover:bg-purple-600 dark:hover:bg-purple-400 hover:text-white transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Featured Artwork */}
      {featuredProducts.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Featured Artwork
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A curated selection of my latest and most popular pieces
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
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
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
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

          <div className="text-center mt-12">
            <button
              onClick={() => {
                void navigate("/browse");
              }}
              className="px-8 py-3 bg-purple-600 dark:bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-400 transition-colors"
            >
              View All Artwork
            </button>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About the Artist
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Hi, I'm Addie! I'm a passionate artist who loves creating vibrant,
            meaningful pieces that bring joy to people's lives. Each artwork is
            carefully crafted with love and attention to detail, using
            high-quality materials that ensure your piece will be treasured for
            years to come.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Handcrafted
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Every piece is lovingly created by hand
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Unique
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Original designs you won't find anywhere else
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Made with Love
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Passion and care in every brushstroke
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
