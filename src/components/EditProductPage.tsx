import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

// Loading component for better UX
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-600 dark:text-gray-400">
          Loading product...
        </span>
      </div>
    </div>
  );
}

export function EditProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const product = useQuery(
    api.products.get,
    productId ? { id: productId as Id<"products"> } : "skip"
  );
  const updateProduct = useMutation(api.products.update);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);

  // Initialize form with product data when it loads
  if (product && isLoading) {
    setTitle(product.title);
    setDescription(product.description);
    setPrice((product.price / 100).toString());
    setIsLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !title || !description || !price) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);

    try {
      let imageId = product?.imageId;
      let videoId = product?.videoId;

      // Upload new image if provided
      if (imageFile) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });
        const { storageId } = await result.json();
        imageId = storageId;
      }

      // Upload new video if provided
      if (videoFile) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": videoFile.type },
          body: videoFile,
        });
        const { storageId } = await result.json();
        videoId = storageId;
      }

      await updateProduct({
        productId: productId as Id<"products">,
        title,
        description,
        price: Math.round(parseFloat(price) * 100),
        imageId,
        videoId,
      });

      toast.success("Product updated successfully! 🎉");
      void navigate(`/product/${productId}`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
        <div className="max-w-4xl mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <button
            onClick={() => void navigate(`/product/${productId}`)}
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
            Back to Product
          </button>
        </div>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">✏️</span>
                <h1 className="text-4xl font-bold">Edit Product</h1>
              </div>
              <p className="text-purple-100 text-lg">
                Update the details for "{product.title}"
              </p>
            </div>
            <div className="text-6xl opacity-80">🎨</div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-3">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 outline-none transition-all duration-300"
                placeholder="My Amazing Artwork"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-3">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 outline-none transition-all duration-300 resize-none"
                placeholder="Tell everyone about your artwork..."
                required
              />
            </div>

            {/* Price Field */}
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-3">
                Price (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 outline-none transition-all duration-300"
                  placeholder="9.99"
                  required
                />
              </div>
            </div>

            {/* Image Field */}
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-3">
                Update Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 dark:file:bg-purple-900/30 file:text-purple-700 dark:file:text-purple-300 hover:file:bg-purple-100 dark:hover:file:bg-purple-900/50"
              />
              {product.imageUrl && (
                <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <span className="text-lg">🖼️</span>
                    Current image:
                  </p>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-32 h-32 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
                  />
                </div>
              )}
            </div>

            {/* Video Field */}
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-3">
                Update Video (optional)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 dark:file:bg-purple-900/30 file:text-purple-700 dark:file:text-purple-300 hover:file:bg-purple-100 dark:hover:file:bg-purple-900/50"
              />
              {product.videoUrl && (
                <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <span className="text-lg">🎬</span>
                    Current video:
                  </p>
                  <video
                    src={product.videoUrl}
                    className="w-64 h-36 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
                    controls
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isUploading}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <span className="text-xl">💾</span>
                    Update Product
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => void navigate(`/product/${productId}`)}
                className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span className="text-xl">❌</span>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg border border-purple-200 dark:border-purple-700">
          <div className="text-center">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Tips for Great Product Updates
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-2xl text-white">📝</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Compelling Descriptions
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Include details about materials, inspiration, and what makes
                  this piece special
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-2xl text-white">📸</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  High-Quality Images
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Use good lighting and clear photos that show the artwork's
                  true colors and details
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-2xl text-white">💰</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Fair Pricing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Consider materials, time invested, and the value of your
                  artistic vision
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
