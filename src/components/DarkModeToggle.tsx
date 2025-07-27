import React from "react";
import { useDarkMode } from "../lib/darkMode";

export function DarkModeToggle() {
  const { theme, setTheme } = useDarkMode();

  const themes = [
    { value: "light" as const, label: "Light", icon: "☀️" },
    { value: "dark" as const, label: "Dark", icon: "🌙" },
    { value: "system" as const, label: "System", icon: "💻" },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Theme:
      </span>
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {themes.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              theme === value
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            title={`Switch to ${label.toLowerCase()} mode`}
          >
            <span className="text-xs">{icon}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
