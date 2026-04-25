import { useState, useEffect } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import Button from '../atoms/Button';
import { Input } from '../atoms/Input';
import { CheckCircle, AlertCircle, Save } from 'lucide-react';

export const FooterAdmin = () => {
  const { footerData, loadFooterData, updateFooterData, isLoading } = useSettingsStore();
  
  const [formData, setFormData] = useState({
    aboutText: '',
    email: '',
    phone: '',
    address: '',
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    copyrightText: ''
  });
  
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadFooterData();
  }, [loadFooterData]);

  useEffect(() => {
    if (footerData) {
      setFormData(footerData);
    }
  }, [footerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    
    const result = await updateFooterData(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Configuración del footer guardada exitosamente.' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Error al guardar.' });
    }
    
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-12">
      <div className="bg-gray-900 px-8 py-6 text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Configuración del Footer</h2>
          <p className="text-sm mt-1 opacity-80">Edita la información visible en la parte inferior del sitio</p>
        </div>
      </div>

      <div className="p-8">
        {message.text && (
          <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Texto "Acerca de"</label>
            <textarea 
              name="aboutText" 
              value={formData.aboutText} 
              onChange={handleChange} 
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 min-h-[80px]" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
              <Input name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección</label>
              <Input name="address" value={formData.address} onChange={handleChange} required />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Redes Sociales (URLs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Facebook</label>
                <Input name="facebookUrl" type="url" placeholder="https://facebook.com/..." value={formData.facebookUrl} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Instagram</label>
                <Input name="instagramUrl" type="url" placeholder="https://instagram.com/..." value={formData.instagramUrl} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Twitter</label>
                <Input name="twitterUrl" type="url" placeholder="https://twitter.com/..." value={formData.twitterUrl} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Texto de Copyright</label>
            <Input name="copyrightText" value={formData.copyrightText} onChange={handleChange} required />
          </div>

          <div className="pt-4 border-t">
            <Button variant="primary" type="submit" className={`w-full py-4 text-lg flex justify-center items-center gap-2 ${isSaving || isLoading ? 'opacity-75 cursor-not-allowed' : ''}`} disabled={isSaving || isLoading}>
              <Save size={20} />
              {isSaving ? 'Guardando...' : 'Guardar Configuración del Footer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
