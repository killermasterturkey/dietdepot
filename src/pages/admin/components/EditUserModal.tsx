import { useState, useEffect } from 'react';
import { db, User, DietPlan, ExercisePlan, DetoxPlan } from '../../../utils/database';

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserModal({ user, onClose, onSuccess }: EditUserModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'diet' | 'exercise' | 'detox'>('info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [userInfo, setUserInfo] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    age: user.age.toString(),
    weight: user.weight.toString(),
    height: user.height.toString(),
    password: user.password
  });

  const [dietPlan, setDietPlan] = useState<DietPlan>({
    userId: user.id,
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: '',
    notes: '',
    calories: '',
    updatedAt: ''
  });

  const [exercisePlan, setExercisePlan] = useState<ExercisePlan>({
    userId: user.id,
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
    notes: '',
    updatedAt: ''
  });

  const [detoxPlan, setDetoxPlan] = useState<DetoxPlan>({
    userId: user.id,
    morning: '',
    afternoon: '',
    evening: '',
    duration: '',
    benefits: '',
    warnings: '',
    updatedAt: ''
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const diet = await db.getDietPlan(user.id);
    const exercise = await db.getExercisePlan(user.id);
    const detox = await db.getDetoxPlan(user.id);

    if (diet) setDietPlan(diet);
    if (exercise) setExercisePlan(exercise);
    if (detox) setDetoxPlan(detox);
  };

  const handleSave = async () => {
    setError('');
    setLoading(true);

    try {
      const updatedUser: User = {
        ...user,
        fullName: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phone,
        age: parseInt(userInfo.age),
        weight: parseFloat(userInfo.weight),
        height: parseFloat(userInfo.height),
        password: userInfo.password
      };

      await db.updateUser(updatedUser);

      const now = new Date().toISOString();
      await db.saveDietPlan({ ...dietPlan, updatedAt: now });
      await db.saveExercisePlan({ ...exercisePlan, updatedAt: now });
      await db.saveDetoxPlan({ ...detoxPlan, updatedAt: now });

      onSuccess();
    } catch (err) {
      setError('Kayıt sırasında bir hata oluştu');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Kullanıcı Düzenle: {user.fullName}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-xl text-gray-600"></i>
          </button>
        </div>

        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'info'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Kullanıcı Bilgileri
            </button>
            <button
              onClick={() => setActiveTab('diet')}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'diet'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Diyet Listesi
            </button>
            <button
              onClick={() => setActiveTab('exercise')}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'exercise'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Spor Programı
            </button>
            <button
              onClick={() => setActiveTab('detox')}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'detox'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Detoks Programı
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  value={userInfo.fullName}
                  onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                <input
                  type="password"
                  value={userInfo.password}
                  onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yaş</label>
                <input
                  type="number"
                  value={userInfo.age}
                  onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kilo (kg)</label>
                <input
                  type="number"
                  value={userInfo.weight}
                  onChange={(e) => setUserInfo({ ...userInfo, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Boy (cm)</label>
                <input
                  type="number"
                  value={userInfo.height}
                  onChange={(e) => setUserInfo({ ...userInfo, height: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  step="0.1"
                />
              </div>
            </div>
          )}

          {activeTab === 'diet' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kahvaltı</label>
                <textarea
                  value={dietPlan.breakfast}
                  onChange={(e) => setDietPlan({ ...dietPlan, breakfast: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Öğle Yemeği</label>
                <textarea
                  value={dietPlan.lunch}
                  onChange={(e) => setDietPlan({ ...dietPlan, lunch: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Akşam Yemeği</label>
                <textarea
                  value={dietPlan.dinner}
                  onChange={(e) => setDietPlan({ ...dietPlan, dinner: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ara Öğünler</label>
                <textarea
                  value={dietPlan.snacks}
                  onChange={(e) => setDietPlan({ ...dietPlan, snacks: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Günlük Kalori Hedefi</label>
                <input
                  type="text"
                  value={dietPlan.calories}
                  onChange={(e) => setDietPlan({ ...dietPlan, calories: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notlar</label>
                <textarea
                  value={dietPlan.notes}
                  onChange={(e) => setDietPlan({ ...dietPlan, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
            </div>
          )}

          {activeTab === 'exercise' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pazartesi</label>
                <textarea
                  value={exercisePlan.monday}
                  onChange={(e) => setExercisePlan({ ...exercisePlan, monday: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salı</label>
                <textarea
                  value={exercisePlan.tuesday}
                  onChange={(e) => setExercisePlan({ ...exercisePlan, tuesday: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Çarşamba</label>
                <textarea
                  value={exercisePlan.wednesday}
                  onChange={(e) => setExercisePlan({ ...exercisePlan, wednesday: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Perşembe</label>
                <textarea
                  value={exercisePlan.thursday}
                  onChange={(e) => setExercisePlan({ ...exercisePlan, thursday: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuma</label>
                <textarea
                  value={exercisePlan.friday}
                  onChange={(e) => setExercisePlan({ ...exercisePlan, friday: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cumartesi</label>
                <textarea
                  value={exercisePlan.saturday}
                  onChange={(e) => setExercisePlan({ ...exercisePlan, saturday: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pazar</label>
                <textarea
                  value={exercisePlan.sunday}
                  onChange={(e) => setExercisePlan({ ...exercisePlan, sunday: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notlar</label>
                <textarea
                  value={exercisePlan.notes}
                  onChange={(e) => setExercisePlan({ ...exercisePlan, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
            </div>
          )}

          {activeTab === 'detox' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sabah Programı</label>
                <textarea
                  value={detoxPlan.morning}
                  onChange={(e) => setDetoxPlan({ ...detoxPlan, morning: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Öğlen Programı</label>
                <textarea
                  value={detoxPlan.afternoon}
                  onChange={(e) => setDetoxPlan({ ...detoxPlan, afternoon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Akşam Programı</label>
                <textarea
                  value={detoxPlan.evening}
                  onChange={(e) => setDetoxPlan({ ...detoxPlan, evening: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detoks Süresi</label>
                <input
                  type="text"
                  value={detoxPlan.duration}
                  onChange={(e) => setDetoxPlan({ ...detoxPlan, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Faydaları</label>
                <textarea
                  value={detoxPlan.benefits}
                  onChange={(e) => setDetoxPlan({ ...detoxPlan, benefits: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Uyarılar</label>
                <textarea
                  value={detoxPlan.warnings}
                  onChange={(e) => setDetoxPlan({ ...detoxPlan, warnings: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                  rows={3}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors text-sm font-medium whitespace-nowrap"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium whitespace-nowrap"
          >
            {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
