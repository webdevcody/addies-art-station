import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const products = useQuery(api.products.list, {}) || [];
  const createProduct = useMutation(api.products.create);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    try {
      let imageId, videoId;

      // Upload image if provided
      if (imageFile) {
        const imageUploadUrl = await generateUploadUrl();
        const imageResult = await fetch(imageUploadUrl, {
          method: "POST",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });
        const imageJson = await imageResult.json();
        if (!imageResult.ok) throw new Error("Image upload failed");
        imageId = imageJson.storageId;
      }

      // Upload video if provided
      if (videoFile) {
        const videoUploadUrl = await generateUploadUrl();
        const videoResult = await fetch(videoUploadUrl, {
          method: "POST",
          headers: { "Content-Type": videoFile.type },
          body: videoFile,
        });
        const videoJson = await videoResult.json();
        if (!videoResult.ok) throw new Error("Video upload failed");
        videoId = videoJson.storageId;
      }

      await createProduct({
        title,
        description,
        price: Math.round(parseFloat(price) * 100), // Convert to cents
        imageId,
        videoId,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setImageFile(null);
      setVideoFile(null);

      toast.success("Product created successfully! 🎉");
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Admin Dashboard 👑
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Add new artwork to your shop
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Add Product Form */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-pink-200 dark:border-pink-700">
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6">
            Add New Artwork
          </h2>

          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-purple-700 dark:text-purple-300 font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 outline-none transition-colors"
                placeholder="My Amazing Drawing"
                required
              />
            </div>

            <div>
              <label className="block text-purple-700 dark:text-purple-300 font-medium mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 outline-none transition-colors resize-none"
                placeholder="Tell everyone about your artwork..."
                required
              />
            </div>

            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-purple-400 outline-none transition-colors"
                placeholder="9.99"
                required
              />
            </div>

            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-purple-400 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-purple-700 font-medium mb-2">
                Video (optional)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-purple-400 outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Creating..." : "Create Artwork ✨"}
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-purple-200 dark:border-purple-700">
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6">
            Your Artwork ({products.length})
          </h2>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex gap-4 p-4 bg-white/50 rounded-2xl border border-pink-200"
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🎨</span>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-bold text-purple-700">{product.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-pink-600">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🎨</div>
                <p className="text-gray-600">
                  No artwork yet. Create your first piece!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
