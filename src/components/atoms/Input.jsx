export const Input = ({ type = 'text', placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 px-4 py-2 focus:border-hexa-dark focus:outline-none focus:ring-1 focus:ring-hexa-dark w-full ${className}`}
    />
  );
};
