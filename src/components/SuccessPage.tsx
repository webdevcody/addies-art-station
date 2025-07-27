import { useNavigate } from "react-router-dom";

export function SuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <div className="text-8xl mb-4">🎉</div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Thank You!
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
          Your order has been placed successfully!
        </p>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto shadow-lg border-2 border-pink-200 dark:border-pink-700 mb-8">
        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">
          What happens next?
        </h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📧</span>
            <span className="text-gray-700 dark:text-gray-300">
              You'll receive an email confirmation
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <span className="text-gray-700 dark:text-gray-300">
              Your artwork will be carefully packaged
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚚</span>
            <span className="text-gray-700 dark:text-gray-300">
              We'll ship it to you with love!
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          void navigate("/browse");
        }}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all"
      >
        Browse More Art
      </button>
    </div>
  );
}
