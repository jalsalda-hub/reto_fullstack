import Hero from '../components/organisms/Hero';
import ProductList from '../components/organisms/ProductList';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="section-heading">
          <h2>Últimos Productos</h2>
          <span>Detalles en tendencias y ofertas destacadas</span>
        </div>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
