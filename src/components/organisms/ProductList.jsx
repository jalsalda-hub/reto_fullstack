import { useEffect } from 'react';
import ProductCard from '../molecules/ProductCard';
import { useProductStore } from '../../store/useProductStore';
import Button from '../atoms/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductList = () => {
  const { 
    loadInitialData, 
    getPaginatedProducts, 
    getTotalPages, 
    currentPage, 
    setPage,
    isLoading,
    error
  } = useProductStore();

  useEffect(() => {
    // Al montar el componente, cargamos los datos iniciales
    loadInitialData();
  }, [loadInitialData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hexa-dark"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const products = getPaginatedProducts();
  const totalPages = getTotalPages();

  const handlePrevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-xl font-medium">No se encontraron productos.</p>
        <p>Prueba buscando con otros términos.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Grid de Productos estricto a 6 ítems por capa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Controles de Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-6 mt-12 py-6 border-t border-gray-200">
          <Button 
            variant="secondary" 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            className={`flex items-center justify-center ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronLeft size={20} className="mr-1" /> Anterior
          </Button>
          
          <span className="text-gray-700 dark:text-white font-medium">
            Página {currentPage} de {totalPages}
          </span>
          
          <Button 
            variant="secondary" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Siguiente <ChevronRight size={20} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;