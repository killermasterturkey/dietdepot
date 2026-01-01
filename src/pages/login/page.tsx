import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/database';
import ButterflyLogo from '../../components/ButterflyLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await db.login(email, password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        setError('E-posta veya şifre hatalı!');
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4 relative overflow-hidden border-4 border-white">
            <ButterflyLogo size={56} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dyt Ayşenur Korkmaz</h1>
          <p className="text-green-600 font-medium">Diyetisyen Yönetim Paneli</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Giriş Yap</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium flex items-center gap-2">
                <i className="ri-error-warning-line text-lg"></i>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <i className="ri-mail-line mr-2 text-green-600"></i>
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <i className="ri-lock-line mr-2 text-green-600"></i>
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Giriş Yapılıyor...
                </>
              ) : (
                <>
                  <i className="ri-login-box-line mr-2"></i>
                  Giriş Yap
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t-2 border-gray-100">
            <p className="text-sm font-bold text-gray-700 mb-3 text-center">Demo Hesaplar:</p>
            <div className="space-y-2 text-sm">
              <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
                <p className="font-bold text-green-900 mb-1">
                  <i className="ri-shield-user-line mr-2"></i>
                  Admin
                </p>
                <p className="text-green-700">
                  <span className="font-medium">E-posta:</span> admin@admin.com
                </p>
                <p className="text-green-700">
                  <span className="font-medium">Şifre:</span> admin123
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                <p className="font-bold text-gray-900 mb-1">
                  <i className="ri-user-line mr-2"></i>
                  Kullanıcı
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">E-posta:</span> demo@demo.com
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Şifre:</span> demo123
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © 2024 Dyt Ayşenur Korkmaz. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
