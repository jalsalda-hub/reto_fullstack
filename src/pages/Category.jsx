import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/molecules/ProductCard';
import Button from '../components/atoms/Button';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { products, language } = useProductStore();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Map URL category to fakestoreapi category format
    let filterKey = categoryId;
    if (categoryId === 'women') filterKey = "women's clothing";
    if (categoryId === 'men') filterKey = "men's clothing";
    
    // Filter products
    const filtered = products.filter(p => p.category.toLowerCase() === filterKey.toLowerCase());
    setCategoryProducts(filtered);
    window.scrollTo(0, 0);
  }, [categoryId, products]);

  const getCategoryTitle = () => {
    if (categoryId === 'women') return language === 'es' ? 'Mujeres' : "Women's";
    if (categoryId === 'men') return language === 'es' ? 'Hombres' : "Men's";
    if (categoryId === 'electronics') return language === 'es' ? 'Electrónicos' : 'Electronics';
    if (categoryId === 'jewelery') return language === 'es' ? 'Joyería' : 'Jewelery';
    return categoryId;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> {language === 'es' ? 'Volver al inicio' : 'Back to Home'}
      </button>

      <div className="section-heading text-center mb-12">
        <h2 className="capitalize">{getCategoryTitle()}</h2>
        <span>{language === 'es' ? `Explora nuestra colección de ${getCategoryTitle().toLowerCase()}` : `Explore our ${getCategoryTitle().toLowerCase()} collection`}</span>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            {language === 'es' ? 'No se encontraron productos en esta categoría.' : 'No products found in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
