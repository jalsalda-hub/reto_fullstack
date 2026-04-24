import { Link } from 'react-router-dom';
import { SearchBar } from '../molecules/SearchBar';
import { UserActions } from '../molecules/UserActions';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center h-full">
          <Link to="/">
            {/* Replace with actual image asset if you have it: <img src="/assets/images/logo.png" alt="Hexashop" /> */}
            <h1 className="text-2xl font-bold tracking-tighter uppercase text-hexa-dark">Hexashop</h1>
          </Link>
        </div>

        {/* Molecule: Search */}
        <SearchBar />

        {/* Molecule: User & Cart Actions */}
        <UserActions />

      </div>
    </header>
  );
};
