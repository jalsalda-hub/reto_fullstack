export const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const baseStyle = "px-6 py-2 font-medium transition-all duration-300 focus:outline-none";
  const variants = {
    primary: "bg-hexa-dark text-white hover:bg-black",
    outline: "border-2 border-hexa-dark text-hexa-dark hover:bg-hexa-dark hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
