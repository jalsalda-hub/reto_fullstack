import Button from '../atoms/Button';

const Hero = () => {
  return (
    <div className="relative bg-gray-50 flex items-center justify-center min-h-[60vh] md:min-h-[80vh] overflow-hidden">
      {/* Contenedor principal de Hexashop style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between w-full">
        
        {/* Lado izquierdo - Texto */}
        <div className="md:w-1/2 z-10 text-center md:text-left mt-10 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-gray-900 leading-tight mb-4">
            We Are Hexashop
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Awesome, clean & creative HTML5 Template for your ecommerce project. Discover our latest collection and best deals.
          </p>
          <Button variant="primary" className="px-8 py-3 text-lg">
            Purchase Now
          </Button>
        </div>

        {/* Lado derecho - Imagen (Usando tu hero.png) */}
        <div className="md:w-1/2 mt-10 md:mt-0 px-4 md:px-0">
          <img 
            src="/src/assets/hero.png" 
            alt="Hexashop Fashion" 
            className="w-full max-w-md mx-auto object-contain drop-shadow-xl"
          />
        </div>

      </div>
      
      {/* Decoración de fondo opcional similar a Hexashop */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 opacity-50 blur-3xl -z-0"></div>
    </div>
  );
};

export default Hero;