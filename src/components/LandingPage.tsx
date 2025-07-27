import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  const allProducts =
    useQuery(api.products.list, { status: "available" }) || [];
  const featuredProducts = allProducts.slice(0, 3);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl shadow-lg border border-purple-200 dark:border-purple-700">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-6xl mb-6">🎨</div>
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
              onClick={() => void navigate("/browse")}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Browse All Artwork ✨
            </button>
            <button
              onClick={() => void navigate("/contact")}
              className="px-8 py-4 border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 rounded-2xl font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch 💌
            </button>
          </div>
        </div>
      </section>

      {/* Featured Artwork */}
      {featuredProducts.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">⭐</div>
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
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
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
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(product.price / 100)}
                    </span>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <span className="text-sm">✅</span>
                      Available
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => void navigate("/browse")}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Artwork 🎨
            </button>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">👩‍🎨</div>
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
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🎨</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                Handcrafted
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Every piece is lovingly created by hand
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">✨</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                Unique
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Original designs you won't find anywhere else
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">💝</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
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
