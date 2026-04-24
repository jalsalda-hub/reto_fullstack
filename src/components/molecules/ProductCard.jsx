import { ShoppingCart } from 'lucide-react';
import Button from '../atoms/Button';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-1 font-medium">{product.category}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <Button variant="secondary" className="flex-1 mr-2 text-sm text-center py-2">
            Ver Detalle
          </Button>
          <Button variant="primary" className="p-2 flex items-center justify-center">
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;