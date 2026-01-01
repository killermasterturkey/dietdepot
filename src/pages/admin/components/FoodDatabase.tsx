import { useState, useEffect } from 'react';
import { db, FoodItem } from '../../../utils/database';

interface FoodDatabaseProps {
  onClose?: () => void;
  onSelectFood?: (food: FoodItem) => void;
}

export default function FoodDatabase({ onClose, onSelectFood }: FoodDatabaseProps) {
  const isModal = !!onClose;
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);

  const categories = ['Tümü', 'Tahıllar', 'Protein', 'Süt Ürünleri', 'Meyveler', 'Sebzeler', 'Kuruyemişler', 'Baklagiller', 'Yağlar', 'İçecekler'];

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    filterFoods();
  }, [foods, searchTerm, selectedCategory]);

  const loadFoods = async () => {
    const allFoods = await db.getAllFoodItems();
    setFoods(allFoods);
  };

  const filterFoods = () => {
    let filtered = foods;

    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(f => f.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFoods(filtered);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu yiyeceği silmek istediğinizden emin misiniz?')) {
      await db.deleteFoodItem(id);
      loadFoods();
    }
  };

  const content = (
    <>
      <div className={`${isModal ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-xl'} px-6 py-4 flex items-center justify-between`}>
        <div>
          <h2 className="text-xl font-bold text-white">Yiyecek Veritabanı</h2>
          <p className="text-emerald-100 text-sm mt-1">Besin değerlerini yönetin ({foods.length} öğe)</p>
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
                placeholder="Yiyecek ara..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Yeni Yiyecek
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
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
            {filteredFoods.map(food => (
              <div key={food.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-500 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{food.name}</h3>
                    <p className="text-xs text-emerald-600 font-medium">{food.category}</p>
                  </div>
                  <div className="flex gap-1">
                    {onSelectFood && onClose && (
                      <button
                        onClick={() => {
                          onSelectFood(food);
                          onClose();
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors"
                        title="Seç"
                      >
                        <i className="ri-check-line"></i>
                      </button>
                    )}
                    <button
                      onClick={() => setEditingFood(food)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(food.id)}
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
                    <span className="font-medium">{food.servingSize} {food.servingUnit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kalori:</span>
                    <span className="font-bold text-emerald-600">{food.calories} kcal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Protein</p>
                      <p className="text-sm font-bold text-blue-600">{food.protein}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Karb.</p>
                      <p className="text-sm font-bold text-amber-600">{food.carbs}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Yağ</p>
                      <p className="text-sm font-bold text-red-600">{food.fat}g</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">Yiyecek bulunamadı</p>
            </div>
          )}
        </div>

      {(showAddModal || editingFood) && (
        <FoodFormModal
          food={editingFood}
          onClose={() => {
            setShowAddModal(false);
            setEditingFood(null);
          }}
          onSuccess={() => {
            setShowAddModal(false);
            setEditingFood(null);
            loadFoods();
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

interface FoodFormModalProps {
  food: FoodItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

function FoodFormModal({ food, onClose, onSuccess }: FoodFormModalProps) {
  const [formData, setFormData] = useState<Partial<FoodItem>>(
    food || {
      name: '',
      category: 'Tahıllar',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      servingSize: '100',
      servingUnit: 'gram'
    }
  );

  const categories = ['Tahıllar', 'Protein', 'Süt Ürünleri', 'Meyveler', 'Sebzeler', 'Kuruyemişler', 'Baklagiller', 'Yağlar', 'İçecekler'];
  const units = ['gram', 'adet', 'bardak', 'yemek kaşığı', 'çay kaşığı', 'dilim', 'porsiyon'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const foodItem: FoodItem = {
      id: food?.id || `food-${Date.now()}`,
      name: formData.name!,
      category: formData.category!,
      calories: formData.calories!,
      protein: formData.protein!,
      carbs: formData.carbs!,
      fat: formData.fat!,
      fiber: formData.fiber,
      servingSize: formData.servingSize!,
      servingUnit: formData.servingUnit!,
      createdAt: food?.createdAt || new Date().toISOString()
    };

    if (food) {
      await db.updateFoodItem(foodItem);
    } else {
      await db.addFoodItem(foodItem);
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-xl font-bold text-white">
            {food ? 'Yiyecek Düzenle' : 'Yeni Yiyecek Ekle'}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Yiyecek Adı *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Birim *</label>
                <select
                  required
                  value={formData.servingUnit}
                  onChange={(e) => setFormData({ ...formData, servingUnit: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kalori (kcal) *</label>
              <input
                type="number"
                required
                step="0.1"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Protein (g) *</label>
              <input
                type="number"
                required
                step="0.1"
                value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Karbonhidrat (g) *</label>
              <input
                type="number"
                required
                step="0.1"
                value={formData.carbs}
                onChange={(e) => setFormData({ ...formData, carbs: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yağ (g) *</label>
              <input
                type="number"
                required
                step="0.1"
                value={formData.fat}
                onChange={(e) => setFormData({ ...formData, fat: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lif (g)</label>
              <input
                type="number"
                step="0.1"
                value={formData.fiber || ''}
                onChange={(e) => setFormData({ ...formData, fiber: parseFloat(e.target.value) || undefined })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
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
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              {food ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
