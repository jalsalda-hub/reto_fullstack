import { useEffect } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const { footerData, loadFooterData } = useSettingsStore();

  useEffect(() => {
    loadFooterData();
  }, [loadFooterData]);

  return (
    <footer className="bg-hexa-dark text-white pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hexashop</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {footerData.aboutText}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={16} />
                <span>{footerData.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={16} />
                <span>{footerData.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={16} />
                <span>{footerData.email}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              {footerData.facebookUrl && footerData.facebookUrl !== '#' && (
                <a href={footerData.facebookUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm font-semibold">
                  Facebook
                </a>
              )}
              {footerData.instagramUrl && footerData.instagramUrl !== '#' && (
                <a href={footerData.instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm font-semibold">
                  Instagram
                </a>
              )}
              {footerData.twitterUrl && footerData.twitterUrl !== '#' && (
                <a href={footerData.twitterUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm font-semibold">
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-sm text-gray-400">
            {footerData.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};
