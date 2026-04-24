import Hero from '../components/organisms/Hero';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 inline-block">Latest Products</h2>
        {/* Aquí irá el ProductList en el próximo paso */}
      </div>
    </div>
  );
};

export default Home;
