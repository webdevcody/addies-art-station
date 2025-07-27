import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outlineSecondary";
  className?: string;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseClass =
    "px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed";

  let variantClass = "";
  if (variant === "primary") {
    variantClass =
      "bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-400";
  } else if (variant === "outlineSecondary") {
    variantClass =
      "border-2 border-pink-500 dark:border-pink-400 text-pink-500 dark:text-pink-400 hover:bg-pink-500 dark:hover:bg-pink-400 hover:text-white";
  }

  return (
    <button
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    />
  );
}
