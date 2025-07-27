import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "@convex-dev/auth/react";

type NavItem = {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  badge?: number;
};

// Loading component for better UX
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-600 dark:text-gray-400">Loading...</span>
      </div>
    </div>
  );
}

export function AdminPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const navigate = useNavigate();
  const { signOut } = useAuthActions();

  const products = useQuery(api.products.list, {}) || [];
  const productsLoading = useQuery(api.products.list, {}) === undefined;

  // Get orders by status
  const pendingOrders =
    useQuery(api.orders.getOrdersByStatus, { status: "pending" }) || [];
  const completedOrders =
    useQuery(api.orders.getOrdersByStatus, { status: "completed" }) || [];
  const shippedOrders =
    useQuery(api.orders.getOrdersByStatus, { status: "toShip" }) || [];

  // Calculate dashboard metrics
  const totalValue = products.reduce((sum, p) => sum + p.price, 0) / 100;
  const availableProducts = products.filter(
    (p) => p.status === "available"
  ).length;
  const soldProducts = products.filter((p) => p.status === "sold").length;

  const handleGoToBrowse = () => {
    void navigate("/browse");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      void navigate("/");
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      active: activeNav === "dashboard",
    },
    {
      id: "pending",
      label: "Pending",
      icon: "⏳",
      active: activeNav === "pending",
      badge: pendingOrders.length,
    },
    {
      id: "completed",
      label: "Completed",
      icon: "✅",
      active: activeNav === "completed",
      badge: completedOrders.length,
    },
    {
      id: "shipped",
      label: "Shipped",
      icon: "🚚",
      active: activeNav === "shipped",
      badge: shippedOrders.length,
    },
    {
      id: "add-artwork",
      label: "Add Artwork",
      icon: "🎨",
      active: activeNav === "add-artwork",
    },
  ];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderMetricCard = (
    title: string,
    value: string | number,
    icon: string,
    color: string,
    subtitle?: string
  ) => (
    <div
      className={`bg-gradient-to-br ${color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  const renderOrdersList = (orders: any[], status: string) => {
    const statusColors = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
      shipped:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
    };

    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  Order #{order._id.slice(-8)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(order._creationTime)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}
              >
                {status}
              </span>
            </div>

            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex-1">
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      x{item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency((item.price * item.quantity) / 100)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  Total
                </span>
                <span className="font-bold text-lg text-purple-600 dark:text-purple-400">
                  {formatCurrency(order.total / 100)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">
              {status === "pending"
                ? "⏳"
                : status === "completed"
                  ? "✅"
                  : "🚚"}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No {status} orders
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {status === "pending"
                ? "Orders will appear here when customers place them"
                : status === "completed"
                  ? "Completed orders will appear here"
                  : "Shipped orders will appear here"}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderDashboard = () => {
    if (productsLoading) {
      return <LoadingSpinner />;
    }

    return (
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
              <p className="text-purple-100 text-lg">
                Here's what's happening with your art business today
              </p>
            </div>
            <div className="text-6xl opacity-80">🎨</div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderMetricCard(
            "Total Artworks",
            products.length,
            "🎨",
            "from-pink-500 to-purple-500",
            `${availableProducts} available, ${soldProducts} sold`
          )}
          {renderMetricCard(
            "Total Value",
            formatCurrency(totalValue),
            "💰",
            "from-green-500 to-emerald-500",
            "Combined value of all artworks"
          )}
          {renderMetricCard(
            "Pending Orders",
            pendingOrders.length,
            "📦",
            "from-orange-500 to-red-500",
            "Awaiting processing"
          )}
          {renderMetricCard(
            "Revenue",
            formatCurrency(
              completedOrders.reduce((sum, order) => sum + order.total, 0) / 100
            ),
            "💎",
            "from-blue-500 to-cyan-500",
            "From completed orders"
          )}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Artwork */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Recent Artwork
              </h2>
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                {products.length} total
              </span>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                      <span className="text-xl">🎨</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        {formatCurrency(product.price / 100)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === "available"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">🎨</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No artwork yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Create your first piece to get started
                  </p>
                  <button
                    onClick={() => setActiveNav("add-artwork")}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Add Your First Artwork ✨
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Recent Orders
              </h2>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                {pendingOrders.length +
                  completedOrders.length +
                  shippedOrders.length}{" "}
                total
              </span>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[...pendingOrders, ...completedOrders, ...shippedOrders]
                .sort((a, b) => b._creationTime - a._creationTime)
                .slice(0, 5)
                .map((order) => (
                  <div
                    key={order._id}
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          Order #{order._id.slice(-8)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(order._creationTime)}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {formatCurrency(order.total / 100)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                ))}

              {pendingOrders.length +
                completedOrders.length +
                shippedOrders.length ===
                0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">📦</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Orders will appear here when customers make purchases
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return renderDashboard();

      case "add-artwork":
        return <AddArtworkForm />;

      case "pending":
        return (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Pending Orders
              </h2>
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                {pendingOrders.length} orders
              </span>
            </div>
            {renderOrdersList(pendingOrders, "pending")}
          </div>
        );

      case "completed":
        return (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Completed Orders
              </h2>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                {completedOrders.length} orders
              </span>
            </div>
            {renderOrdersList(completedOrders, "completed")}
          </div>
        );

      case "shipped":
        return (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Shipped Orders
              </h2>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {shippedOrders.length} orders
              </span>
            </div>
            {renderOrdersList(shippedOrders, "shipped")}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Scrollable Side Navigation */}
      <div className="flex-shrink-0 w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 shadow-lg overflow-y-auto">
        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                👑
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Addie's Art Station
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  item.active
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      item.active
                        ? "bg-white/20 text-white"
                        : "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Quick Stats
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Artworks:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {products.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Orders:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {pendingOrders.length +
                    completedOrders.length +
                    shippedOrders.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Revenue:
                </span>
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  {formatCurrency(
                    completedOrders.reduce(
                      (sum, order) => sum + order.total,
                      0
                    ) / 100
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 space-y-2">
            <button
              onClick={handleGoToBrowse}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-xl">🛍️</span>
              <span className="font-medium">Browse Products</span>
            </button>

            <button
              onClick={() => {
                void handleSignOut();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <span className="text-xl">🚪</span>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

// Separate component for the Add Artwork form
function AddArtworkForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Add New Artwork
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Share your creativity with the world
          </p>
        </div>

        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-3">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 outline-none transition-all duration-300"
              placeholder="My Amazing Drawing"
              required
            />
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-3">
                Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 dark:file:bg-purple-900/30 file:text-purple-700 dark:file:text-purple-300 hover:file:bg-purple-100 dark:hover:file:bg-purple-900/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-900 dark:text-gray-100 font-semibold mb-3">
                Video (optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 dark:file:bg-purple-900/30 file:text-purple-700 dark:file:text-purple-300 hover:file:bg-purple-100 dark:hover:file:bg-purple-900/50"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          >
            {isUploading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </div>
            ) : (
              "Create Artwork ✨"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
