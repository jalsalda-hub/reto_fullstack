import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

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

      // Fase 2: Cargamos datos reales desde FakeStoreAPI y desde Firebase
      loadInitialData: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // 1. Cargamos los productos de la API pública
          const response = await axios.get('https://fakestoreapi.com/products');
          const apiProducts = response.data;
          let allProducts = [...apiProducts];

          // 2. Intentamos cargar los productos de Firebase (Sincronización)
          try {
            if (db) {
              const querySnapshot = await getDocs(collection(db, 'products'));
              const firebaseProducts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              
              // Evitar duplicados: filtramos los de FakeStore que ya fueron "editados" (y guardados en Firebase)
              const firebaseIds = firebaseProducts.map(p => String(p.id));
              const filteredApiProducts = apiProducts.filter(p => !firebaseIds.includes(String(p.id)));

              // Combinamos: Los de Firebase (editados o nuevos) van primero, luego los originales de FakeStore
              allProducts = [...firebaseProducts, ...filteredApiProducts];
            }
          } catch (fbError) {
            console.warn("Aviso: No se pudieron sincronizar productos de Firebase aún.", fbError);
          }
          
          set({
            products: allProducts,
            filteredProducts: allProducts,
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