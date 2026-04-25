import { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const initializeAuthListener = useAuthStore(state => state.initializeAuthListener);
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    initializeAuthListener();
  }, [initializeAuthListener]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppRouter />
  );
}

export default App;
