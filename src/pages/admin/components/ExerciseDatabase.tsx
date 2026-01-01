import { useState, useEffect } from 'react';
import { db, ExerciseItem } from '../../../utils/database';

interface ExerciseDatabaseProps {
  onClose?: () => void;
  onSelectExercise?: (exercise: ExerciseItem) => void;
}

export default function ExerciseDatabase({ onClose, onSelectExercise }: ExerciseDatabaseProps) {
  const isModal = !!onClose;
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<ExerciseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState<ExerciseItem | null>(null);

  const categories = ['Tümü', 'Kardiyovasküler', 'Kuvvet', 'Esneklik', 'Denge', 'HIIT'];

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchTerm, selectedCategory]);

  const loadExercises = async () => {
    const allExercises = await db.getAllExerciseItems();
    setExercises(allExercises);
  };

  const filterExercises = () => {
    let filtered = exercises;

    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredExercises(filtered);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu egzersizi silmek istediğinizden emin misiniz?')) {
      await db.deleteExerciseItem(id);
      loadExercises();
    }
  };

  const content = (
    <>
      <div className={`${isModal ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl'} px-6 py-4 flex items-center justify-between`}>
        <div>
          <h2 className="text-xl font-bold text-white">Egzersiz Veritabanı</h2>
          <p className="text-blue-100 text-sm mt-1">Egzersiz hareketlerini yönetin ({exercises.length} öğe)</p>
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
                placeholder="Egzersiz ara..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Yeni Egzersiz
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
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
            {filteredExercises.map(exercise => (
              <div key={exercise.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{exercise.name}</h3>
                    <p className="text-xs text-blue-600 font-medium">{exercise.category}</p>
                  </div>
                  <div className="flex gap-1">
                    {onSelectExercise && onClose && (
                      <button
                        onClick={() => {
                          onSelectExercise(exercise);
                          onClose();
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                        title="Seç"
                      >
                        <i className="ri-check-line"></i>
                      </button>
                    )}
                    <button
                      onClick={() => setEditingExercise(exercise)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(exercise.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Zorluk:</span>
                    <span className={`font-medium px-2 py-1 rounded text-xs ${
                      exercise.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                      exercise.difficulty === 'Orta' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kalori/Dakika:</span>
                    <span className="font-bold text-blue-600">{exercise.caloriesPerMinute} kcal</span>
                  </div>
                  {exercise.equipment && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ekipman:</span>
                      <span className="font-medium">{exercise.equipment}</span>
                    </div>
                  )}
                  {exercise.muscleGroup && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Kas Grubu:</p>
                      <p className="text-sm font-medium text-gray-900">{exercise.muscleGroup}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">Egzersiz bulunamadı</p>
            </div>
          )}
        </div>

      {(showAddModal || editingExercise) && (
        <ExerciseFormModal
          exercise={editingExercise}
          onClose={() => {
            setShowAddModal(false);
            setEditingExercise(null);
          }}
          onSuccess={() => {
            setShowAddModal(false);
            setEditingExercise(null);
            loadExercises();
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

interface ExerciseFormModalProps {
  exercise: ExerciseItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

function ExerciseFormModal({ exercise, onClose, onSuccess }: ExerciseFormModalProps) {
  const [formData, setFormData] = useState<Partial<ExerciseItem>>(
    exercise || {
      name: '',
      category: 'Kardiyovasküler',
      caloriesPerMinute: 0,
      difficulty: 'Orta',
      equipment: '',
      muscleGroup: '',
      description: ''
    }
  );

  const categories = ['Kardiyovasküler', 'Kuvvet', 'Esneklik', 'Denge', 'HIIT'];
  const difficulties = ['Kolay', 'Orta', 'Zor'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const exerciseItem: ExerciseItem = {
      id: exercise?.id || `ex-${Date.now()}`,
      name: formData.name!,
      category: formData.category!,
      caloriesPerMinute: formData.caloriesPerMinute!,
      difficulty: formData.difficulty!,
      equipment: formData.equipment,
      muscleGroup: formData.muscleGroup,
      description: formData.description,
      createdAt: exercise?.createdAt || new Date().toISOString()
    };

    if (exercise) {
      await db.updateExerciseItem(exerciseItem);
    } else {
      await db.addExerciseItem(exerciseItem);
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-xl font-bold text-white">
            {exercise ? 'Egzersiz Düzenle' : 'Yeni Egzersiz Ekle'}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Egzersiz Adı *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zorluk *</label>
              <select
                required
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kalori/Dakika *</label>
              <input
                type="number"
                required
                step="0.1"
                value={formData.caloriesPerMinute}
                onChange={(e) => setFormData({ ...formData, caloriesPerMinute: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ekipman</label>
              <input
                type="text"
                value={formData.equipment}
                onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                placeholder="Örn: Halter, Mat, Yok"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Kas Grubu</label>
              <input
                type="text"
                value={formData.muscleGroup}
                onChange={(e) => setFormData({ ...formData, muscleGroup: e.target.value })}
                placeholder="Örn: Bacaklar, Göğüs, Tüm Vücut"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Egzersiz hakkında detaylı açıklama..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              {exercise ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
