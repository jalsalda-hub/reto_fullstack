import { Link } from 'react-router-dom';
import { SearchBar } from '../molecules/SearchBar';
import { UserActions } from '../molecules/UserActions';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Superior en Móvil / Izquierda en Desktop */}
        <div className="flex w-full md:w-auto items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold tracking-tighter uppercase text-hexa-dark">Hexashop</h1>
          </Link>
          
          {/* User Actions en Móvil */}
          <div className="md:hidden">
            <UserActions />
          </div>
        </div>

        {/* Molecule: Search (Centro en Desktop) */}
        <div className="w-full md:w-auto flex-1 max-w-xl md:mx-4">
          <SearchBar />
        </div>

        {/* Molecule: User & Cart Actions (Derecha en Desktop) */}
        <div className="hidden md:block">
          <UserActions />
        </div>

      </div>
    </header>
  );
};
