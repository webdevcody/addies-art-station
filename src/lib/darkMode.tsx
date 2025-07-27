import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface DarkModeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to system
    const stored = localStorage.getItem("theme") as Theme;
    return stored || "system";
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      let shouldBeDark = false;

      if (theme === "dark") {
        shouldBeDark = true;
      } else if (theme === "light") {
        shouldBeDark = false;
      } else {
        // system
        shouldBeDark = mediaQuery.matches;
      }

      setIsDark(shouldBeDark);

      if (shouldBeDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    // Initial theme setup
    updateTheme();

    // Listen for system theme changes
    const handleChange = () => {
      if (theme === "system") {
        updateTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Store theme preference
    localStorage.setItem("theme", theme);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return (
    <DarkModeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
