import { ShoppingCart, UserRound } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const UserActions = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <div className="flex items-center space-x-6">
      <button className="relative text-hexa-dark hover:text-black transition">
        <ShoppingCart className="w-6 h-6" />
        {/* Placeholder count */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
      </button>

      <div className="relative group cursor-pointer flex items-center space-x-2">
        <UserRound className="w-6 h-6 text-hexa-dark hover:text-black" />
        {isAuthenticated ? (
          <div className="flex flex-col items-start hidden sm:flex">
            <span className="text-xs text-gray-500">Hola, {user?.name || 'User'}</span>
            <button onClick={logout} className="text-xs font-semibold text-hexa-dark hover:underline">Salir</button>
          </div>
        ) : (
          <span className="text-sm font-semibold hidden sm:inline">Ingresar</span>
        )}
      </div>
    </div>
  );
};
