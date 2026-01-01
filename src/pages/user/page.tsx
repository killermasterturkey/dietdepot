import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, User, DailyDietPlan, DailyExercisePlan, DailyDetoxPlan } from '../../utils/database';
import ButterflyLogo from '../../components/ButterflyLogo';

export default function UserPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'diet' | 'exercise' | 'detox'>('diet');
  const [dietPlans, setDietPlans] = useState<DailyDietPlan[]>([]);
  const [exercisePlans, setExercisePlans] = useState<DailyExercisePlan[]>([]);
  const [detoxPlans, setDetoxPlans] = useState<DailyDetoxPlan[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userStr);
    if (user.isAdmin) {
      navigate('/admin');
      return;
    }

    setCurrentUser(user);
    loadPlans(user.id);
  }, [navigate]);

  const loadPlans = async (userId: string) => {
    const diet = await db.getDailyDietPlansByUser(userId);
    const exercise = await db.getDailyExercisePlansByUser(userId);
    const detox = await db.getDailyDetoxPlansByUser(userId);

    setDietPlans(diet.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setExercisePlans(exercise.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setDetoxPlans(detox.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getWeekPlans = () => {
    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = selectedDateObj.getDay();
    const monday = new Date(selectedDateObj);
    monday.setDate(selectedDateObj.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const weekPlans = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (activeTab === 'diet') {
        weekPlans.push(dietPlans.find(p => p.date === dateStr));
      } else if (activeTab === 'exercise') {
        weekPlans.push(exercisePlans.find(p => p.date === dateStr));
      } else {
        weekPlans.push(detoxPlans.find(p => p.date === dateStr));
      }
    }
    return weekPlans;
  };

  if (!currentUser) return null;

  const selectedDietPlan = dietPlans.find(p => p.date === selectedDate);
  const selectedExercisePlan = exercisePlans.find(p => p.date === selectedDate);
  const selectedDetoxPlan = detoxPlans.find(p => p.date === selectedDate);

  const weekDays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden border-2 border-white">
                <ButterflyLogo size={32} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kişisel Programlarım</h1>
                <p className="text-sm text-green-600 font-medium">Dyt Ayşenur Korkmaz</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <p className="text-sm font-bold text-gray-900">{currentUser.fullName}</p>
                <p className="text-xs text-green-600">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap"
              >
                <i className="ri-logout-box-line mr-2"></i>
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* User Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-3">Hoş Geldiniz, {currentUser.fullName}</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-green-100 text-xs mb-1">Yaş</p>
                  <p className="font-bold text-lg">{currentUser.age}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-green-100 text-xs mb-1">Boy</p>
                  <p className="font-bold text-lg">{currentUser.height} cm</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-green-100 text-xs mb-1">Kilo</p>
                  <p className="font-bold text-lg">{currentUser.weight} kg</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-green-100 text-xs mb-1">BMI</p>
                  <p className="font-bold text-lg">{(currentUser.weight / Math.pow(currentUser.height / 100, 2)).toFixed(1)}</p>
                </div>
                {currentUser.targetWeight && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-green-100 text-xs mb-1">Hedef</p>
                    <p className="font-bold text-lg">{currentUser.targetWeight} kg</p>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <p className="text-sm text-green-100 mb-1">Kayıt Tarihi</p>
              <p className="font-bold text-lg">{new Date(currentUser.createdAt).toLocaleDateString('tr-TR')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-xl shadow-md p-5 flex flex-wrap items-center gap-4 border border-green-100">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tarih Seçin</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Görünüm</label>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('daily')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  viewMode === 'daily'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className="ri-calendar-line mr-2"></i>
                Günlük
              </button>
              <button
                onClick={() => setViewMode('weekly')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  viewMode === 'weekly'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className="ri-calendar-week-line mr-2"></i>
                Haftalık
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-t-xl shadow-md border-b-2 border-green-200">
          <div className="flex gap-1 p-2">
            <button
              onClick={() => setActiveTab('diet')}
              className={`flex-1 px-6 py-3.5 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
                activeTab === 'diet'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              <i className="ri-restaurant-line mr-2 text-lg"></i>
              Diyet Listesi
            </button>
            <button
              onClick={() => setActiveTab('exercise')}
              className={`flex-1 px-6 py-3.5 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
                activeTab === 'exercise'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              <i className="ri-run-line mr-2 text-lg"></i>
              Spor Programı
            </button>
            <button
              onClick={() => setActiveTab('detox')}
              className={`flex-1 px-6 py-3.5 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
                activeTab === 'detox'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              <i className="ri-leaf-line mr-2 text-lg"></i>
              Detoks Programı
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-xl shadow-xl pb-12 border border-green-100">
          <div className="p-8">
            <>
              {/* Diet Plan Content */}
                {activeTab === 'diet' && (
                  <>
                    {viewMode === 'daily' && selectedDietPlan ? (
                      <div className="space-y-6">
                        {selectedDietPlan.meals.map((meal) => (
                          <div key={meal.id} className="p-6 border-2 border-emerald-100 rounded-xl bg-gradient-to-r from-white to-emerald-50 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-emerald-700 flex items-center gap-2">
                                  <i className="ri-restaurant-line"></i>
                                  {meal.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  <i className="ri-time-line mr-1"></i>
                                  {meal.time}
                                </p>
                              </div>
                              <div className="text-right bg-emerald-600 text-white px-4 py-2 rounded-lg">
                                <p className="text-xs mb-1">Kalori</p>
                                <p className="text-2xl font-bold">{meal.totalCalories}</p>
                              </div>
                            </div>

                            <div className="mb-4 bg-white p-4 rounded-lg">
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="ri-list-check text-emerald-600"></i>
                                Besinler:
                              </h4>
                              <div className="space-y-2">
                                {meal.foods.map((food, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-gray-800 font-medium">{food.foodName}</span>
                                    <span className="text-sm text-gray-600">{food.amount} {food.unit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-4">
                              <div className="bg-blue-50 p-3 rounded-lg text-center border-2 border-blue-200">
                                <p className="text-xs text-gray-600 mb-1">Protein</p>
                                <p className="text-xl font-bold text-blue-600">{meal.totalProtein}g</p>
                              </div>
                              <div className="bg-amber-50 p-3 rounded-lg text-center border-2 border-amber-200">
                                <p className="text-xs text-gray-600 mb-1">Karbonhidrat</p>
                                <p className="text-xl font-bold text-amber-600">{meal.totalCarbs}g</p>
                              </div>
                              <div className="bg-red-50 p-3 rounded-lg text-center border-2 border-red-200">
                                <p className="text-xs text-gray-600 mb-1">Yağ</p>
                                <p className="text-xl font-bold text-red-600">{meal.totalFat}g</p>
                              </div>
                            </div>

                            {meal.notes && (
                              <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
                                <p className="text-sm text-gray-700 flex items-start gap-2">
                                  <i className="ri-information-line text-amber-600 mt-0.5"></i>
                                  {meal.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl shadow-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-emerald-100 mb-1">Toplam Kalori</p>
                              <p className="text-4xl font-bold">{selectedDietPlan.totalCalories} kcal</p>
                            </div>
                            <div>
                              <p className="text-sm text-emerald-100 mb-1">Su Tüketimi</p>
                              <p className="text-4xl font-bold">{selectedDietPlan.waterIntake} L</p>
                            </div>
                          </div>
                        </div>

                        {selectedDietPlan.notes && (
                          <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-xl">
                            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2 text-lg">
                              <i className="ri-alert-line"></i>
                              Önemli Notlar
                            </h3>
                            <p className="text-gray-800 leading-relaxed">{selectedDietPlan.notes}</p>
                          </div>
                        )}
                      </div>
                    ) : viewMode === 'weekly' ? (
                      <div className="space-y-4">
                        {getWeekPlans().map((plan, idx) => (
                          <div key={idx} className="p-5 border-2 border-emerald-100 rounded-xl bg-white hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-emerald-700 mb-3 flex items-center gap-2">
                              <i className="ri-calendar-line"></i>
                              {weekDays[idx]}
                            </h3>
                            {plan ? (
                              <div className="space-y-2">
                                {(plan as DailyDietPlan).meals.map((meal, mIdx) => (
                                  <div key={mIdx} className="p-3 bg-emerald-50 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium text-gray-900">{meal.name} ({meal.time})</span>
                                      <span className="text-sm font-bold text-emerald-600">{meal.totalCalories} kcal</span>
                                    </div>
                                  </div>
                                ))}
                                <div className="mt-3 pt-3 border-t border-emerald-200 flex justify-between text-sm">
                                  <span className="font-bold text-gray-900">Toplam:</span>
                                  <span className="font-bold text-emerald-600">{(plan as DailyDietPlan).totalCalories} kcal</span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">Bu gün için plan bulunmuyor</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <i className="ri-calendar-close-line text-8xl text-gray-300 mb-4"></i>
                        <p className="text-gray-600 text-lg">Bu tarih için diyet planı bulunamadı.</p>
                      </div>
                    )}
                  </>
                )}

                {/* Exercise Plan Content */}
                {activeTab === 'exercise' && (
                  <>
                    {viewMode === 'daily' && selectedExercisePlan ? (
                      <div className="space-y-6">
                        {selectedExercisePlan.exercises.map((exercise) => (
                          <div key={exercise.exerciseId} className="p-6 border-2 border-blue-100 rounded-xl bg-gradient-to-r from-white to-blue-50 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                                  <i className="ri-run-line"></i>
                                  {exercise.exerciseName}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  <i className="ri-time-line mr-1"></i>
                                  {exercise.duration} dakika
                                </p>
                              </div>
                              <div className="text-right bg-blue-600 text-white px-4 py-2 rounded-lg">
                                <p className="text-xs mb-1">Kalori</p>
                                <p className="text-2xl font-bold">{exercise.calories}</p>
                              </div>
                            </div>

                            {(exercise.sets || exercise.reps) && (
                              <div className="flex gap-3 mb-4">
                                {exercise.sets && (
                                  <div className="bg-purple-50 px-5 py-3 rounded-lg border-2 border-purple-200 flex-1 text-center">
                                    <p className="text-xs text-gray-600 mb-1">Set</p>
                                    <p className="text-2xl font-bold text-purple-600">{exercise.sets}</p>
                                  </div>
                                )}
                                {exercise.reps && (
                                  <div className="bg-indigo-50 px-5 py-3 rounded-lg border-2 border-indigo-200 flex-1 text-center">
                                    <p className="text-xs text-gray-600 mb-1">Tekrar</p>
                                    <p className="text-2xl font-bold text-indigo-600">{exercise.reps}</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {exercise.notes && (
                              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                                <p className="text-sm text-gray-700 flex items-start gap-2">
                                  <i className="ri-information-line text-blue-600 mt-0.5"></i>
                                  {exercise.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-blue-100 mb-1">Toplam Süre</p>
                              <p className="text-4xl font-bold">{selectedExercisePlan.totalDuration} dk</p>
                            </div>
                            <div>
                              <p className="text-sm text-blue-100 mb-1">Yakılan Kalori</p>
                              <p className="text-4xl font-bold">{selectedExercisePlan.totalCalories} kcal</p>
                            </div>
                            <div>
                              <p className="text-sm text-blue-100 mb-1">Durum</p>
                              <p className="text-4xl font-bold">
                                {selectedExercisePlan.completed ? '✓' : '○'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {selectedExercisePlan.notes && (
                          <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-xl">
                            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2 text-lg">
                              <i className="ri-alert-line"></i>
                              Önemli Notlar
                            </h3>
                            <p className="text-gray-800 leading-relaxed">{selectedExercisePlan.notes}</p>
                          </div>
                        )}
                      </div>
                    ) : viewMode === 'weekly' ? (
                      <div className="space-y-4">
                        {getWeekPlans().map((plan, idx) => (
                          <div key={idx} className="p-5 border-2 border-blue-100 rounded-xl bg-white hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                              <i className="ri-calendar-line"></i>
                              {weekDays[idx]}
                            </h3>
                            {plan ? (
                              <div className="space-y-2">
                                {(plan as DailyExercisePlan).exercises.map((ex, eIdx) => (
                                  <div key={eIdx} className="p-3 bg-blue-50 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium text-gray-900">{ex.exerciseName} ({ex.duration} dk)</span>
                                      <span className="text-sm font-bold text-blue-600">{ex.calories} kcal</span>
                                    </div>
                                  </div>
                                ))}
                                <div className="mt-3 pt-3 border-t border-blue-200 flex justify-between text-sm">
                                  <span className="font-bold text-gray-900">Toplam:</span>
                                  <span className="font-bold text-blue-600">{(plan as DailyExercisePlan).totalDuration} dk / {(plan as DailyExercisePlan).totalCalories} kcal</span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">Bu gün için plan bulunmuyor</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <i className="ri-calendar-close-line text-8xl text-gray-300 mb-4"></i>
                        <p className="text-gray-600 text-lg">Bu tarih için spor programı bulunamadı.</p>
                      </div>
                    )}
                  </>
                )}

                {/* Detox Plan Content */}
                {activeTab === 'detox' && (
                  <>
                    {viewMode === 'daily' && selectedDetoxPlan ? (
                      <div className="space-y-6">
                        {selectedDetoxPlan.items.map((item) => (
                          <div key={item.detoxId} className="p-6 border-2 border-green-100 rounded-xl bg-gradient-to-r from-white to-green-50 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">
                                  <i className="ri-leaf-line"></i>
                                  {item.detoxName}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  <i className="ri-time-line mr-1"></i>
                                  {item.time}
                                </p>
                              </div>
                              <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
                                <p className="text-sm font-bold">{item.amount} {item.unit}</p>
                              </div>
                            </div>

                            {item.benefits && (
                              <div className="bg-green-50 p-4 rounded-lg mb-3 border-l-4 border-green-400">
                                <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-2">
                                  <i className="ri-heart-pulse-line"></i>
                                  Faydaları:
                                </p>
                                <p className="text-sm text-gray-700">{item.benefits}</p>
                              </div>
                            )}

                            {item.notes && (
                              <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
                                <p className="text-sm text-gray-700 flex items-start gap-2">
                                  <i className="ri-information-line text-amber-600 mt-0.5"></i>
                                  {item.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-green-100 mb-1">Su Tüketimi</p>
                              <p className="text-4xl font-bold">{selectedDetoxPlan.waterIntake} L</p>
                            </div>
                            <div>
                              <p className="text-sm text-green-100 mb-1">Durum</p>
                              <p className="text-4xl font-bold">
                                {selectedDetoxPlan.completed ? '✓' : '○'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {selectedDetoxPlan.notes && (
                          <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-xl">
                            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2 text-lg">
                              <i className="ri-alert-line"></i>
                              Önemli Notlar
                            </h3>
                            <p className="text-gray-800 leading-relaxed">{selectedDetoxPlan.notes}</p>
                          </div>
                        )}
                      </div>
                    ) : viewMode === 'weekly' ? (
                      <div className="space-y-4">
                        {getWeekPlans().map((plan, idx) => (
                          <div key={idx} className="p-5 border-2 border-green-100 rounded-xl bg-white hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                              <i className="ri-calendar-line"></i>
                              {weekDays[idx]}
                            </h3>
                            {plan ? (
                              <div className="space-y-2">
                                {(plan as DailyDetoxPlan).items.map((item, iIdx) => (
                                  <div key={iIdx} className="p-3 bg-green-50 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium text-gray-900">{item.detoxName} ({item.time})</span>
                                      <span className="text-sm font-bold text-green-600">{item.amount} {item.unit}</span>
                                    </div>
                                  </div>
                                ))}
                                <div className="mt-3 pt-3 border-t border-green-200 flex justify-between text-sm">
                                  <span className="font-bold text-gray-900">Su Tüketimi:</span>
                                  <span className="font-bold text-green-600">{(plan as DailyDetoxPlan).waterIntake} L</span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">Bu gün için plan bulunmuyor</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <i className="ri-calendar-close-line text-8xl text-gray-300 mb-4"></i>
                        <p className="text-gray-600 text-lg">Bu tarih için detoks programı bulunamadı.</p>
                      </div>
                    )}
                  </>
                )}
              </>
          </div>
        </div>
      </div>
    </div>
  );
}
