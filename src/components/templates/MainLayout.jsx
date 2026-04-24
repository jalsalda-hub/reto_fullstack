import { Navbar } from '../organisms/Navbar';

export const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Basic Footer Placeholder */}
      <footer className="bg-hexa-dark text-white py-6 text-center mt-auto">
        <p className="text-sm opacity-80">© 2026 Hexashop - Reto Fullstack. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
