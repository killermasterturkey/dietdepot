import { DietPlan, User } from '../../../utils/database';

interface DietPlanViewProps {
  plan: DietPlan;
  user: User;
}

export default function DietPlanView({ plan, user }: DietPlanViewProps) {
  const bmi = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);

  const meals = [
    {
      title: 'Kahvaltı',
      time: '07:00 - 09:00',
      content: plan.breakfast,
      icon: 'ri-sun-line',
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Öğle Yemeği',
      time: '12:00 - 13:30',
      content: plan.lunch,
      icon: 'ri-sun-foggy-line',
      gradient: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Akşam Yemeği',
      time: '18:00 - 19:30',
      content: plan.dinner,
      icon: 'ri-moon-line',
      gradient: 'from-indigo-400 to-purple-500',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Ara Öğünler',
      time: '10:00 & 15:00',
      content: plan.snacks,
      icon: 'ri-cake-2-line',
      gradient: 'from-pink-400 to-rose-500',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Diyet Programınız</h2>
            <p className="text-emerald-100">Dyt. Ayşenur Korkmaz tarafından hazırlandı</p>
          </div>
          {plan.calories && (
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
                <p className="text-emerald-100 text-sm">Günlük Kalori</p>
                <p className="text-3xl font-bold">{plan.calories}</p>
                <p className="text-emerald-100 text-xs">kcal</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-user-line text-2xl text-emerald-500 mb-2"></i>
            <p className="text-xs text-gray-500">Ad Soyad</p>
            <p className="font-semibold text-gray-800 truncate">{user.fullName}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-calendar-line text-2xl text-blue-500 mb-2"></i>
            <p className="text-xs text-gray-500">Yaş</p>
            <p className="font-semibold text-gray-800">{user.age}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-ruler-line text-2xl text-purple-500 mb-2"></i>
            <p className="text-xs text-gray-500">Boy</p>
            <p className="font-semibold text-gray-800">{user.height} cm</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-scales-2-line text-2xl text-orange-500 mb-2"></i>
            <p className="text-xs text-gray-500">Kilo</p>
            <p className="font-semibold text-gray-800">{user.weight} kg</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-heart-pulse-line text-2xl text-red-500 mb-2"></i>
            <p className="text-xs text-gray-500">BMI</p>
            <p className="font-semibold text-gray-800">{bmi}</p>
          </div>
        </div>
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {meals.map((meal, idx) => (
          <div
            key={idx}
            className={`${meal.bg} ${meal.border} border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300`}
          >
            {/* Meal Header */}
            <div className={`bg-gradient-to-r ${meal.gradient} p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
                    <i className={`${meal.icon} text-xl text-white`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{meal.title}</h3>
                    <p className="text-white/80 text-sm">{meal.time}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Meal Content */}
            <div className="p-5">
              {meal.content ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{meal.content}</p>
              ) : (
                <div className="flex items-center gap-2 text-gray-400">
                  <i className="ri-information-line"></i>
                  <p className="italic">Bu öğün için henüz içerik eklenmemiş</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      {plan.notes && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
                <i className="ri-sticky-note-line text-xl text-white"></i>
              </div>
              <h3 className="font-bold text-white text-lg">Diyetisyen Notları</h3>
            </div>
          </div>
          <div className="p-5">
            <p className="text-amber-900 leading-relaxed whitespace-pre-wrap">{plan.notes}</p>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <i className="ri-lightbulb-line text-xl text-emerald-600"></i>
          </div>
          <h3 className="font-bold text-emerald-800 text-lg">Beslenme Önerileri</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: 'ri-drop-line', text: 'Günde en az 2-2.5 litre su için' },
            { icon: 'ri-time-line', text: 'Öğünlerinizi düzenli saatlerde yiyin' },
            { icon: 'ri-restaurant-line', text: 'Yemeklerinizi yavaş yavaş çiğneyin' },
            { icon: 'ri-apple-line', text: 'Ara öğünleri atlamayın' },
            { icon: 'ri-moon-clear-line', text: 'Gece 20:00\'den sonra yemek yemeyin' },
            { icon: 'ri-run-line', text: 'Haftada en az 3 gün egzersiz yapın' }
          ].map((tip, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
              <i className={`${tip.icon} text-lg text-emerald-500`}></i>
              <span className="text-emerald-800 text-sm">{tip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
