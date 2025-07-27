import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { addToCart, useLocalCart } from "../lib/cartLocal";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { Button } from "./Button";
import { toast } from "sonner";

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

  if (!product)
    return <div className="text-gray-900 dark:text-gray-100">Loading...</div>;

  const handleAdd = () => {
    const itemInCart = cart.find((item) => item.productId === product._id);
    if (itemInCart) {
      toast.error("This item is already in your cart.", {
        dismissible: true,
      });
      return;
    }
    addToCart(product._id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="max-w-2xl mx-auto card p-8">
      <img
        src={product.imageId ? (product.imageUrl ?? undefined) : ""}
        alt={product.title}
        className="w-full h-80 object-cover rounded mb-6 border border-gray-200 dark:border-gray-700"
      />
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        {product.title}
      </h1>
      <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        ${(product.price / 100).toFixed(2)}
      </div>
      <div className="mb-6 text-gray-600 dark:text-gray-300">
        {product.description}
      </div>
      <div className="flex gap-4">
        <Button variant="primary" onClick={handleAdd} disabled={added}>
          {added ? "Added!" : "Add to Cart"}
        </Button>
        {isAdmin && (
          <Button
            variant="outlineSecondary"
            onClick={() => void navigate(`/product/${product._id}/edit`)}
          >
            Edit Product
          </Button>
        )}
      </div>
    </div>
  );
}
