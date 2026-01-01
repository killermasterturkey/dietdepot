import { useState, useEffect } from 'react';
import { db, User, DailyDietPlan, DailyExercisePlan, DailyDetoxPlan, Meal, MealFood, ExerciseEntry, DetoxEntry, FoodItem, ExerciseItem, DetoxItem } from '../../../utils/database';

interface PlanManagementProps {
  user: User;
  onClose: () => void;
}

type PlanType = 'diet' | 'exercise' | 'detox';

export default function PlanManagement({ user, onClose }: PlanManagementProps) {
  const [planType, setPlanType] = useState<PlanType>('diet');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Database items for selection
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>([]);
  const [detoxItemsList, setDetoxItemsList] = useState<DetoxItem[]>([]);

  // Diet Plan State
  const [meals, setMeals] = useState<Meal[]>([]);
  const [waterIntake, setWaterIntake] = useState(2.5);
  const [dietNotes, setDietNotes] = useState('');

  // Exercise Plan State
  const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
  const [exerciseNotes, setExerciseNotes] = useState('');

  // Detox Plan State
  const [detoxItems, setDetoxItems] = useState<DetoxEntry[]>([]);
  const [detoxWaterIntake, setDetoxWaterIntake] = useState(3);
  const [detoxNotes, setDetoxNotes] = useState('');

  useEffect(() => {
    loadDatabaseItems();
  }, []);

  useEffect(() => {
    loadPlans();
  }, [planType, selectedDate, user.id]);

  const loadDatabaseItems = async () => {
    const foods = await db.getAllFoodItems();
    const exercisesDb = await db.getAllExerciseItems();
    const detoxDb = await db.getAllDetoxItems();
    setFoodItems(foods);
    setExerciseItems(exercisesDb);
    setDetoxItemsList(detoxDb);
  };

  const loadPlans = async () => {
    try {
      if (planType === 'diet') {
        const plans = await db.getDailyDietPlansByUser(user.id);
        const todayPlan = plans.find(p => p.date === selectedDate);
        if (todayPlan) {
          setMeals(todayPlan.meals);
          setWaterIntake(todayPlan.waterIntake);
          setDietNotes(todayPlan.notes);
        } else {
          setMeals([]);
          setWaterIntake(2.5);
          setDietNotes('');
        }
      } else if (planType === 'exercise') {
        const plans = await db.getDailyExercisePlansByUser(user.id);
        const todayPlan = plans.find(p => p.date === selectedDate);
        if (todayPlan) {
          setExercises(todayPlan.exercises);
          setExerciseNotes(todayPlan.notes);
        } else {
          setExercises([]);
          setExerciseNotes('');
        }
      } else if (planType === 'detox') {
        const plans = await db.getDailyDetoxPlansByUser(user.id);
        const todayPlan = plans.find(p => p.date === selectedDate);
        if (todayPlan) {
          setDetoxItems(todayPlan.items);
          setDetoxWaterIntake(todayPlan.waterIntake);
          setDetoxNotes(todayPlan.notes);
        } else {
          setDetoxItems([]);
          setDetoxWaterIntake(3);
          setDetoxNotes('');
        }
      }
    } catch (error) {
      console.error('Plan yüklenirken hata:', error);
    }
  };

  // Diet functions
  const addMeal = () => {
    const newMeal: Meal = {
      id: `meal-${Date.now()}`,
      name: '',
      time: '08:00',
      foods: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      notes: ''
    };
    setMeals([...meals, newMeal]);
  };

  const updateMeal = (index: number, field: keyof Meal, value: any) => {
    const updated = [...meals];
    updated[index] = { ...updated[index], [field]: value };
    setMeals(updated);
  };

  const addFoodToMeal = (mealIndex: number, foodItem: FoodItem) => {
    const updated = [...meals];
    const newFood: MealFood = {
      foodId: foodItem.id,
      foodName: foodItem.name,
      amount: 100,
      unit: 'gram',
      calories: foodItem.calories,
      protein: foodItem.protein,
      carbs: foodItem.carbs,
      fat: foodItem.fat
    };
    updated[mealIndex].foods.push(newFood);
    // Recalculate totals
    updated[mealIndex].totalCalories = updated[mealIndex].foods.reduce((sum, f) => sum + f.calories, 0);
    updated[mealIndex].totalProtein = updated[mealIndex].foods.reduce((sum, f) => sum + f.protein, 0);
    updated[mealIndex].totalCarbs = updated[mealIndex].foods.reduce((sum, f) => sum + f.carbs, 0);
    updated[mealIndex].totalFat = updated[mealIndex].foods.reduce((sum, f) => sum + f.fat, 0);
    setMeals(updated);
  };

  const updateFoodInMeal = (mealIndex: number, foodIndex: number, field: keyof MealFood, value: any) => {
    const updated = [...meals];
    updated[mealIndex].foods[foodIndex] = { ...updated[mealIndex].foods[foodIndex], [field]: value };
    // Recalculate totals
    updated[mealIndex].totalCalories = updated[mealIndex].foods.reduce((sum, f) => sum + f.calories, 0);
    updated[mealIndex].totalProtein = updated[mealIndex].foods.reduce((sum, f) => sum + f.protein, 0);
    updated[mealIndex].totalCarbs = updated[mealIndex].foods.reduce((sum, f) => sum + f.carbs, 0);
    updated[mealIndex].totalFat = updated[mealIndex].foods.reduce((sum, f) => sum + f.fat, 0);
    setMeals(updated);
  };

  const removeFoodFromMeal = (mealIndex: number, foodIndex: number) => {
    const updated = [...meals];
    updated[mealIndex].foods.splice(foodIndex, 1);
    // Recalculate totals
    updated[mealIndex].totalCalories = updated[mealIndex].foods.reduce((sum, f) => sum + f.calories, 0);
    updated[mealIndex].totalProtein = updated[mealIndex].foods.reduce((sum, f) => sum + f.protein, 0);
    updated[mealIndex].totalCarbs = updated[mealIndex].foods.reduce((sum, f) => sum + f.carbs, 0);
    updated[mealIndex].totalFat = updated[mealIndex].foods.reduce((sum, f) => sum + f.fat, 0);
    setMeals(updated);
  };

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  // Exercise functions
  const addExercise = (exerciseItem: ExerciseItem) => {
    const newExercise: ExerciseEntry = {
      exerciseId: exerciseItem.id,
      exerciseName: exerciseItem.name,
      duration: 30,
      sets: 3,
      reps: 10,
      calories: Math.round(exerciseItem.caloriesPerMinute * 30),
      notes: ''
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (index: number, field: keyof ExerciseEntry, value: any) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  // Detox functions
  const addDetoxItem = (detoxItem: DetoxItem) => {
    const newItem: DetoxEntry = {
      detoxId: detoxItem.id,
      detoxName: detoxItem.name,
      time: '08:00',
      amount: 1,
      unit: detoxItem.servingUnit,
      benefits: detoxItem.benefits,
      notes: ''
    };
    setDetoxItems([...detoxItems, newItem]);
  };

  const updateDetoxItem = (index: number, field: keyof DetoxEntry, value: any) => {
    const updated = [...detoxItems];
    updated[index] = { ...updated[index], [field]: value };
    setDetoxItems(updated);
  };

  const removeDetoxItem = (index: number) => {
    setDetoxItems(detoxItems.filter((_, i) => i !== index));
  };

  const savePlan = async () => {
    setLoading(true);
    setSuccess('');
    try {
      const now = new Date().toISOString();

      if (planType === 'diet') {
        const totalCalories = meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
        const totalProtein = meals.reduce((sum, meal) => sum + meal.totalProtein, 0);
        const totalCarbs = meals.reduce((sum, meal) => sum + meal.totalCarbs, 0);
        const totalFat = meals.reduce((sum, meal) => sum + meal.totalFat, 0);

        const plans = await db.getDailyDietPlansByUser(user.id);
        const existingPlan = plans.find(p => p.date === selectedDate);

        const dietPlan: DailyDietPlan = {
          id: existingPlan?.id || `diet-${user.id}-${Date.now()}`,
          userId: user.id,
          date: selectedDate,
          meals,
          totalCalories,
          totalProtein,
          totalCarbs,
          totalFat,
          waterIntake,
          notes: dietNotes,
          createdAt: existingPlan?.createdAt || now,
          updatedAt: now
        };

        if (existingPlan) {
          await db.updateDailyDietPlan(dietPlan);
        } else {
          await db.addDailyDietPlan(dietPlan);
        }
      } else if (planType === 'exercise') {
        const totalDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0);
        const totalCalories = exercises.reduce((sum, ex) => sum + ex.calories, 0);
        const plans = await db.getDailyExercisePlansByUser(user.id);
        const existingPlan = plans.find(p => p.date === selectedDate);

        const exercisePlan: DailyExercisePlan = {
          id: existingPlan?.id || `exercise-${user.id}-${Date.now()}`,
          userId: user.id,
          date: selectedDate,
          exercises,
          totalDuration,
          totalCalories,
          completed: false,
          notes: exerciseNotes,
          createdAt: existingPlan?.createdAt || now,
          updatedAt: now
        };

        if (existingPlan) {
          await db.updateDailyExercisePlan(exercisePlan);
        } else {
          await db.addDailyExercisePlan(exercisePlan);
        }
      } else if (planType === 'detox') {
        const plans = await db.getDailyDetoxPlansByUser(user.id);
        const existingPlan = plans.find(p => p.date === selectedDate);

        const detoxPlan: DailyDetoxPlan = {
          id: existingPlan?.id || `detox-${user.id}-${Date.now()}`,
          userId: user.id,
          date: selectedDate,
          items: detoxItems,
          waterIntake: detoxWaterIntake,
          completed: false,
          notes: detoxNotes,
          createdAt: existingPlan?.createdAt || now,
          updatedAt: now
        };

        if (existingPlan) {
          await db.updateDailyDetoxPlan(detoxPlan);
        } else {
          await db.addDailyDetoxPlan(detoxPlan);
        }
      }

      setSuccess('Plan başarıyla kaydedildi!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Plan kaydedilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{user.fullName} - Plan Yönetimi</h2>
            <p className="text-emerald-100 text-sm mt-1">Günlük planları oluşturun ve yönetin</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-2xl text-white"></i>
          </button>
        </div>

        {/* Plan Type Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setPlanType('diet')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              planType === 'diet'
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-restaurant-line mr-2"></i>
            Diyet Planı
          </button>
          <button
            onClick={() => setPlanType('exercise')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              planType === 'exercise'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-run-line mr-2"></i>
            Spor Programı
          </button>
          <button
            onClick={() => setPlanType('detox')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              planType === 'detox'
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-leaf-line mr-2"></i>
            Detoks Programı
          </button>
        </div>

        {/* Date Selector */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Tarih:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Diet Plan */}
          {planType === 'diet' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Öğünler</h3>
                <button
                  onClick={addMeal}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <i className="ri-add-line mr-2"></i>
                  Öğün Ekle
                </button>
              </div>

              {meals.map((meal, mealIndex) => (
                <div key={meal.id} className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={meal.name}
                      onChange={(e) => updateMeal(mealIndex, 'name', e.target.value)}
                      placeholder="Öğün adı (örnek: Kahvaltı)"
                      className="text-lg font-semibold bg-transparent border-b border-gray-300 focus:border-emerald-500 outline-none px-2 py-1"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={meal.time}
                        onChange={(e) => updateMeal(mealIndex, 'time', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                      />
                      <button
                        onClick={() => removeMeal(mealIndex)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>

                  {/* Foods in meal */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Besinler</span>
                      <select
                        onChange={(e) => {
                          const food = foodItems.find(f => f.id === e.target.value);
                          if (food) addFoodToMeal(mealIndex, food);
                          e.target.value = '';
                        }}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        value=""
                      >
                        <option value="">Besin ekle...</option>
                        {foodItems.map(food => (
                          <option key={food.id} value={food.id}>{food.name} ({food.calories} kcal)</option>
                        ))}
                      </select>
                    </div>

                    {meal.foods.map((food, foodIndex) => (
                      <div key={foodIndex} className="flex items-center gap-2 bg-white p-3 rounded-lg">
                        <span className="flex-1 font-medium">{food.foodName}</span>
                        <input
                          type="number"
                          value={food.amount}
                          onChange={(e) => updateFoodInMeal(mealIndex, foodIndex, 'amount', parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-sm text-gray-500">{food.unit}</span>
                        <span className="text-sm text-emerald-600 font-medium">{food.calories} kcal</span>
                        <button
                          onClick={() => removeFoodFromMeal(mealIndex, foodIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Meal totals */}
                  <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Kalori</p>
                      <p className="font-bold text-emerald-600">{meal.totalCalories}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="font-bold">{meal.totalProtein.toFixed(1)}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Karb</p>
                      <p className="font-bold">{meal.totalCarbs.toFixed(1)}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Yağ</p>
                      <p className="font-bold">{meal.totalFat.toFixed(1)}g</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Daily Summary */}
              <div className="bg-emerald-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Günlük Özet</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Su Tüketimi (litre)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={waterIntake}
                      onChange={(e) => setWaterIntake(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Toplam Kalori</label>
                    <input
                      type="text"
                      value={meals.reduce((sum, m) => sum + m.totalCalories, 0)}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notlar</label>
                  <textarea
                    value={dietNotes}
                    onChange={(e) => setDietNotes(e.target.value)}
                    placeholder="Günlük diyet notları..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Exercise Plan */}
          {planType === 'exercise' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Egzersizler</h3>
                <select
                  onChange={(e) => {
                    const ex = exerciseItems.find(x => x.id === e.target.value);
                    if (ex) addExercise(ex);
                    e.target.value = '';
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  value=""
                >
                  <option value="">Egzersiz ekle...</option>
                  {exerciseItems.map(ex => (
                    <option key={ex.id} value={ex.id}>{ex.name} ({ex.category})</option>
                  ))}
                </select>
              </div>

              {exercises.map((exercise, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{exercise.exerciseName}</h4>
                    <button
                      onClick={() => removeExercise(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Süre (dk)</label>
                      <input
                        type="number"
                        value={exercise.duration}
                        onChange={(e) => updateExercise(index, 'duration', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Set</label>
                      <input
                        type="number"
                        value={exercise.sets || 0}
                        onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Tekrar</label>
                      <input
                        type="number"
                        value={exercise.reps || 0}
                        onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Kalori</label>
                      <input
                        type="number"
                        value={exercise.calories}
                        onChange={(e) => updateExercise(index, 'calories', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Günlük Özet</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Toplam Süre</p>
                    <p className="text-2xl font-bold text-blue-600">{exercises.reduce((sum, ex) => sum + ex.duration, 0)} dk</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Toplam Kalori</p>
                    <p className="text-2xl font-bold text-blue-600">{exercises.reduce((sum, ex) => sum + ex.calories, 0)} kcal</p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notlar</label>
                  <textarea
                    value={exerciseNotes}
                    onChange={(e) => setExerciseNotes(e.target.value)}
                    placeholder="Günlük egzersiz notları..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Detox Plan */}
          {planType === 'detox' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Detoks Öğeleri</h3>
                <select
                  onChange={(e) => {
                    const item = detoxItemsList.find(d => d.id === e.target.value);
                    if (item) addDetoxItem(item);
                    e.target.value = '';
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  value=""
                >
                  <option value="">Detoks öğesi ekle...</option>
                  {detoxItemsList.map(item => (
                    <option key={item.id} value={item.id}>{item.name} ({item.category})</option>
                  ))}
                </select>
              </div>

              {detoxItems.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{item.detoxName}</h4>
                    <button
                      onClick={() => removeDetoxItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Saat</label>
                      <input
                        type="time"
                        value={item.time}
                        onChange={(e) => updateDetoxItem(index, 'time', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Miktar</label>
                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) => updateDetoxItem(index, 'amount', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Birim</label>
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => updateDetoxItem(index, 'unit', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">{item.benefits}</p>
                </div>
              ))}

              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Günlük Bilgiler</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Su Tüketimi (litre)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={detoxWaterIntake}
                    onChange={(e) => setDetoxWaterIntake(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notlar</label>
                  <textarea
                    value={detoxNotes}
                    onChange={(e) => setDetoxNotes(e.target.value)}
                    placeholder="Günlük detoks notları..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-6 mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            Kapat
          </button>
          <button
            onClick={savePlan}
            disabled={loading}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {loading ? 'Kaydediliyor...' : 'Planı Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
