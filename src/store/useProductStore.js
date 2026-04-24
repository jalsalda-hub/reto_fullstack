import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import mockProducts from '../mockdata/products.json';

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

      // Acciones

      // Fase 1: Cargamos directamente desde el JSON
      loadInitialData: () => {
        set({
          products: mockProducts,
          filteredProducts: mockProducts,
          currentPage: 1
        });
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