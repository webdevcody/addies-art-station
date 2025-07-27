import { Link } from "react-router-dom";
import { DarkModeToggle } from "./DarkModeToggle";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Shop
          </h3>
          <ul>
            <li>
              <Link
                to="/browse"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Browse Art
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Support
          </h3>
          <ul>
            <li>
              <Link
                to="/contact"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/return-policy"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Return Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Legal
          </h3>
          <ul>
            <li>
              <Link
                to="/terms-of-service"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Admin
          </h3>
          <ul>
            <li>
              <Link
                to="/login"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-gray-700 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center sm:text-left text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Addie's Art Station. All rights
            reserved.
          </p>
          <DarkModeToggle />
        </div>
      </div>
    </footer>
  );
}
