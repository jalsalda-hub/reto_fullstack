import { create } from 'zustand';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isAuthLoading: true,

  // Escuchar cambios de sesión desde Firebase
  initializeAuthListener: () => {
    if (!auth) {
      set({ isAuthLoading: false });
      return;
    }
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ 
          isAuthenticated: true, 
          user: { 
            uid: user.uid, 
            email: user.email, 
            name: user.email.split('@')[0],
            avatar: `https://ui-avatars.com/api/?name=${user.email.split('@')[0]}&background=random`
          },
          isAuthLoading: false 
        });
      } else {
        set({ isAuthenticated: false, user: null, isAuthLoading: false });
      }
    });
  },

  // Iniciar Sesión con Firebase
  login: async (email, password) => {
    if (!auth) throw new Error("Firebase Auth no configurado");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Registrar con Firebase
  register: async (email, password) => {
    if (!auth) throw new Error("Firebase Auth no configurado");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Cerrar Sesión en Firebase
  logout: async () => {
    if (auth) {
      await signOut(auth);
    }
    set({ isAuthenticated: false, user: null });
  },
}));
