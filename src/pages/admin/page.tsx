import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, User, initializeDefaultAdmin } from '../../utils/database';
import UserList from './components/UserList';
import CreateUserModal from './components/CreateUserModal';
import EditUserModal from './components/EditUserModal';
import FoodDatabase from './components/FoodDatabase';
import ExerciseDatabase from './components/ExerciseDatabase';
import DetoxDatabase from './components/DetoxDatabase';
import RecipeDatabase from './components/RecipeDatabase';
import PlanManagement from './components/PlanManagement';
import ButterflyLogo from '../../components/ButterflyLogo';

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'food' | 'exercise' | 'detox' | 'recipe' | 'plans'>('users');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [managingPlansUser, setManagingPlansUser] = useState<User | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userDataCounts, setUserDataCounts] = useState<Record<string, number> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userStr);
    if (!user.isAdmin) {
      navigate('/user');
      return;
    }

    setCurrentUser(user);
    loadUsers();
  }, [navigate]);

  const loadUsers = async () => {
    const allUsers = await db.getAllUsers();
    setUsers(allUsers.filter(u => !u.isAdmin));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleDeleteUser = async (user: User) => {
    // Kullanıcının veri sayılarını al
    const counts = await db.getUserDataCount(user.id);
    setUserDataCounts(counts);
    setDeletingUser(user);
  };

  const confirmDeleteUser = async () => {
    if (!deletingUser) return;

    setDeleteLoading(true);
    try {
      await db.deleteUser(deletingUser.id);
      console.log(`[Admin] Kullanıcı ve tüm verileri silindi: ${deletingUser.id}`);
      await loadUsers();
      setDeletingUser(null);
      setUserDataCounts(null);
    } catch (error) {
      console.error('Kullanıcı silinirken hata:', error);
      alert('Kullanıcı silinirken bir hata oluştu!');
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDeleteUser = () => {
    setDeletingUser(null);
    setUserDataCounts(null);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleManagePlans = (user: User) => {
    setManagingPlansUser(user);
  };

  const handleResetDatabases = async () => {
    if (window.confirm('Tüm veritabanlarını sıfırlamak istediğinizden emin misiniz?\n\nBu işlem mevcut tüm Yiyecek, Egzersiz, Detoks ve Tarif verilerini silecek ve yeni doğrulanmış verilerle değiştirecektir.\n\nBu işlem geri alınamaz!')) {
      setIsResetting(true);
      try {
        await db.resetAllDatabases();
        await initializeDefaultAdmin();
        alert('Veritabanları başarıyla sıfırlandı ve yeni veriler yüklendi!\n\n- 192 Yiyecek\n- 130 Egzersiz\n- 90 Detoks öğesi\n- 32 Tarif\n\nSayfayı yenileyerek güncel verileri görebilirsiniz.');
        window.location.reload();
      } catch (error) {
        console.error('Reset error:', error);
        alert('Sıfırlama sırasında bir hata oluştu!');
      } finally {
        setIsResetting(false);
      }
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden border-2 border-white">
                <ButterflyLogo size={32} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
                <p className="text-sm text-green-600 font-medium">Dyt Ayşenur Korkmaz</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetDatabases}
                disabled={isResetting}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                title="Tüm veritabanlarını sıfırla ve yeni doğrulanmış verileri yükle"
              >
                {isResetting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <i className="ri-refresh-line mr-2"></i>
                    DB Sıfırla
                  </>
                )}
              </button>
              <div className="text-right bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <p className="text-sm font-bold text-gray-900">{currentUser.fullName}</p>
                <p className="text-xs text-green-600">Yönetici</p>
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

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-2 flex flex-wrap gap-2 border border-green-100">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 min-w-[140px] px-5 py-3 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <i className="ri-user-line mr-2 text-lg"></i>
            Kullanıcılar
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`flex-1 min-w-[140px] px-5 py-3 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
              activeTab === 'food'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <i className="ri-apple-line mr-2 text-lg"></i>
            Yiyecek DB
          </button>
          <button
            onClick={() => setActiveTab('recipe')}
            className={`flex-1 min-w-[140px] px-5 py-3 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
              activeTab === 'recipe'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <i className="ri-restaurant-line mr-2 text-lg"></i>
            Yemek DB
          </button>
          <button
            onClick={() => setActiveTab('exercise')}
            className={`flex-1 min-w-[140px] px-5 py-3 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
              activeTab === 'exercise'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <i className="ri-run-line mr-2 text-lg"></i>
            Egzersiz DB
          </button>
          <button
            onClick={() => setActiveTab('detox')}
            className={`flex-1 min-w-[140px] px-5 py-3 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
              activeTab === 'detox'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <i className="ri-leaf-line mr-2 text-lg"></i>
            Detoks DB
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`flex-1 min-w-[140px] px-5 py-3 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
              activeTab === 'plans'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <i className="ri-calendar-check-line mr-2 text-lg"></i>
            Plan Yönetimi
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-green-100">
          {activeTab === 'users' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h2>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-user-add-line text-lg"></i>
                  Yeni Kullanıcı
                </button>
              </div>
              <UserList
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onManagePlans={handleManagePlans}
              />
            </>
          )}

          {activeTab === 'food' && <FoodDatabase />}
          {activeTab === 'exercise' && <ExerciseDatabase />}
          {activeTab === 'detox' && <DetoxDatabase />}
          {activeTab === 'recipe' && <RecipeDatabase />}
          {activeTab === 'plans' && (
            <div className="text-center py-12">
              <i className="ri-calendar-check-line text-6xl text-green-300 mb-4"></i>
              <p className="text-gray-600 mb-4">Kullanıcı planlarını yönetmek için Kullanıcılar sekmesinden bir kullanıcı seçin</p>
              <button
                onClick={() => setActiveTab('users')}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <i className="ri-user-line mr-2"></i>
                Kullanıcılara Git
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadUsers();
          }}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => {
            setEditingUser(null);
            loadUsers();
          }}
        />
      )}

      {managingPlansUser && (
        <PlanManagement
          user={managingPlansUser}
          onClose={() => setManagingPlansUser(null)}
        />
      )}

      {/* Kullanıcı Silme Onay Modalı */}
      {deletingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="ri-error-warning-line"></i>
                Kullanıcıyı Sil
              </h2>
            </div>

            <div className="p-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
                <p className="text-red-800 font-medium">
                  <strong>{deletingUser.fullName}</strong> kullanıcısını silmek istediğinizden emin misiniz?
                </p>
                <p className="text-red-600 text-sm mt-2">
                  Bu işlem geri alınamaz! Kullanıcıya ait tüm veriler kalıcı olarak silinecektir.
                </p>
              </div>

              {userDataCounts && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-database-2-line text-gray-600"></i>
                    Silinecek Veriler:
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between p-2 bg-white rounded border">
                      <span className="text-gray-600">Diyet Planları:</span>
                      <span className="font-bold text-gray-900">{userDataCounts.dailyDietPlans || 0}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white rounded border">
                      <span className="text-gray-600">Spor Programları:</span>
                      <span className="font-bold text-gray-900">{userDataCounts.dailyExercisePlans || 0}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white rounded border">
                      <span className="text-gray-600">Detoks Planları:</span>
                      <span className="font-bold text-gray-900">{userDataCounts.dailyDetoxPlans || 0}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white rounded border">
                      <span className="text-gray-600">Kilo Kayıtları:</span>
                      <span className="font-bold text-gray-900">{userDataCounts.weightRecords || 0}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white rounded border">
                      <span className="text-gray-600">Ölçümler:</span>
                      <span className="font-bold text-gray-900">{userDataCounts.measurements || 0}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white rounded border">
                      <span className="text-gray-600">Klasörler:</span>
                      <span className="font-bold text-gray-900">{userDataCounts.userFolders || 0}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDeleteUser}
                  disabled={deleteLoading}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                >
                  İptal
                </button>
                <button
                  onClick={confirmDeleteUser}
                  disabled={deleteLoading}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  {deleteLoading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Siliniyor...
                    </>
                  ) : (
                    <>
                      <i className="ri-delete-bin-line"></i>
                      Evet, Sil
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
