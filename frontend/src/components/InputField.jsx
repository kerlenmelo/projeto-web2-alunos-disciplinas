export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className={`border p-2 rounded ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
