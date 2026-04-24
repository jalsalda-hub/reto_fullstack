import Button from '../atoms/Button';

const Hero = () => {
  const categories = [
    {
      id: 1,
      title: 'Mujeres',
      subtitle: 'La mejor ropa para mujeres',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/category/women'
    },
    {
      id: 2,
      title: 'Hombres',
      subtitle: 'La mejor ropa para hombres',
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/category/men'
    },
    {
      id: 3,
      title: 'Niños',
      subtitle: 'La mejor ropa para niños',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/category/kids'
    },
    {
      id: 4,
      title: 'Accesorios',
      subtitle: 'Los mejores accesorios',
      image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/category/accessories'
    }
  ];

  return (
    <div className="w-full">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row w-full h-auto lg:h-[80vh] min-h-[600px] border-b border-gray-200">
        
        {/* Lado izquierdo - Banner Principal */}
        <div className="lg:w-1/2 relative flex items-center justify-center overflow-hidden group p-4 lg:p-8">
          <div className="absolute inset-0 z-0">
            <img 
              src="/src/assets/hero.png" 
              alt="Moda Hexashop Principal" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }}
            />
            {/* Overlay oscuro para legibilidad */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="relative z-10 text-white text-center md:text-left px-8 py-12 md:px-16 md:py-20 flex flex-col items-center md:items-start w-full">
            <h1 className="text-4xl md:text-6xl font-bold font-sans leading-tight mb-4 tracking-wide">
              Somos Hexashop
            </h1>
            <p className="text-gray-200 text-lg mb-8 max-w-lg font-light italic">
              Increíble, limpia y creativa tienda online. Descubre nuestra última colección.
            </p>
            <Button variant="primary" className="px-10 py-4 text-lg font-semibold uppercase tracking-wider bg-white text-black hover:bg-hexa-dark hover:text-white transition-colors duration-300">
              Comprar Ahora
            </Button>
          </div>
        </div>

        {/* Lado derecho - 4 Categorías */}
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2">
          {categories.map((cat) => (
            <a 
              key={cat.id}
              href={cat.link}
              className="relative overflow-hidden group block h-[300px] lg:h-full min-h-[250px]"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay oscuro */}
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-50"></div>
              
              {/* Contenido centrado */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-6 text-center">
                <h2 className="text-2xl font-bold uppercase tracking-widest mb-2 transition-transform duration-300 transform group-hover:-translate-y-2">
                  {cat.title}
                </h2>
                <p className="text-sm font-light italic opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {cat.subtitle}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block border-b-2 border-white pb-1 font-medium text-sm tracking-wider">
                    VER PRODUCTOS
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;