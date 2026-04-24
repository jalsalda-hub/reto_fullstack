import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../utils/formatPrice';
import { Input } from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = getTotalPrice();

  // Redirigir si el carrito está vacío y no estamos en estado de éxito,
  // para que un usuario no entre a "/checkout" sin productos.
  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">No tienes productos en tu checkout.</p>
        <Button variant="primary" onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
    );
  }

  const handleCheckout = (e) => {
    e.preventDefault();
    // Simulamos el procesamiento del pago exitoso
    clearCart();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <CheckCircle className="text-green-500 w-24 h-24 mb-6" />
        <h2 className="text-4xl font-bold text-gray-800 mb-4">¡Compra Exitosa!</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Gracias por tu compra. Tu pedido está siendo procesado y pronto lo recibirás en la dirección indicada.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Seguir Comprando
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">Finalizar Compra</h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Formulario Estático de Envío y Pago */}
        <div className="lg:w-2/3 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Detalles de Envío y Pago</h2>
          
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <Input placeholder="Ej. Juan Pérez" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <Input type="email" placeholder="juan@correo.com" required />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Envío</label>
              <Input placeholder="Av. Paseo de la Reforma 123, CDMX" required />
            </div>

            <div className="border-t border-gray-100 pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Información de Tarjeta</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
                <Input placeholder="0000 0000 0000 0000" pattern="\d{16}" title="Ingresa 16 dígitos" required />
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Expedición</label>
                  <Input placeholder="MM/AA" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <Input placeholder="123" pattern="\d{3,4}" title="3 o 4 dígitos de seguridad" required />
                </div>
              </div>
            </div>

            <Button variant="primary" type="submit" className="w-full py-4 text-lg mt-8 shadow-md">
              Confirmar y Pagar {formatPrice(totalPrice)}
            </Button>
          </form>
        </div>

        {/* Resumen Estático del Pedido */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h2>
            
            <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-gray-500">Cant: {item.quantity}</p>
                    <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío estimado</span>
                <span className="text-green-600">Gratis</span>
              </div>
              
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200 mt-2">
                <span>Total a Pagar</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;