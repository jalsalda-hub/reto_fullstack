export const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-2 font-medium transition-all duration-300 focus:outline-none";
  let variantStyle = "bg-hexa-dark text-white hover:bg-black";
  if (variant === 'outline') {
    variantStyle = "border-2 border-hexa-dark text-hexa-dark hover:bg-hexa-dark hover:text-white";
  } else if (variant === 'secondary') {
    variantStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
