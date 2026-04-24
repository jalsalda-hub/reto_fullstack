import { Search } from 'lucide-react';
import { Input } from '../atoms/Input';
import { useProductStore } from '../../store/useProductStore';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useProductStore();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-sm hidden md:flex items-center">
      <Input 
        placeholder="Buscar productos..." 
        className="pr-10 rounded-full" 
        value={searchQuery}
        onChange={handleSearch}
      />
      <Search className="absolute right-3 text-hexa-gray w-5 h-5 cursor-pointer hover:text-hexa-dark" />
    </div>
  );
};
