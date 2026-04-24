import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../utils/formatPrice';
import Button from '../components/atoms/Button';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    addToCart, 
    decreaseQuantity, 
    removeFromCart, 
    clearCart,
    getTotalItems,
    getTotalPrice 
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6 text-gray-400">
          <ShoppingBag size={64} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Parece que aún no has añadido ningún producto a tu carrito. Explora nuestro catálogo y encuentra lo que buscas.
        </p>
        <Button variant="primary" onClick={() => navigate('/')} className="flex items-center gap-2">
          <ArrowLeft size={20} /> Volver a la Tienda
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
        <span className="text-gray-500 font-medium">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Lista de productos */}
        <div className="lg:w-2/3">
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow relative transition-shadow">
                
                {/* Imagen */}
                <div className="w-full sm:w-32 h-32 sm:h-full bg-gray-50 rounded-lg overflow-hidden mb-4 sm:mb-0 flex-shrink-0 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Info */}
                <div className="sm:ml-6 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start pr-8 sm:pr-0">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.category}</p>
                      <h3 
                        className="text-lg font-bold text-gray-900 cursor-pointer hover:underline"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-bold text-lg text-gray-900 border-l border-gray-100 pl-4 ml-4 hidden sm:block">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  
                  {/* Controles de cantidad */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden w-max">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <div className="w-10 text-center font-medium text-sm border-x border-gray-300 py-1.5">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => addToCart(item, 1)} // Añade 1 más
                        className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Precio responsivo (mobile) */}
                    <p className="font-bold text-lg text-gray-900 sm:hidden">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>

                {/* Botón Borrar */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 rounded-full hover:bg-red-50"
                  title="Eliminar producto"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button 
              onClick={() => navigate('/')}
              className="text-hexa-dark font-medium hover:underline flex items-center text-sm"
            >
              <ArrowLeft size={16} className="mr-1" /> Continuar Comprando
            </button>
            <button 
              onClick={clearCart}
              className="text-red-500 font-medium hover:underline text-sm"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>

        {/* Resumen del Pedido */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <span>Envío estimado</span>
                <span className="font-medium text-green-600">Gratis</span>
              </div>
              
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Button 
              variant="primary" 
              className="w-full py-4 text-lg font-bold shadow-md hover:shadow-lg"
              onClick={() => navigate('/checkout')}
            >
              Proceder al Checkout
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-6">
              Los impuestos y gastos de envío reales se calcularán en el checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;