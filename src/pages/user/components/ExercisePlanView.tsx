import { ExercisePlan, User } from '../../../utils/database';

interface ExercisePlanViewProps {
  plan: ExercisePlan;
  user: User;
}

export default function ExercisePlanView({ plan, user }: ExercisePlanViewProps) {
  const bmi = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);

  const days = [
    { key: 'monday', label: 'Pazartesi', short: 'Pzt', color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' },
    { key: 'tuesday', label: 'Salı', short: 'Sal', color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600' },
    { key: 'wednesday', label: 'Çarşamba', short: 'Çar', color: 'from-cyan-400 to-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600' },
    { key: 'thursday', label: 'Perşembe', short: 'Per', color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600' },
    { key: 'friday', label: 'Cuma', short: 'Cum', color: 'from-amber-400 to-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600' },
    { key: 'saturday', label: 'Cumartesi', short: 'Cmt', color: 'from-red-400 to-red-600', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' },
    { key: 'sunday', label: 'Pazar', short: 'Paz', color: 'from-pink-400 to-pink-600', bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600' }
  ];

  // Count active days
  const activeDays = days.filter(day => {
    const content = plan[day.key as keyof ExercisePlan] as string;
    return content && content.trim() !== '';
  }).length;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Egzersiz Programınız</h2>
            <p className="text-blue-100">Dyt. Ayşenur Korkmaz tarafından hazırlandı</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
              <p className="text-blue-100 text-sm">Haftalık Program</p>
              <p className="text-3xl font-bold">{activeDays}</p>
              <p className="text-blue-100 text-xs">aktif gün</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-user-line text-2xl text-blue-500 mb-2"></i>
            <p className="text-xs text-gray-500">Ad Soyad</p>
            <p className="font-semibold text-gray-800 truncate">{user.fullName}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-calendar-line text-2xl text-purple-500 mb-2"></i>
            <p className="text-xs text-gray-500">Yaş</p>
            <p className="font-semibold text-gray-800">{user.age}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-ruler-line text-2xl text-cyan-500 mb-2"></i>
            <p className="text-xs text-gray-500">Boy</p>
            <p className="font-semibold text-gray-800">{user.height} cm</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-scales-2-line text-2xl text-emerald-500 mb-2"></i>
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

      {/* Weekly Schedule */}
      <div className="space-y-4">
        {days.map((day, idx) => {
          const content = plan[day.key as keyof ExercisePlan] as string;
          const hasContent = content && content.trim() !== '';

          return (
            <div
              key={idx}
              className={`${day.bg} ${day.border} border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex">
                {/* Day Indicator */}
                <div className={`bg-gradient-to-b ${day.color} w-24 flex flex-col items-center justify-center py-4 text-white`}>
                  <span className="text-xs opacity-80">Gün {idx + 1}</span>
                  <span className="text-lg font-bold">{day.label}</span>
                  {hasContent ? (
                    <div className="mt-2 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-sm"></i>
                    </div>
                  ) : (
                    <div className="mt-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <i className="ri-zzz-line text-sm"></i>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 p-5">
                  {hasContent ? (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</p>
                  ) : (
                    <div className="flex items-center gap-3 text-gray-400 h-full">
                      <i className="ri-moon-clear-line text-2xl"></i>
                      <div>
                        <p className="font-medium">Dinlenme Günü</p>
                        <p className="text-sm">Bu gün için egzersiz planlanmadı</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notes Section */}
      {plan.notes && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
                <i className="ri-sticky-note-line text-xl text-white"></i>
              </div>
              <h3 className="font-bold text-white text-lg">Antrenör Notları</h3>
            </div>
          </div>
          <div className="p-5">
            <p className="text-amber-900 leading-relaxed whitespace-pre-wrap">{plan.notes}</p>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <i className="ri-flashlight-line text-xl text-blue-600"></i>
          </div>
          <h3 className="font-bold text-blue-800 text-lg">Egzersiz İpuçları</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: 'ri-fire-line', text: 'Egzersiz öncesi 5-10 dakika ısının' },
            { icon: 'ri-body-scan-line', text: 'Hareketleri doğru formda yapın' },
            { icon: 'ri-drop-line', text: 'Egzersiz sırasında bol su için' },
            { icon: 'ri-alarm-warning-line', text: 'Ağrı hissederseniz durun' },
            { icon: 'ri-walk-line', text: 'Egzersiz sonrası soğuma yapın' },
            { icon: 'ri-zzz-line', text: 'Yeterli uyku almaya dikkat edin' }
          ].map((tip, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
              <i className={`${tip.icon} text-lg text-blue-500`}></i>
              <span className="text-blue-800 text-sm">{tip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
