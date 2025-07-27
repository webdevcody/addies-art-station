import { AdminSignInForm } from "./AdminSignInForm";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function AdminLoginPage() {
  const isAdmin = useQuery(api.admin.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      void navigate("/admin");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="mt-12 max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Admin Portal
        </h1>
        <AdminSignInForm />
      </div>
    </div>
  );
}
