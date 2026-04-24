import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // Añadir producto o incrementar cantidad si ya existe
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
          // Si existe, modificamos su cantidad incrementando
          set({
            cart: cart.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          // Si no existe, lo inyectamos al final del arrelo con su cantidad base
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },

      // Reducir la cantidad (si llega a 1 y se resta uno, se elimina)
      decreaseQuantity: (productId) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem?.quantity > 1) {
          set({
            cart: cart.map(item =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          });
        } else {
          // Si la cantidad es 1, eliminar el producto entero aprovechando el filter
          set({ cart: cart.filter(item => item.id !== productId) });
        }
      },

      // Eliminar el producto completamente sin importar la cantidad actual
      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.id !== productId) });
      },

      // Vaciar el carrito completo (útil post-checkout o al cerrar sesión)
      clearCart: () => set({ cart: [] }),

      // Helpers computados para lectura ágil en la UI
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'hexashop-cart-storage', // Almacenamiento clave/valor en el navegador centralizado
    }
  )
);