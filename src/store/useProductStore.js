import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// ITEMS_PER_PAGE define el límite estricto que pide el proyecto (6 a 8). Elegimos 6.
const ITEMS_PER_PAGE = 6;

export const useProductStore = create(
  persist(
    (set, get) => ({
      // Estados
      products: [],
      filteredProducts: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: ITEMS_PER_PAGE,
      isLoading: false,
      error: null,
      language: 'es',

      // Acciones

      toggleLanguage: () => {
        set((state) => ({ language: state.language === 'es' ? 'en' : 'es' }));
      },

      // Fase 2: Cargamos datos reales desde FakeStoreAPI
      loadInitialData: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await axios.get('https://fakestoreapi.com/products');
          const apiProducts = response.data;
          
          set({
            products: apiProducts,
            filteredProducts: apiProducts,
            currentPage: 1,
            isLoading: false
          });
        } catch (error) {
          console.error("Error fetching products:", error);
          set({ isLoading: false, error: 'Hubo un error al cargar los productos.' });
        }
      },

      // Updatea la query de busqueda y filtra al vuelo
      setSearchQuery: (query) => {
        const { products } = get();
        const filtered = products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase()) || 
          p.category.toLowerCase().includes(query.toLowerCase())
        );
        
        set({
          searchQuery: query,
          filteredProducts: filtered,
          currentPage: 1 // Reseteamos la pagina al buscar
        });
      },

      // Paginación estricta
      setPage: (pageNumber) => set({ currentPage: pageNumber }),

      // Helpers computados para que los componentes los consuman mas facil
      getPaginatedProducts: () => {
        const { filteredProducts, currentPage, itemsPerPage } = get();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
      },

      getTotalPages: () => {
        const { filteredProducts, itemsPerPage } = get();
        return Math.ceil(filteredProducts.length / itemsPerPage);
      }
    }),
    {
      name: 'hexashop-product-storage', // localStorage key
    }
  )
);