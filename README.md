# DietDepot

Diyetisyenler için kapsamlı beslenme ve diyet yönetim uygulaması.

## Özellikler

- **Kullanıcı Yönetimi**: Danışan ekleme, düzenleme ve silme
- **Diyet Planları**: Günlük, haftalık ve aylık diyet programları
- **Spor Programları**: Kişiye özel egzersiz planları
- **Detoks Programları**: Detoks takibi ve yönetimi
- **Besin Veritabanı**: 34+ besin değeri
- **Egzersiz Veritabanı**: 20+ egzersiz
- **Tarif Veritabanı**: Sağlıklı tarifler
- **Cihazlar Arası Senkronizasyon**: Backend API ile veri paylaşımı

## Teknolojiler

### Frontend
- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js + Express
- JSON dosya tabanlı veritabanı
- CORS destekli REST API

## Kurulum

```bash
# Tüm bağımlılıkları yükle (frontend + backend)
npm install

# Hem frontend hem backend'i başlat
npm start
# veya
npm run dev:all

# Sadece frontend
npm run dev

# Sadece backend
npm run dev:server
```

## Ortam Değişkenleri

`.env` dosyası oluşturun:

```env
VITE_API_URL=http://localhost:3001/api
```

## API Endpoints

Backend `http://localhost:3001` portunda çalışır.

| Endpoint | Metod | Açıklama |
|----------|-------|----------|
| `/api/auth/login` | POST | Kullanıcı girişi |
| `/api/auth/register` | POST | Yeni kullanıcı kaydı |
| `/api/users` | GET/POST | Kullanıcı listesi/ekleme |
| `/api/users/:id` | GET/PUT/DELETE | Kullanıcı işlemleri |
| `/api/food-items` | GET/POST | Besin listesi/ekleme |
| `/api/exercise-items` | GET/POST | Egzersiz listesi/ekleme |
| `/api/detox-items` | GET/POST | Detoks listesi/ekleme |
| `/api/recipes` | GET/POST | Tarif listesi/ekleme |
| `/api/daily-diet-plans/:userId` | GET/POST | Günlük diyet planları |
| `/api/daily-exercise-plans/:userId` | GET/POST | Günlük egzersiz planları |
| `/api/daily-detox-plans/:userId` | GET/POST | Günlük detoks planları |
| `/api/health` | GET | API sağlık kontrolü |

## Kullanım

- **Admin Girişi**: `admin` / `admin123`
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:3001/api`

## Proje Yapısı

```
dietdepot/
├── src/                    # Frontend kaynak kodları
│   ├── pages/              # Sayfa bileşenleri
│   ├── utils/              # Yardımcı fonksiyonlar
│   └── ...
├── server/                 # Backend kaynak kodları
│   ├── index.js            # Express sunucu
│   ├── db/                 # Veritabanı modülü
│   │   ├── database.js     # CRUD işlemleri
│   │   ├── data/           # JSON veri dosyaları
│   │   └── defaultData/    # Varsayılan veriler
│   └── package.json
├── public/                 # Statik dosyalar
└── package.json
```

## Lisans

MIT
