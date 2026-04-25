import { ShoppingCart, UserRound, Globe, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import { useProductStore } from '../../store/useProductStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useNavigate } from 'react-router-dom';

export const UserActions = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const cart = useCartStore((state) => state.cart);
  const { language, toggleLanguage } = useProductStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex items-center space-x-6">
      <button 
        onClick={toggleTheme} 
        className="flex items-center text-hexa-dark hover:text-black font-medium transition dark:text-white"
        title="Cambiar tema"
      >
        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>

      <button 
        onClick={toggleLanguage} 
        className="flex items-center text-hexa-dark hover:text-black font-medium transition dark:text-white"
        title="Cambiar idioma"
      >
        <Globe className="w-5 h-5 mr-1" />
        {language.toUpperCase()}
      </button>

      <button 
        onClick={() => navigate('/cart')} 
        className="relative text-hexa-dark hover:text-black transition cursor-pointer"
        aria-label="Ver carrito"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <div className="relative group flex items-center space-x-2">
        {isAuthenticated ? (
          <>
            <img src={user?.avatar} alt="User Avatar" className="w-8 h-8 rounded-full border border-gray-200" />
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-xs text-gray-500">Hola, {user?.name || 'User'}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <button onClick={() => navigate('/admin')} className="text-xs font-bold text-blue-600 hover:underline">Admin</button>
                <span className="text-gray-300 text-[10px]">|</span>
                <button onClick={logout} className="text-xs font-semibold text-hexa-dark hover:underline">Salir</button>
              </div>
            </div>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className="flex items-center space-x-2 text-hexa-dark hover:text-black">
            <UserRound className="w-6 h-6" />
            <span className="text-sm font-semibold hidden sm:inline">Ingresar</span>
          </button>
        )}
      </div>
    </div>
  );
};
