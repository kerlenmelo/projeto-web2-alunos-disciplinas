export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  const baseStyles =
    "px-4 py-2 rounded font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2";
  const typeStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  };

  const styles = `${baseStyles} ${
    typeStyles[className] || className
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  );
}
