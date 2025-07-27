import { AdminSignInForm } from "./AdminSignInForm";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

export function AdminLoginPage() {
  const isAdmin = useQuery(api.admin.isAdmin);
  const navigate = useNavigate();

  const handleGoToAdmin = () => {
    void navigate("/admin");
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="mt-12 max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Admin Portal
        </h1>

        {isAdmin ? (
          <div className="text-center">
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium">
                You are already logged in as an administrator.
              </p>
            </div>
            <button
              onClick={handleGoToAdmin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Go to Admin Dashboard
            </button>
          </div>
        ) : (
          <AdminSignInForm />
        )}
      </div>
    </div>
  );
}
