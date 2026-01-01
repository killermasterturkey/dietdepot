import { useState, useEffect } from 'react';
import { db, DetoxItem } from '../../../utils/database';

interface DetoxDatabaseProps {
  onClose?: () => void;
  onSelectDetox?: (detox: DetoxItem) => void;
}

export default function DetoxDatabase({ onClose, onSelectDetox }: DetoxDatabaseProps) {
  const isModal = !!onClose;
  const [detoxItems, setDetoxItems] = useState<DetoxItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<DetoxItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<DetoxItem | null>(null);

  const categories = ['Tümü', 'İçecekler', 'Tohumlar', 'Süper Besinler', 'Baharatlar'];

  useEffect(() => {
    loadDetoxItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [detoxItems, searchTerm, selectedCategory]);

  const loadDetoxItems = async () => {
    const allItems = await db.getAllDetoxItems();
    setDetoxItems(allItems);
  };

  const filterItems = () => {
    let filtered = detoxItems;

    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu detoks öğesini silmek istediğinizden emin misiniz?')) {
      await db.deleteDetoxItem(id);
      loadDetoxItems();
    }
  };

  const content = (
    <>
      <div className={`${isModal ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl'} px-6 py-4 flex items-center justify-between`}>
        <div>
          <h2 className="text-xl font-bold text-white">Detoks Veritabanı</h2>
          <p className="text-green-100 text-sm mt-1">Detoks öğelerini yönetin ({detoxItems.length} öğe)</p>
        </div>
        {isModal && (
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-2xl text-white"></i>
          </button>
        )}
      </div>

        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Detoks öğesi ara..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Yeni Detoks Öğesi
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-green-500 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-green-600 font-medium">{item.category}</p>
                  </div>
                  <div className="flex gap-1">
                    {onSelectDetox && onClose && (
                      <button
                        onClick={() => {
                          onSelectDetox(item);
                          onClose();
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                        title="Seç"
                      >
                        <i className="ri-check-line"></i>
                      </button>
                    )}
                    <button
                      onClick={() => setEditingItem(item)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Porsiyon:</span>
                    <span className="font-medium">{item.servingSize} {item.servingUnit}</span>
                  </div>
                  {item.bestTime && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">En İyi Zaman:</span>
                      <span className="font-medium text-green-600">{item.bestTime}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Faydaları:</p>
                    <p className="text-sm text-gray-900">{item.benefits}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">Detoks öğesi bulunamadı</p>
            </div>
          )}
        </div>

      {(showAddModal || editingItem) && (
        <DetoxFormModal
          detoxItem={editingItem}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            setShowAddModal(false);
            setEditingItem(null);
            loadDetoxItems();
          }}
        />
      )}
    </>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {content}
    </div>
  );
}

interface DetoxFormModalProps {
  detoxItem: DetoxItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

function DetoxFormModal({ detoxItem, onClose, onSuccess }: DetoxFormModalProps) {
  const [formData, setFormData] = useState<Partial<DetoxItem>>(
    detoxItem || {
      name: '',
      category: 'İçecekler',
      benefits: '',
      servingSize: '1',
      servingUnit: 'bardak',
      bestTime: '',
      description: ''
    }
  );

  const categories = ['İçecekler', 'Tohumlar', 'Süper Besinler', 'Baharatlar'];
  const units = ['bardak', 'fincan', 'yemek kaşığı', 'çay kaşığı', 'gram', 'litre'];
  const times = ['Sabah Aç Karnına', 'Kahvaltıdan Önce', 'Öğleden Sonra', 'Akşam', 'Yemeklerden Önce', 'Gün Boyu'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const item: DetoxItem = {
      id: detoxItem?.id || `detox-${Date.now()}`,
      name: formData.name!,
      category: formData.category!,
      benefits: formData.benefits!,
      servingSize: formData.servingSize!,
      servingUnit: formData.servingUnit!,
      bestTime: formData.bestTime,
      description: formData.description,
      createdAt: detoxItem?.createdAt || new Date().toISOString()
    };

    if (detoxItem) {
      await db.updateDetoxItem(item);
    } else {
      await db.addDetoxItem(item);
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-xl font-bold text-white">
            {detoxItem ? 'Detoks Öğesi Düzenle' : 'Yeni Detoks Öğesi Ekle'}
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-2xl text-white"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Detoks Öğesi Adı *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">En İyi Zaman</label>
              <select
                value={formData.bestTime}
                onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="">Seçiniz</option>
                {times.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Porsiyon *</label>
                <input
                  type="text"
                  required
                  value={formData.servingSize}
                  onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Birim *</label>
                <select
                  required
                  value={formData.servingUnit}
                  onChange={(e) => setFormData({ ...formData, servingUnit: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Faydaları *</label>
              <textarea
                required
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                placeholder="Bu detoks öğesinin sağlık faydaları..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Hazırlama şekli ve ek bilgiler..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium whitespace-nowrap"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              {detoxItem ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
