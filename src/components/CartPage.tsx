import { useLocalCart, clearCart, removeFromCart } from "../lib/cartLocal";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Id } from "../../convex/_generated/dataModel";
import { Button } from "./Button";

export function CartPage() {
  const [cart, setCart] = useLocalCart();
  // Convert productId strings to Convex Id<"products"> for the query
  const productIds = cart.map((item) => item.productId as Id<"products">);
  const products = useQuery(api.products.getMany, { ids: productIds }) || [];

  const getProduct = (id: string) =>
    products.find((p) => p && p._id === (id as Id<"products">));

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const handleClear = () => {
    clearCart();
    setCart([]);
  };

  const total = cart.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">
          Your cart is empty.
        </div>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-6">
            {cart.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              return (
                <li key={item.productId} className="flex items-center py-4">
                  <img
                    src={product.imageId ? (product.imageUrl ?? undefined) : ""}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded mr-4 border border-gray-200 dark:border-gray-700"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {product.title}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.quantity} × ${(product.price / 100).toFixed(2)}
                    </div>
                  </div>
                  <Button
                    variant="outlineSecondary"
                    className="ml-4"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Remove
                  </Button>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
              Total: ${(total / 100).toFixed(2)}
            </div>
            <Button variant="outlineSecondary" onClick={handleClear}>
              Clear Cart
            </Button>
          </div>
          <Link to="/checkout" className="btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
