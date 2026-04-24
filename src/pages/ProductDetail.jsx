import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import Button from '../components/atoms/Button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Buscamos el producto en el store por su ID
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    
    // Scrollear hacia arriba al montar
    window.scrollTo(0, 0);
  }, [id, products]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-700">Producto no encontrado</h2>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/')}>
          Volver al catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Volver al catálogo
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Imagen del Producto */}
        <div className="md:w-1/2 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-8">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full max-h-[500px] object-cover rounded shadow-sm hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Detalles del Producto */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-semibold tracking-widest uppercase mb-2">
            {product.category}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-3xl font-light text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="primary" className="flex-1 py-4 text-lg flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Añadir al Carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;