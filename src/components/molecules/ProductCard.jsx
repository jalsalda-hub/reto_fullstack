import { ShoppingCart, Eye, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useProductStore } from '../../store/useProductStore';
import { translateProduct } from '../../utils/translations';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../atoms/Button';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const language = useProductStore((state) => state.language);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const locProduct = translateProduct(product, language);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita navegar si el contenedor tuviera un onClick
    addToCart(product, 1);
  };

  const handleQuickView = (e) => {
    e.stopPropagation(); // Previene la navegación al hacer clic en el ojo
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
        <div className="relative h-64 overflow-hidden bg-gray-100 cursor-pointer flex-shrink-0" onClick={() => navigate(`/product/${product.id}`)}>
          <img 
            src={locProduct.image} 
            alt={locProduct.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Hover Overlay - Vista Rápida */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleQuickView}
              className="bg-white text-gray-900 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-900 hover:text-white" 
              title={language === 'es' ? 'Vista rápida' : 'Quick view'}
            >
              <Eye size={24} />
            </button>
          </div>

          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-sm">
            {formatPrice(locProduct.price)}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <p className="text-sm text-gray-500 mb-1 font-medium uppercase">{locProduct.category}</p>
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{locProduct.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{locProduct.description}</p>
          
          <div className="flex items-center justify-between mt-auto border-t pt-4">
            <Button 
              variant="secondary" 
              className="flex-1 mr-2 text-sm text-center py-2"
              onClick={() => navigate(`/product/${locProduct.id}`)}
            >
              {language === 'es' ? 'Ver Detalle' : 'View Details'}
            </Button>
            <Button 
              variant="primary" 
              className="p-2 flex items-center justify-center"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Vista Rápida */}
      {isQuickViewOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" 
          onClick={(e) => { e.stopPropagation(); setIsQuickViewOpen(false); }}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative animate-fadeIn" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-red-50 rounded-full p-2 transition-colors z-10"
              title="Cerrar"
            >
              <X size={20} />
            </button>
            
            <div className="md:w-1/2 p-6 flex justify-center items-center bg-gray-50 relative">
              <img 
                src={locProduct.image} 
                alt={locProduct.title} 
                className="max-h-[50vh] md:max-h-[70vh] object-contain mix-blend-multiply" 
                referrerPolicy="no-referrer" 
              />
            </div>
            
            <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">{locProduct.category}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{locProduct.title}</h2>
              <p className="text-3xl font-bold text-gray-900 mb-6">{formatPrice(locProduct.price)}</p>
              
              <div className="prose prose-sm text-gray-600 mb-8 flex-1">
                <p>{locProduct.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100">
                <Button 
                  variant="primary" 
                  className="flex-1 flex justify-center items-center gap-2 py-3 text-base" 
                  onClick={() => { 
                    addToCart(product, 1); 
                    setIsQuickViewOpen(false); 
                  }}
                >
                  <ShoppingCart size={20} />
                  {language === 'es' ? 'Añadir al Carrito' : 'Add to Cart'}
                </Button>
                <Button 
                  variant="outline" 
                  className="sm:w-1/3 py-3 text-base" 
                  onClick={() => {
                    setIsQuickViewOpen(false);
                    navigate(`/product/${product.id}`);
                  }}
                >
                  {language === 'es' ? 'Detalles' : 'Details'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;