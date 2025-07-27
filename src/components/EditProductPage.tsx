import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

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

      toast.success("Product updated successfully!");
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
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-900 dark:text-gray-100">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Edit Product
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Update the details for "{product.title}"
        </p>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-pink-200 dark:border-pink-700">
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
          <div>
            <label className="block text-purple-700 dark:text-purple-300 font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 outline-none transition-colors"
              placeholder="Product title"
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
              placeholder="Product description"
              required
            />
          </div>

          <div>
            <label className="block text-purple-700 dark:text-purple-300 font-medium mb-2">
              Price (USD) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 outline-none transition-colors"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-purple-700 dark:text-purple-300 font-medium mb-2">
              New Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {product.imageUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Current image:
                </p>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-purple-700 dark:text-purple-300 font-medium mb-2">
              New Video (optional)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {product.videoUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Current video:
                </p>
                <video
                  src={product.videoUrl}
                  className="w-64 h-36 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  controls
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={() => void navigate(`/product/${productId}`)}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-2xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
