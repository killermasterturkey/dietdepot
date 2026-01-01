import { DetoxPlan, User } from '../../../utils/database';

interface DetoxPlanViewProps {
  plan: DetoxPlan;
  user: User;
}

export default function DetoxPlanView({ plan, user }: DetoxPlanViewProps) {
  const bmi = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);

  const timeSlots = [
    {
      title: 'Sabah Programı',
      time: '06:00 - 10:00',
      content: plan.morning,
      icon: 'ri-sun-line',
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    {
      title: 'Öğlen Programı',
      time: '12:00 - 15:00',
      content: plan.afternoon,
      icon: 'ri-sun-foggy-line',
      gradient: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    {
      title: 'Akşam Programı',
      time: '18:00 - 21:00',
      content: plan.evening,
      icon: 'ri-moon-line',
      gradient: 'from-indigo-400 to-purple-500',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Detoks Programınız</h2>
            <p className="text-teal-100">Dyt. Ayşenur Korkmaz tarafından hazırlandı</p>
          </div>
          {plan.duration && (
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
                <p className="text-teal-100 text-sm">Program Süresi</p>
                <p className="text-2xl font-bold">{plan.duration}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-user-line text-2xl text-teal-500 mb-2"></i>
            <p className="text-xs text-gray-500">Ad Soyad</p>
            <p className="font-semibold text-gray-800 truncate">{user.fullName}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-calendar-line text-2xl text-emerald-500 mb-2"></i>
            <p className="text-xs text-gray-500">Yaş</p>
            <p className="font-semibold text-gray-800">{user.age}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-ruler-line text-2xl text-cyan-500 mb-2"></i>
            <p className="text-xs text-gray-500">Boy</p>
            <p className="font-semibold text-gray-800">{user.height} cm</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <i className="ri-scales-2-line text-2xl text-green-500 mb-2"></i>
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

      {/* Time Slots */}
      <div className="space-y-5">
        {timeSlots.map((slot, idx) => (
          <div
            key={idx}
            className={`${slot.bg} ${slot.border} border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300`}
          >
            {/* Slot Header */}
            <div className={`bg-gradient-to-r ${slot.gradient} p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                    <i className={`${slot.icon} text-2xl text-white`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{slot.title}</h3>
                    <p className="text-white/80 text-sm">{slot.time}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Slot Content */}
            <div className="p-5">
              {slot.content ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{slot.content}</p>
              ) : (
                <div className="flex items-center gap-2 text-gray-400">
                  <i className="ri-information-line"></i>
                  <p className="italic">Bu zaman dilimi için henüz içerik eklenmemiş</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      {plan.benefits && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-400 to-green-500 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
                <i className="ri-heart-pulse-line text-xl text-white"></i>
              </div>
              <h3 className="font-bold text-white text-lg">Programın Faydaları</h3>
            </div>
          </div>
          <div className="p-5">
            <p className="text-emerald-900 leading-relaxed whitespace-pre-wrap">{plan.benefits}</p>
          </div>
        </div>
      )}

      {/* Warnings Section */}
      {plan.warnings && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-400 to-rose-500 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
                <i className="ri-alert-line text-xl text-white"></i>
              </div>
              <h3 className="font-bold text-white text-lg">Önemli Uyarılar</h3>
            </div>
          </div>
          <div className="p-5">
            <p className="text-red-900 leading-relaxed whitespace-pre-wrap">{plan.warnings}</p>
          </div>
        </div>
      )}

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Water Tips */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <i className="ri-drop-line text-xl text-cyan-600"></i>
            </div>
            <h3 className="font-bold text-cyan-800 text-lg">Su Tüketimi</h3>
          </div>
          <div className="space-y-2">
            {[
              'Günde en az 2.5-3 litre su için',
              'Sabah kalktığınızda ılık su için',
              'Her öğün öncesi 1 bardak su için',
              'Bitkisel çayları şekersiz tüketin',
              'Limonlu su tercih edin'
            ].map((tip, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-white/60 rounded-lg">
                <i className="ri-checkbox-circle-line text-cyan-500"></i>
                <span className="text-cyan-800 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Caution Tips */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <i className="ri-error-warning-line text-xl text-amber-600"></i>
            </div>
            <h3 className="font-bold text-amber-800 text-lg">Dikkat Edilmesi Gerekenler</h3>
          </div>
          <div className="space-y-2">
            {[
              'Hamilelikte detoks uygulamayın',
              'Kronik hastalıkta doktora danışın',
              'İlaç kullanıyorsanız onay alın',
              'Yorgunlukta programı durdurun',
              'Ağır egzersizlerden kaçının'
            ].map((tip, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-white/60 rounded-lg">
                <i className="ri-alert-line text-amber-500"></i>
                <span className="text-amber-800 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
