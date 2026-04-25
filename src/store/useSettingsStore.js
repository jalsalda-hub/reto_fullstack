import { create } from 'zustand';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const useSettingsStore = create((set) => ({
  footerData: {
    aboutText: 'Hexashop - Tu tienda en línea favorita. Encuentra los mejores productos a los mejores precios.',
    email: 'contacto@hexashop.com',
    phone: '+57 300 123 4567',
    address: 'Calle Falsa 123, Bogotá',
    facebookUrl: '#',
    instagramUrl: '#',
    twitterUrl: '#',
    copyrightText: '© 2026 Hexashop - Reto Fullstack. Todos los derechos reservados.'
  },
  isLoading: false,

  loadFooterData: async () => {
    try {
      set({ isLoading: true });
      if (db) {
        const docRef = doc(db, 'settings', 'footer');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          set({ footerData: docSnap.data(), isLoading: false });
        } else {
          set({ isLoading: false });
        }
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching footer data:", error);
      set({ isLoading: false });
    }
  },

  updateFooterData: async (newData) => {
    try {
      set({ isLoading: true });
      if (db) {
        await setDoc(doc(db, 'settings', 'footer'), newData);
        set({ footerData: newData, isLoading: false });
        return { success: true };
      }
      return { success: false, error: 'Firebase no configurado' };
    } catch (error) {
      console.error("Error updating footer data:", error);
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  }
}));
