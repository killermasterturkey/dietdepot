import { User } from '../../../utils/database';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onManagePlans: (user: User) => void;
}

export default function UserList({ users, onEdit, onDelete, onManagePlans }: UserListProps) {
  const regularUsers = users.filter(u => !u.isAdmin);

  if (regularUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="ri-user-line text-6xl text-gray-300 mb-4"></i>
        <p className="text-gray-600">Henüz kullanıcı bulunmuyor</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {regularUsers.map((user) => (
        <div
          key={user.id}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full">
                  <span className="text-white font-bold text-lg">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{user.fullName}</h3>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-mail-line text-emerald-600"></i>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-phone-line text-emerald-600"></i>
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-calendar-line text-emerald-600"></i>
                  <span>{user.age} yaş</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-weight-line text-emerald-600"></i>
                  <span>{user.weight} kg</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-ruler-line text-emerald-600"></i>
                  <span>{user.height} cm</span>
                </div>
                {user.targetWeight && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="ri-flag-line text-emerald-600"></i>
                    <span>Hedef: {user.targetWeight} kg</span>
                  </div>
                )}
              </div>

              {(user.bloodType || user.allergies || user.medicalConditions) && (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  {user.bloodType && (
                    <div className="flex items-start gap-2 text-sm">
                      <i className="ri-drop-line text-red-600 mt-0.5"></i>
                      <span className="text-gray-700"><strong>Kan Grubu:</strong> {user.bloodType}</span>
                    </div>
                  )}
                  {user.allergies && (
                    <div className="flex items-start gap-2 text-sm">
                      <i className="ri-alert-line text-orange-600 mt-0.5"></i>
                      <span className="text-gray-700"><strong>Alerjiler:</strong> {user.allergies}</span>
                    </div>
                  )}
                  {user.medicalConditions && (
                    <div className="flex items-start gap-2 text-sm">
                      <i className="ri-heart-pulse-line text-red-600 mt-0.5"></i>
                      <span className="text-gray-700"><strong>Kronik Hastalıklar:</strong> {user.medicalConditions}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => onManagePlans(user)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
              >
                <i className="ri-file-list-3-line mr-2"></i>
                Planları Yönet
              </button>
              <button
                onClick={() => onEdit(user)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
              >
                <i className="ri-edit-line mr-2"></i>
                Düzenle
              </button>
              <button
                onClick={() => onDelete(user)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
              >
                <i className="ri-delete-bin-line mr-2"></i>
                Sil
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
