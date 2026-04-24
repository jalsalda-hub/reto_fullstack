import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';
import { translateProduct } from '../utils/translations';
import Button from '../components/atoms/Button';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, language } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setQuantity(1);
    }
    window.scrollTo(0, 0);
  }, [id, products]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => q > 1 ? q - 1 : 1);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-700">Producto no encontrado / Product not found</h2>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/')}>
          Volver al catálogo / Back to catalog
        </Button>
      </div>
    );
  }

  const locProduct = translateProduct(product, language);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> {language === 'es' ? 'Volver al catálogo' : 'Back to catalog'}
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-8">
          <img 
            src={locProduct.image} 
            alt={locProduct.title} 
            className="w-full max-h-[500px] object-cover rounded shadow-sm hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="md:w-1/2 flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-semibold tracking-widest uppercase mb-2">
            {locProduct.category}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{locProduct.title}</h1>
          <p className="text-3xl font-light text-gray-900 mb-6">${locProduct.price.toFixed(2)}</p>
          
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <p className="text-gray-600 leading-relaxed text-lg">
              {locProduct.description}
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-600 font-medium">{language === 'es' ? 'Cantidad:' : 'Quantity:'}</span>
            <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden">
              <button 
                onClick={handleDecrease}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <div className="w-12 text-center font-semibold border-x border-gray-300 py-2">
                {quantity}
              </div>
              <button 
                onClick={handleIncrease}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="primary" 
              className="flex-1 py-4 text-lg flex items-center justify-center gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5" />
              Añadir {quantity > 1 ? `${quantity} productos` : 'al Carrito'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;