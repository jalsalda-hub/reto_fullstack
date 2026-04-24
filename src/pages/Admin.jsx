import { useState, useEffect } from 'react';
import { db, storage } from '../config/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useProductStore } from '../store/useProductStore';
import Button from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { UploadCloud, Link as LinkIcon, CheckCircle, AlertCircle, Edit, X } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const Admin = () => {
  const { products, loadInitialData } = useProductStore();
  
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState("men's clothing");
  const [imageType, setImageType] = useState('url'); // 'url' o 'local'
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Nos aseguramos de que los productos estén cargados
  useEffect(() => {
    if (products.length === 0) {
      loadInitialData();
    }
  }, [products.length, loadInitialData]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setCategory(product.category);
    setImageUrl(product.image);
    setImageType('url');
    setImageFile(null);
    setMessage({ type: '', text: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setPrice('');
    setDescription('');
    setCategory("men's clothing");
    setImageUrl('');
    setImageFile(null);
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!db || !storage) {
      setMessage({ type: 'error', text: 'Firebase no está configurado. Revisa tu archivo .env.local' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      let finalImageUrl = imageUrl;

      if (imageType === 'local' && imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      if (!finalImageUrl) {
        throw new Error('Debes proporcionar una imagen (URL o archivo local).');
      }

      const productData = {
        title,
        price: parseFloat(price),
        description,
        category,
        image: finalImageUrl,
        rating: { rate: 0, count: 0 },
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        // Al usar setDoc con el ID convertido a string, si el producto venía de FakeStore (ej. ID 1),
        // Firebase creará un documento con el ID "1". Luego nuestro store lo leerá y reemplazará al falso.
        await setDoc(doc(db, 'products', String(editingId)), productData);
        setMessage({ type: 'success', text: '¡Producto editado y sincronizado exitosamente!' });
      } else {
        await addDoc(collection(db, 'products'), productData);
        setMessage({ type: 'success', text: '¡Producto creado exitosamente!' });
      }
      
      // Recargar datos globalmente para ver el cambio inmediato
      await loadInitialData();
      cancelEdit();
      
    } catch (error) {
      console.error("Error guardando producto: ", error);
      setMessage({ type: 'error', text: error.message || 'Ocurrió un error al guardar el producto.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* SECCIÓN DEL FORMULARIO */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-12">
        <div className={`px-8 py-6 text-white flex justify-between items-center ${editingId ? 'bg-blue-600' : 'bg-gray-900'}`}>
          <div>
            <h1 className="text-2xl font-bold">{editingId ? 'Editar Producto Existente' : 'Añadir Nuevo Producto'}</h1>
            <p className="text-sm mt-1 opacity-80">
              {editingId ? `Estás sobreescribiendo el producto ID: ${editingId} en Firebase` : 'Crear un nuevo ítem en el catálogo sincronizado'}
            </p>
          </div>
          {editingId && (
            <button onClick={cancelEdit} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md transition-colors">
              <X size={18} /> Cancelar Edición
            </button>
          )}
        </div>

        <div className="p-8">
          {message.text && (
            <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título del Producto</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Chaqueta de Cuero" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Precio (COP)</label>
                <Input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ej. 150000" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900">
                <option value="men's clothing">Ropa de Hombre</option>
                <option value="women's clothing">Ropa de Mujer</option>
                <option value="electronics">Electrónicos</option>
                <option value="jewelery">Joyería</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 min-h-[100px]" required />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Imagen del Producto</h3>
              <div className="flex gap-4 mb-6">
                <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-md cursor-pointer transition-colors ${imageType === 'local' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}>
                  <input type="radio" name="imageType" value="local" checked={imageType === 'local'} onChange={() => setImageType('local')} className="hidden" />
                  <UploadCloud size={20} />
                  <span className="font-medium">Subir desde PC</span>
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-md cursor-pointer transition-colors ${imageType === 'url' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}>
                  <input type="radio" name="imageType" value="url" checked={imageType === 'url'} onChange={() => setImageType('url')} className="hidden" />
                  <LinkIcon size={20} />
                  <span className="font-medium">Usar URL Externa</span>
                </label>
              </div>

              {imageType === 'local' ? (
                <div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border border-gray-300 p-2 bg-white rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800" required={!imageFile} />
                  <p className="text-xs text-gray-500 mt-2">La imagen se subirá directamente a Firebase Storage.</p>
                </div>
              ) : (
                <div>
                  <Input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://ejemplo.com/imagen.jpg" required={imageType === 'url'} />
                  {imageUrl && <img src={imageUrl} alt="Preview" className="mt-4 h-32 object-contain rounded border" referrerPolicy="no-referrer" />}
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <Button variant="primary" type="submit" className={`w-full py-4 text-lg flex justify-center items-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Sincronizando...' : (editingId ? 'Guardar Cambios' : 'Crear Producto')}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* SECCIÓN LISTA DE PRODUCTOS */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Catálogo Actual (FakeStore + Firebase)</h2>
          <p className="text-sm text-gray-500 mt-1">Selecciona cualquier producto para editarlo y sobreescribir su ficha en Firebase.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Img</th>
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Título</th>
                <th className="p-4 font-semibold">Categoría</th>
                <th className="p-4 font-semibold">Precio</th>
                <th className="p-4 font-semibold text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${editingId === product.id ? 'bg-blue-50' : ''}`}>
                  <td className="p-4">
                    <img src={product.image} alt="thumb" className="w-12 h-12 object-contain bg-white rounded border" referrerPolicy="no-referrer" />
                  </td>
                  <td className="p-4 text-sm text-gray-500 font-mono">{String(product.id).substring(0, 8)}</td>
                  <td className="p-4 font-medium text-gray-900 truncate max-w-[200px]">{product.title}</td>
                  <td className="p-4 text-sm text-gray-500">{product.category}</td>
                  <td className="p-4 font-semibold text-gray-900">{formatPrice(product.price)}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full transition-colors inline-flex items-center gap-1 text-sm font-medium"
                    >
                      <Edit size={16} /> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
