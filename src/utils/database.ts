// IndexedDB Database Manager
const DB_NAME = 'DietitianDB';
const DB_VERSION = 6; // Updated for legacy plans

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  weight: number;
  height: number;
  targetWeight?: number;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
  createdAt: string;
  isAdmin?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  servingSize: string;
  servingUnit: string;
  createdAt: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  category: string;
  caloriesPerMinute: number;
  difficulty: string;
  equipment?: string;
  muscleGroup?: string;
  description?: string;
  createdAt: string;
}

export interface DetoxItem {
  id: string;
  name: string;
  category: string;
  benefits: string;
  servingSize: string;
  servingUnit: string;
  bestTime?: string;
  description?: string;
  createdAt: string;
}

export interface MealFood {
  foodId: string;
  foodName: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: MealFood[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  notes: string;
}

export interface DailyDietPlan {
  id: string;
  userId: string;
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  waterIntake: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyDietPlan {
  id: string;
  userId: string;
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
  dailyPlans: string[];
  weeklyGoals: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyDietPlan {
  id: string;
  userId: string;
  month: number;
  year: number;
  weeklyPlans: string[];
  monthlyGoals: string;
  achievements: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseEntry {
  exerciseId: string;
  exerciseName: string;
  duration: number;
  sets?: number;
  reps?: number;
  calories: number;
  notes: string;
}

export interface DailyExercisePlan {
  id: string;
  userId: string;
  date: string;
  exercises: ExerciseEntry[];
  totalDuration: number;
  totalCalories: number;
  completed: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyExercisePlan {
  id: string;
  userId: string;
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
  dailyPlans: string[];
  weeklyGoals: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyExercisePlan {
  id: string;
  userId: string;
  month: number;
  year: number;
  weeklyPlans: string[];
  monthlyGoals: string;
  achievements: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface DetoxEntry {
  detoxId: string;
  detoxName: string;
  time: string;
  amount: number;
  unit: string;
  benefits: string;
  notes: string;
}

export interface DailyDetoxPlan {
  id: string;
  userId: string;
  date: string;
  items: DetoxEntry[];
  waterIntake: number;
  completed: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyDetoxPlan {
  id: string;
  userId: string;
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
  dailyPlans: string[];
  weeklyGoals: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyDetoxPlan {
  id: string;
  userId: string;
  month: number;
  year: number;
  weeklyPlans: string[];
  monthlyGoals: string;
  achievements: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeightRecord {
  id: string;
  userId: string;
  date: string;
  weight: number;
  notes: string;
  createdAt: string;
}

// Legacy plan types for PDF views
export interface DietPlan {
  id: string;
  userId: string;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snacks?: string;
  calories?: string;
  notes?: string;
  createdAt: string;
}

export interface ExercisePlan {
  id: string;
  userId: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  notes?: string;
  createdAt: string;
}

export interface DetoxPlan {
  id: string;
  userId: string;
  duration?: string;
  morning?: string;
  afternoon?: string;
  evening?: string;
  benefits?: string;
  warnings?: string;
  notes?: string;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  duration: number;
  calories: number;
  description?: string;
}

export interface Measurement {
  id: string;
  userId: string;
  date: string;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  legs?: number;
  notes: string;
  createdAt: string;
}

export interface RecipeIngredient {
  foodId: string;
  foodName: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  ingredients: RecipeIngredient[];
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  imageUrl?: string;
  createdAt: string;
}

// Kullanıcı Klasör Sistemi
export interface UserFolder {
  id: string;
  userId: string;
  folderPath: string;
  folderName: string;
  createdAt: string;
}

export interface UserFile {
  id: string;
  userId: string;
  folderId: string;
  fileName: string;
  fileType: string;
  fileData: string; // Base64 encoded
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

class Database {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Users
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id' });
        }

        // Food Items Database
        if (!db.objectStoreNames.contains('foodItems')) {
          const store = db.createObjectStore('foodItems', { keyPath: 'id' });
          store.createIndex('category', 'category', { unique: false });
          store.createIndex('name', 'name', { unique: false });
        }

        // Recipe Database
        if (!db.objectStoreNames.contains('recipes')) {
          const store = db.createObjectStore('recipes', { keyPath: 'id' });
          store.createIndex('category', 'category', { unique: false });
          store.createIndex('name', 'name', { unique: false });
        }

        // Exercise Items Database
        if (!db.objectStoreNames.contains('exerciseItems')) {
          const store = db.createObjectStore('exerciseItems', { keyPath: 'id' });
          store.createIndex('category', 'category', { unique: false });
          store.createIndex('name', 'name', { unique: false });
        }

        // Detox Items Database
        if (!db.objectStoreNames.contains('detoxItems')) {
          const store = db.createObjectStore('detoxItems', { keyPath: 'id' });
          store.createIndex('category', 'category', { unique: false });
          store.createIndex('name', 'name', { unique: false });
        }

        // Daily Diet Plans
        if (!db.objectStoreNames.contains('dailyDietPlans')) {
          const store = db.createObjectStore('dailyDietPlans', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }

        // Weekly Diet Plans
        if (!db.objectStoreNames.contains('weeklyDietPlans')) {
          const store = db.createObjectStore('weeklyDietPlans', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
        }

        // Monthly Diet Plans
        if (!db.objectStoreNames.contains('monthlyDietPlans')) {
          const store = db.createObjectStore('monthlyDietPlans', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
        }

        // Daily Exercise Plans
        if (!db.objectStoreNames.contains('dailyExercisePlans')) {
          const store = db.createObjectStore('dailyExercisePlans', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }

        // Weekly Exercise Plans
        if (!db.objectStoreNames.contains('weeklyExercisePlans')) {
          const store = db.createObjectStore('weeklyExercisePlans', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
        }

        // Monthly Exercise Plans
        if (!db.objectStoreNames.contains('monthlyExercisePlans')) {
          const store = db.createObjectStore('monthlyExercisePlans', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
        }

        // Daily Detox Plans
        if (!db.objectStoreNames.contains('dailyDetoxPlans')) {
          const store = db.createObjectStore('dailyDetoxPlans', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }

        // Weekly Detox Plans
        if (!db.objectStoreNames.contains('weeklyDetoxPlans')) {
          const store = db.createObjectStore('weeklyDetoxPlans', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
        }

        // Monthly Detox Plans
        if (!db.objectStoreNames.contains('monthlyDetoxPlans')) {
          const store = db.createObjectStore('monthlyDetoxPlans', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
        }

        // Weight Records
        if (!db.objectStoreNames.contains('weightRecords')) {
          const store = db.createObjectStore('weightRecords', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }

        // Measurements
        if (!db.objectStoreNames.contains('measurements')) {
          const store = db.createObjectStore('measurements', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }

        // User Folders - Kullanıcı klasörleri
        if (!db.objectStoreNames.contains('userFolders')) {
          const store = db.createObjectStore('userFolders', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
          store.createIndex('folderPath', 'folderPath', { unique: false });
        }

        // User Files - Kullanıcı dosyaları
        if (!db.objectStoreNames.contains('userFiles')) {
          const store = db.createObjectStore('userFiles', { keyPath: 'id' });
          store.createIndex('userId', 'userId', { unique: false });
          store.createIndex('folderId', 'folderId', { unique: false });
        }

        // Legacy Diet Plans (basit metin tabanlı)
        if (!db.objectStoreNames.contains('dietPlans')) {
          const store = db.createObjectStore('dietPlans', { keyPath: 'userId' });
        }

        // Legacy Exercise Plans (basit metin tabanlı)
        if (!db.objectStoreNames.contains('exercisePlans')) {
          const store = db.createObjectStore('exercisePlans', { keyPath: 'userId' });
        }

        // Legacy Detox Plans (basit metin tabanlı)
        if (!db.objectStoreNames.contains('detoxPlans')) {
          const store = db.createObjectStore('detoxPlans', { keyPath: 'userId' });
        }
      };
    });
  }

  // Generic CRUD operations
  private async add<T>(storeName: string, item: T): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async get<T>(storeName: string, id: string): Promise<T | undefined> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async getAll<T>(storeName: string): Promise<T[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async getByIndex<T>(storeName: string, indexName: string, value: string): Promise<T[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async update<T>(storeName: string, item: T): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async delete(storeName: string, id: string): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // User Operations
  async addUser(user: User): Promise<void> {
    return this.add('users', user);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.get('users', id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.getAll('users');
  }

  async updateUser(user: User): Promise<void> {
    return this.update('users', user);
  }

  // Helper to delete all records from a store by userId
  private async deleteAllByUserId(storeName: string, userId: string): Promise<number> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      let deletedCount = 0;

      try {
        const index = store.index('userId');
        const request = index.openCursor(IDBKeyRange.only(userId));

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            cursor.delete();
            deletedCount++;
            cursor.continue();
          }
        };

        request.onerror = () => reject(request.error);
        transaction.oncomplete = () => resolve(deletedCount);
        transaction.onerror = () => reject(transaction.error);
      } catch {
        // Store might not have userId index
        resolve(0);
      }
    });
  }

  async deleteUser(id: string): Promise<void> {
    if (!this.db) await this.init();

    // İlk olarak kullanıcıya ait tüm verileri tek tek sil
    const userDataStores = [
      'dailyDietPlans',
      'weeklyDietPlans',
      'monthlyDietPlans',
      'dailyExercisePlans',
      'weeklyExercisePlans',
      'monthlyExercisePlans',
      'dailyDetoxPlans',
      'weeklyDetoxPlans',
      'monthlyDetoxPlans',
      'weightRecords',
      'measurements',
      'userFolders',
      'userFiles'
    ];

    // Legacy planları da sil
    try {
      await this.deleteDietPlan(id);
      await this.deleteExercisePlan(id);
      await this.deleteDetoxPlan(id);
      console.log(`[DB] Legacy planlar silindi: ${id}`);
    } catch (error) {
      console.error('[DB] Legacy plan silinirken hata:', error);
    }

    // Her store için sırayla silme işlemi yap
    for (const storeName of userDataStores) {
      try {
        await this.deleteAllByUserId(storeName, id);
        console.log(`[DB] ${storeName} verisi silindi - userId: ${id}`);
      } catch (error) {
        console.error(`[DB] ${storeName} silinirken hata:`, error);
      }
    }

    // En son kullanıcıyı sil
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log(`[DB] Kullanıcı silindi: ${id}`);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  // Kullanıcının tüm verilerini kontrol et (debug için)
  async getUserDataCount(userId: string): Promise<Record<string, number>> {
    if (!this.db) await this.init();

    const stores = [
      'dailyDietPlans',
      'weeklyDietPlans',
      'monthlyDietPlans',
      'dailyExercisePlans',
      'weeklyExercisePlans',
      'monthlyExercisePlans',
      'dailyDetoxPlans',
      'weeklyDetoxPlans',
      'monthlyDetoxPlans',
      'weightRecords',
      'measurements'
    ];

    const counts: Record<string, number> = {};

    for (const storeName of stores) {
      try {
        const data = await this.getByIndex(storeName, 'userId', userId);
        counts[storeName] = data.length;
      } catch {
        counts[storeName] = 0;
      }
    }

    return counts;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await this.getAllUsers();
    return users.find(u => u.username === username);
  }

  async login(email: string, password: string): Promise<User | undefined> {
    const users = await this.getAllUsers();
    return users.find(u => u.email === email && u.password === password);
  }

  // =====================================
  // Kullanıcı Klasör Sistemi İşlemleri
  // =====================================

  // Yeni kullanıcı için klasör yapısı oluştur
  async createUserFolderStructure(userId: string): Promise<void> {
    const now = new Date().toISOString();

    // Varsayılan klasör yapısı
    const defaultFolders = [
      { name: 'Diyet Planları', path: `/users/${userId}/diet-plans` },
      { name: 'Spor Programları', path: `/users/${userId}/exercise-plans` },
      { name: 'Detoks Programları', path: `/users/${userId}/detox-plans` },
      { name: 'Ölçümler', path: `/users/${userId}/measurements` },
      { name: 'Raporlar', path: `/users/${userId}/reports` },
      { name: 'Belgeler', path: `/users/${userId}/documents` }
    ];

    for (const folder of defaultFolders) {
      const userFolder: UserFolder = {
        id: `folder-${userId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        folderPath: folder.path,
        folderName: folder.name,
        createdAt: now
      };
      await this.add('userFolders', userFolder);
    }

    console.log(`[DB] Kullanıcı klasör yapısı oluşturuldu: ${userId}`);
  }

  // Kullanıcının tüm klasörlerini getir
  async getUserFolders(userId: string): Promise<UserFolder[]> {
    return this.getByIndex('userFolders', 'userId', userId);
  }

  // Klasör ekle
  async addUserFolder(folder: UserFolder): Promise<void> {
    return this.add('userFolders', folder);
  }

  // Klasör sil
  async deleteUserFolder(folderId: string): Promise<void> {
    // Önce klasördeki tüm dosyaları sil
    const files = await this.getByIndex<UserFile>('userFiles', 'folderId', folderId);
    for (const file of files) {
      await this.delete('userFiles', file.id);
    }
    // Sonra klasörü sil
    return this.delete('userFolders', folderId);
  }

  // Dosya ekle
  async addUserFile(file: UserFile): Promise<void> {
    return this.add('userFiles', file);
  }

  // Kullanıcının dosyalarını getir
  async getUserFiles(userId: string): Promise<UserFile[]> {
    return this.getByIndex('userFiles', 'userId', userId);
  }

  // Klasördeki dosyaları getir
  async getFilesInFolder(folderId: string): Promise<UserFile[]> {
    return this.getByIndex('userFiles', 'folderId', folderId);
  }

  // Dosya güncelle
  async updateUserFile(file: UserFile): Promise<void> {
    return this.update('userFiles', file);
  }

  // Dosya sil
  async deleteUserFile(fileId: string): Promise<void> {
    return this.delete('userFiles', fileId);
  }

  // =====================================
  // Legacy Plan İşlemleri (EditUserModal için)
  // =====================================

  // Diet Plan
  async getDietPlan(userId: string): Promise<DietPlan | undefined> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['dietPlans'], 'readonly');
      const store = transaction.objectStore('dietPlans');
      const request = store.get(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveDietPlan(plan: DietPlan): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['dietPlans'], 'readwrite');
      const store = transaction.objectStore('dietPlans');
      const request = store.put(plan);
      request.onsuccess = () => {
        console.log(`[DB] Diyet planı kaydedildi: ${plan.userId}`);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteDietPlan(userId: string): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['dietPlans'], 'readwrite');
      const store = transaction.objectStore('dietPlans');
      const request = store.delete(userId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Exercise Plan
  async getExercisePlan(userId: string): Promise<ExercisePlan | undefined> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['exercisePlans'], 'readonly');
      const store = transaction.objectStore('exercisePlans');
      const request = store.get(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveExercisePlan(plan: ExercisePlan): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['exercisePlans'], 'readwrite');
      const store = transaction.objectStore('exercisePlans');
      const request = store.put(plan);
      request.onsuccess = () => {
        console.log(`[DB] Spor programı kaydedildi: ${plan.userId}`);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteExercisePlan(userId: string): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['exercisePlans'], 'readwrite');
      const store = transaction.objectStore('exercisePlans');
      const request = store.delete(userId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Detox Plan
  async getDetoxPlan(userId: string): Promise<DetoxPlan | undefined> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['detoxPlans'], 'readonly');
      const store = transaction.objectStore('detoxPlans');
      const request = store.get(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveDetoxPlan(plan: DetoxPlan): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['detoxPlans'], 'readwrite');
      const store = transaction.objectStore('detoxPlans');
      const request = store.put(plan);
      request.onsuccess = () => {
        console.log(`[DB] Detoks programı kaydedildi: ${plan.userId}`);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteDetoxPlan(userId: string): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['detoxPlans'], 'readwrite');
      const store = transaction.objectStore('detoxPlans');
      const request = store.delete(userId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Food Items Operations
  async addFoodItem(item: FoodItem): Promise<void> {
    return this.add('foodItems', item);
  }

  async getFoodItem(id: string): Promise<FoodItem | undefined> {
    return this.get('foodItems', id);
  }

  async getAllFoodItems(): Promise<FoodItem[]> {
    return this.getAll('foodItems');
  }

  async getFoodItemsByCategory(category: string): Promise<FoodItem[]> {
    return this.getByIndex('foodItems', 'category', category);
  }

  async updateFoodItem(item: FoodItem): Promise<void> {
    return this.update('foodItems', item);
  }

  async deleteFoodItem(id: string): Promise<void> {
    return this.delete('foodItems', id);
  }

  // Exercise Items Operations
  async addExerciseItem(item: ExerciseItem): Promise<void> {
    return this.add('exerciseItems', item);
  }

  async getExerciseItem(id: string): Promise<ExerciseItem | undefined> {
    return this.get('exerciseItems', id);
  }

  async getAllExerciseItems(): Promise<ExerciseItem[]> {
    return this.getAll('exerciseItems');
  }

  async getExerciseItemsByCategory(category: string): Promise<ExerciseItem[]> {
    return this.getByIndex('exerciseItems', 'category', category);
  }

  async updateExerciseItem(item: ExerciseItem): Promise<void> {
    return this.update('exerciseItems', item);
  }

  async deleteExerciseItem(id: string): Promise<void> {
    return this.delete('exerciseItems', id);
  }

  // Detox Items Operations
  async addDetoxItem(item: DetoxItem): Promise<void> {
    return this.add('detoxItems', item);
  }

  async getDetoxItem(id: string): Promise<DetoxItem | undefined> {
    return this.get('detoxItems', id);
  }

  async getAllDetoxItems(): Promise<DetoxItem[]> {
    return this.getAll('detoxItems');
  }

  async getDetoxItemsByCategory(category: string): Promise<DetoxItem[]> {
    return this.getByIndex('detoxItems', 'category', category);
  }

  async updateDetoxItem(item: DetoxItem): Promise<void> {
    return this.update('detoxItems', item);
  }

  async deleteDetoxItem(id: string): Promise<void> {
    return this.delete('detoxItems', id);
  }

  // Daily Diet Plan Operations
  async addDailyDietPlan(plan: DailyDietPlan): Promise<void> {
    return this.add('dailyDietPlans', plan);
  }

  async getDailyDietPlan(id: string): Promise<DailyDietPlan | undefined> {
    return this.get('dailyDietPlans', id);
  }

  async getDailyDietPlansByUser(userId: string): Promise<DailyDietPlan[]> {
    return this.getByIndex('dailyDietPlans', 'userId', userId);
  }

  async updateDailyDietPlan(plan: DailyDietPlan): Promise<void> {
    return this.update('dailyDietPlans', plan);
  }

  async deleteDailyDietPlan(id: string): Promise<void> {
    return this.delete('dailyDietPlans', id);
  }

  // Weekly Diet Plan Operations
  async addWeeklyDietPlan(plan: WeeklyDietPlan): Promise<void> {
    return this.add('weeklyDietPlans', plan);
  }

  async getWeeklyDietPlan(id: string): Promise<WeeklyDietPlan | undefined> {
    return this.get('weeklyDietPlans', id);
  }

  async getWeeklyDietPlansByUser(userId: string): Promise<WeeklyDietPlan[]> {
    return this.getByIndex('weeklyDietPlans', 'userId', userId);
  }

  async updateWeeklyDietPlan(plan: WeeklyDietPlan): Promise<void> {
    return this.update('weeklyDietPlans', plan);
  }

  async deleteWeeklyDietPlan(id: string): Promise<void> {
    return this.delete('weeklyDietPlans', id);
  }

  // Monthly Diet Plan Operations
  async addMonthlyDietPlan(plan: MonthlyDietPlan): Promise<void> {
    return this.add('monthlyDietPlans', plan);
  }

  async getMonthlyDietPlan(id: string): Promise<MonthlyDietPlan | undefined> {
    return this.get('monthlyDietPlans', id);
  }

  async getMonthlyDietPlansByUser(userId: string): Promise<MonthlyDietPlan[]> {
    return this.getByIndex('monthlyDietPlans', 'userId', userId);
  }

  async updateMonthlyDietPlan(plan: MonthlyDietPlan): Promise<void> {
    return this.update('monthlyDietPlans', plan);
  }

  async deleteMonthlyDietPlan(id: string): Promise<void> {
    return this.delete('monthlyDietPlans', id);
  }

  // Daily Exercise Plan Operations
  async addDailyExercisePlan(plan: DailyExercisePlan): Promise<void> {
    return this.add('dailyExercisePlans', plan);
  }

  async getDailyExercisePlan(id: string): Promise<DailyExercisePlan | undefined> {
    return this.get('dailyExercisePlans', id);
  }

  async getDailyExercisePlansByUser(userId: string): Promise<DailyExercisePlan[]> {
    return this.getByIndex('dailyExercisePlans', 'userId', userId);
  }

  async updateDailyExercisePlan(plan: DailyExercisePlan): Promise<void> {
    return this.update('dailyExercisePlans', plan);
  }

  async deleteDailyExercisePlan(id: string): Promise<void> {
    return this.delete('dailyExercisePlans', id);
  }

  // Weekly Exercise Plan Operations
  async addWeeklyExercisePlan(plan: WeeklyExercisePlan): Promise<void> {
    return this.add('weeklyExercisePlans', plan);
  }

  async getWeeklyExercisePlan(id: string): Promise<WeeklyExercisePlan | undefined> {
    return this.get('weeklyExercisePlans', id);
  }

  async getWeeklyExercisePlansByUser(userId: string): Promise<WeeklyExercisePlan[]> {
    return this.getByIndex('weeklyExercisePlans', 'userId', userId);
  }

  async updateWeeklyExercisePlan(plan: WeeklyExercisePlan): Promise<void> {
    return this.update('weeklyExercisePlans', plan);
  }

  async deleteWeeklyExercisePlan(id: string): Promise<void> {
    return this.delete('weeklyExercisePlans', id);
  }

  // Monthly Exercise Plan Operations
  async addMonthlyExercisePlan(plan: MonthlyExercisePlan): Promise<void> {
    return this.add('monthlyExercisePlans', plan);
  }

  async getMonthlyExercisePlan(id: string): Promise<MonthlyExercisePlan | undefined> {
    return this.get('monthlyExercisePlans', id);
  }

  async getMonthlyExercisePlansByUser(userId: string): Promise<MonthlyExercisePlan[]> {
    return this.getByIndex('monthlyExercisePlans', 'userId', userId);
  }

  async updateMonthlyExercisePlan(plan: MonthlyExercisePlan): Promise<void> {
    return this.update('monthlyExercisePlans', plan);
  }

  async deleteMonthlyExercisePlan(id: string): Promise<void> {
    return this.delete('monthlyExercisePlans', id);
  }

  // Daily Detox Plan Operations
  async addDailyDetoxPlan(plan: DailyDetoxPlan): Promise<void> {
    return this.add('dailyDetoxPlans', plan);
  }

  async getDailyDetoxPlan(id: string): Promise<DailyDetoxPlan | undefined> {
    return this.get('dailyDetoxPlans', id);
  }

  async getDailyDetoxPlansByUser(userId: string): Promise<DailyDetoxPlan[]> {
    return this.getByIndex('dailyDetoxPlans', 'userId', userId);
  }

  async updateDailyDetoxPlan(plan: DailyDetoxPlan): Promise<void> {
    return this.update('dailyDetoxPlans', plan);
  }

  async deleteDailyDetoxPlan(id: string): Promise<void> {
    return this.delete('dailyDetoxPlans', id);
  }

  // Weekly Detox Plan Operations
  async addWeeklyDetoxPlan(plan: WeeklyDetoxPlan): Promise<void> {
    return this.add('weeklyDetoxPlans', plan);
  }

  async getWeeklyDetoxPlan(id: string): Promise<WeeklyDetoxPlan | undefined> {
    return this.get('weeklyDetoxPlans', id);
  }

  async getWeeklyDetoxPlansByUser(userId: string): Promise<WeeklyDetoxPlan[]> {
    return this.getByIndex('weeklyDetoxPlans', 'userId', userId);
  }

  async updateWeeklyDetoxPlan(plan: WeeklyDetoxPlan): Promise<void> {
    return this.update('weeklyDetoxPlans', plan);
  }

  async deleteWeeklyDetoxPlan(id: string): Promise<void> {
    return this.delete('weeklyDetoxPlans', id);
  }

  // Monthly Detox Plan Operations
  async addMonthlyDetoxPlan(plan: MonthlyDetoxPlan): Promise<void> {
    return this.add('monthlyDetoxPlans', plan);
  }

  async getMonthlyDetoxPlan(id: string): Promise<MonthlyDetoxPlan | undefined> {
    return this.get('monthlyDetoxPlans', id);
  }

  async getMonthlyDetoxPlansByUser(userId: string): Promise<MonthlyDetoxPlan[]> {
    return this.getByIndex('monthlyDetoxPlans', 'userId', userId);
  }

  async updateMonthlyDetoxPlan(plan: MonthlyDetoxPlan): Promise<void> {
    return this.update('monthlyDetoxPlans', plan);
  }

  async deleteMonthlyDetoxPlan(id: string): Promise<void> {
    return this.delete('monthlyDetoxPlans', id);
  }

  // Weight Record Operations
  async addWeightRecord(record: WeightRecord): Promise<void> {
    return this.add('weightRecords', record);
  }

  async getWeightRecordsByUser(userId: string): Promise<WeightRecord[]> {
    return this.getByIndex('weightRecords', 'userId', userId);
  }

  async deleteWeightRecord(id: string): Promise<void> {
    return this.delete('weightRecords', id);
  }

  // Measurement Operations
  async addMeasurement(measurement: Measurement): Promise<void> {
    return this.add('measurements', measurement);
  }

  async getMeasurementsByUser(userId: string): Promise<Measurement[]> {
    return this.getByIndex('measurements', 'userId', userId);
  }

  async deleteMeasurement(id: string): Promise<void> {
    return this.delete('measurements', id);
  }

  // Recipe Operations
  async addRecipe(recipe: Recipe): Promise<void> {
    return this.add('recipes', recipe);
  }

  async getRecipe(id: string): Promise<Recipe | undefined> {
    return this.get('recipes', id);
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return this.getAll('recipes');
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    return this.getByIndex('recipes', 'category', category);
  }

  async updateRecipe(recipe: Recipe): Promise<void> {
    return this.update('recipes', recipe);
  }

  async deleteRecipe(id: string): Promise<void> {
    return this.delete('recipes', id);
  }

  // Clear all items from a store
  async clearStore(storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Reset all database content (foods, exercises, detox, recipes)
  async resetAllDatabases(): Promise<void> {
    await this.clearStore('foodItems');
    await this.clearStore('exerciseItems');
    await this.clearStore('detoxItems');
    await this.clearStore('recipes');
  }
}

export const db = new Database();

// Initialize default admin user and sample data
export async function initializeDefaultAdmin() {
  await db.init();

  // Admin user
  const adminExists = await db.getUserByUsername('admin');
  const adminUser: User = {
    id: 'admin-001',
    username: 'admin',
    password: 'admin123',
    fullName: 'Dyt Ayşenur Korkmaz',
    email: 'admin@admin.com',
    phone: '+90 555 000 00 00',
    age: 30,
    weight: 60,
    height: 165,
    createdAt: adminExists?.createdAt || new Date().toISOString(),
    isAdmin: true
  };

  if (!adminExists) {
    await db.addUser(adminUser);
    console.log('[DB] Admin kullanıcısı oluşturuldu');
  } else if (adminExists.email !== 'admin@admin.com') {
    // Update existing admin with correct email
    await db.updateUser(adminUser);
  }

  // NOT: Demo kullanıcı artık otomatik oluşturulmuyor.
  // Admin panelden manuel olarak kullanıcı eklenmeli.

  // Initialize comprehensive food items - USDA National Nutrient Database & Türkiye Beslenme Rehberi verileri
  const foodItems = await db.getAllFoodItems();
  if (foodItems.length === 0) {
    const sampleFoods: FoodItem[] = [
      // ==================== TAHILLAR (USDA & FAO verileri) ====================
      { id: 'food-1', name: 'Yulaf Ezmesi (Kuru)', category: 'Tahıllar', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-2', name: 'Yulaf Ezmesi (Pişmiş)', category: 'Tahıllar', calories: 68, protein: 2.4, carbs: 12, fat: 1.4, fiber: 1.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-3', name: 'Tam Buğday Ekmeği', category: 'Tahıllar', calories: 247, protein: 13, carbs: 41, fat: 3.4, fiber: 7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-4', name: 'Beyaz Ekmek', category: 'Tahıllar', calories: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-5', name: 'Kinoa (Pişmiş)', category: 'Tahıllar', calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-6', name: 'Kinoa (Kuru)', category: 'Tahıllar', calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1, fiber: 7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-7', name: 'Esmer Pirinç (Pişmiş)', category: 'Tahıllar', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-8', name: 'Beyaz Pirinç (Pişmiş)', category: 'Tahıllar', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-9', name: 'Bulgur (Pişmiş)', category: 'Tahıllar', calories: 83, protein: 3.1, carbs: 18.6, fat: 0.2, fiber: 4.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-10', name: 'Bulgur (Kuru)', category: 'Tahıllar', calories: 342, protein: 12.3, carbs: 75.9, fat: 1.3, fiber: 18.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-11', name: 'Çavdar Ekmeği', category: 'Tahıllar', calories: 259, protein: 8.5, carbs: 48, fat: 3.3, fiber: 5.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-12', name: 'Makarna (Pişmiş)', category: 'Tahıllar', calories: 131, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-13', name: 'Tam Buğday Makarna (Pişmiş)', category: 'Tahıllar', calories: 124, protein: 5.3, carbs: 26.5, fat: 0.5, fiber: 4.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-14', name: 'Mısır (Haşlanmış)', category: 'Tahıllar', calories: 96, protein: 3.4, carbs: 21, fat: 1.5, fiber: 2.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-15', name: 'Kepek', category: 'Tahıllar', calories: 216, protein: 15.5, carbs: 64.5, fat: 4.3, fiber: 42.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-16', name: 'Arpa (Pişmiş)', category: 'Tahıllar', calories: 123, protein: 2.3, carbs: 28.2, fat: 0.4, fiber: 3.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-17', name: 'Karabuğday (Pişmiş)', category: 'Tahıllar', calories: 92, protein: 3.4, carbs: 19.9, fat: 0.6, fiber: 2.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-18', name: 'Amarant (Pişmiş)', category: 'Tahıllar', calories: 102, protein: 3.8, carbs: 18.7, fat: 1.6, fiber: 2.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-19', name: 'Grissini', category: 'Tahıllar', calories: 412, protein: 12, carbs: 72, fat: 9.5, fiber: 3.2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-20', name: 'Yufka', category: 'Tahıllar', calories: 290, protein: 8.5, carbs: 58, fat: 2.5, fiber: 2.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },

      // ==================== PROTEİN (USDA verileri) ====================
      { id: 'food-21', name: 'Tavuk Göğsü (Derisi Çıkarılmış, Pişmiş)', category: 'Protein', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-22', name: 'Tavuk But (Derisi Çıkarılmış, Pişmiş)', category: 'Protein', calories: 209, protein: 26, carbs: 0, fat: 10.9, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-23', name: 'Hindi Göğsü (Pişmiş)', category: 'Protein', calories: 135, protein: 30, carbs: 0, fat: 1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-24', name: 'Yumurta (Haşlanmış)', category: 'Protein', calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-25', name: 'Yumurta Akı (Çiğ)', category: 'Protein', calories: 52, protein: 10.9, carbs: 0.7, fat: 0.2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-26', name: 'Yumurta Sarısı (Çiğ)', category: 'Protein', calories: 322, protein: 15.9, carbs: 3.6, fat: 26.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-27', name: 'Somon (Vahşi, Pişmiş)', category: 'Protein', calories: 182, protein: 25.4, carbs: 0, fat: 8.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-28', name: 'Somon (Çiftlik, Pişmiş)', category: 'Protein', calories: 208, protein: 20.4, carbs: 0, fat: 13.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-29', name: 'Ton Balığı (Taze, Pişmiş)', category: 'Protein', calories: 132, protein: 29.9, carbs: 0, fat: 1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-30', name: 'Ton Balığı (Konserve, Suda)', category: 'Protein', calories: 116, protein: 25.5, carbs: 0, fat: 0.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-31', name: 'Levrek (Pişmiş)', category: 'Protein', calories: 124, protein: 23.6, carbs: 0, fat: 2.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-32', name: 'Çipura (Pişmiş)', category: 'Protein', calories: 118, protein: 22.8, carbs: 0, fat: 2.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-33', name: 'Uskumru (Pişmiş)', category: 'Protein', calories: 262, protein: 23.9, carbs: 0, fat: 17.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-34', name: 'Sardalya (Konserve, Yağda)', category: 'Protein', calories: 208, protein: 24.6, carbs: 0, fat: 11.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-35', name: 'Hamsi (Taze, Pişmiş)', category: 'Protein', calories: 131, protein: 20.3, carbs: 0, fat: 4.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-36', name: 'Alabalık (Pişmiş)', category: 'Protein', calories: 190, protein: 26.6, carbs: 0, fat: 8.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-37', name: 'Karides (Pişmiş)', category: 'Protein', calories: 99, protein: 20.9, carbs: 0.2, fat: 1.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-38', name: 'Midye (Pişmiş)', category: 'Protein', calories: 172, protein: 23.8, carbs: 7.4, fat: 4.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-39', name: 'Kalamar (Pişmiş)', category: 'Protein', calories: 175, protein: 18, carbs: 7.8, fat: 7.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-40', name: 'Dana Biftek (Yağsız, Izgara)', category: 'Protein', calories: 201, protein: 29.9, carbs: 0, fat: 8.2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-41', name: 'Dana Kıyma (%90 Yağsız)', category: 'Protein', calories: 176, protein: 20, carbs: 0, fat: 10, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-42', name: 'Kuzu Eti (Yağsız, Pişmiş)', category: 'Protein', calories: 258, protein: 25.6, carbs: 0, fat: 16.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-43', name: 'Dana Ciğer (Pişmiş)', category: 'Protein', calories: 175, protein: 26.5, carbs: 5.1, fat: 4.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-44', name: 'Tofu (Sert)', category: 'Protein', calories: 144, protein: 17.3, carbs: 3.9, fat: 8.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-45', name: 'Tempeh', category: 'Protein', calories: 192, protein: 20.3, carbs: 7.6, fat: 10.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-46', name: 'Seitan', category: 'Protein', calories: 370, protein: 75, carbs: 14, fat: 1.9, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },

      // ==================== SÜT ÜRÜNLERİ (USDA verileri) ====================
      { id: 'food-47', name: 'Süzme Yoğurt (Yağsız)', category: 'Süt Ürünleri', calories: 59, protein: 10.3, carbs: 3.6, fat: 0.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-48', name: 'Süzme Yoğurt (Tam Yağlı)', category: 'Süt Ürünleri', calories: 97, protein: 9, carbs: 3.9, fat: 5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-49', name: 'Yoğurt (Tam Yağlı)', category: 'Süt Ürünleri', calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-50', name: 'Yoğurt (Yağsız)', category: 'Süt Ürünleri', calories: 43, protein: 4.1, carbs: 6.2, fat: 0.2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-51', name: 'Yunan Yoğurdu', category: 'Süt Ürünleri', calories: 97, protein: 9, carbs: 3.9, fat: 5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-52', name: 'Beyaz Peynir (Tam Yağlı)', category: 'Süt Ürünleri', calories: 264, protein: 18.3, carbs: 1.5, fat: 21, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-53', name: 'Beyaz Peynir (Light)', category: 'Süt Ürünleri', calories: 174, protein: 19.8, carbs: 2.5, fat: 10, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-54', name: 'Lor Peyniri', category: 'Süt Ürünleri', calories: 98, protein: 11.1, carbs: 3.4, fat: 4.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-55', name: 'Cottage Peynir (Yağsız)', category: 'Süt Ürünleri', calories: 72, protein: 12.4, carbs: 2.7, fat: 1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-56', name: 'Kaşar Peyniri', category: 'Süt Ürünleri', calories: 330, protein: 23, carbs: 0.5, fat: 26, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-57', name: 'Mozzarella', category: 'Süt Ürünleri', calories: 280, protein: 28, carbs: 3.1, fat: 17, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-58', name: 'Parmesan', category: 'Süt Ürünleri', calories: 431, protein: 38, carbs: 4.1, fat: 29, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-59', name: 'Çedar Peyniri', category: 'Süt Ürünleri', calories: 403, protein: 25, carbs: 1.3, fat: 33, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-60', name: 'Feta Peyniri', category: 'Süt Ürünleri', calories: 264, protein: 14.2, carbs: 4.1, fat: 21.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-61', name: 'Süt (Tam Yağlı)', category: 'Süt Ürünleri', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-62', name: 'Süt (Yarım Yağlı)', category: 'Süt Ürünleri', calories: 49, protein: 3.4, carbs: 4.8, fat: 1.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-63', name: 'Süt (Yağsız)', category: 'Süt Ürünleri', calories: 34, protein: 3.4, carbs: 5, fat: 0.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-64', name: 'Kefir', category: 'Süt Ürünleri', calories: 41, protein: 3.3, carbs: 4.5, fat: 1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-65', name: 'Ayran', category: 'Süt Ürünleri', calories: 28, protein: 1.8, carbs: 2.3, fat: 1.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-66', name: 'Labne', category: 'Süt Ürünleri', calories: 125, protein: 5.5, carbs: 4.1, fat: 10, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-67', name: 'Ricotta', category: 'Süt Ürünleri', calories: 174, protein: 11.3, carbs: 3, fat: 13, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-68', name: 'Krema (Hafif)', category: 'Süt Ürünleri', calories: 195, protein: 2.7, carbs: 3.7, fat: 19.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },

      // ==================== MEYVELER (USDA verileri) ====================
      { id: 'food-69', name: 'Elma (Kabuklu)', category: 'Meyveler', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-70', name: 'Muz', category: 'Meyveler', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-71', name: 'Portakal', category: 'Meyveler', calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fiber: 2.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-72', name: 'Mandalina', category: 'Meyveler', calories: 53, protein: 0.8, carbs: 13.3, fat: 0.3, fiber: 1.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-73', name: 'Greyfurt', category: 'Meyveler', calories: 42, protein: 0.8, carbs: 10.7, fat: 0.1, fiber: 1.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-74', name: 'Limon', category: 'Meyveler', calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3, fiber: 2.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-75', name: 'Çilek', category: 'Meyveler', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-76', name: 'Ahududu', category: 'Meyveler', calories: 52, protein: 1.2, carbs: 11.9, fat: 0.7, fiber: 6.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-77', name: 'Böğürtlen', category: 'Meyveler', calories: 43, protein: 1.4, carbs: 9.6, fat: 0.5, fiber: 5.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-78', name: 'Yaban Mersini', category: 'Meyveler', calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-79', name: 'Kivi', category: 'Meyveler', calories: 61, protein: 1.1, carbs: 14.7, fat: 0.5, fiber: 3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-80', name: 'Ananas', category: 'Meyveler', calories: 50, protein: 0.5, carbs: 13.1, fat: 0.1, fiber: 1.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-81', name: 'Mango', category: 'Meyveler', calories: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-82', name: 'Papaya', category: 'Meyveler', calories: 43, protein: 0.5, carbs: 10.8, fat: 0.3, fiber: 1.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-83', name: 'Avokado', category: 'Meyveler', calories: 160, protein: 2, carbs: 8.5, fat: 14.7, fiber: 6.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-84', name: 'Armut', category: 'Meyveler', calories: 57, protein: 0.4, carbs: 15.2, fat: 0.1, fiber: 3.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-85', name: 'Şeftali', category: 'Meyveler', calories: 39, protein: 0.9, carbs: 9.5, fat: 0.3, fiber: 1.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-86', name: 'Nektarin', category: 'Meyveler', calories: 44, protein: 1.1, carbs: 10.6, fat: 0.3, fiber: 1.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-87', name: 'Kayısı', category: 'Meyveler', calories: 48, protein: 1.4, carbs: 11.1, fat: 0.4, fiber: 2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-88', name: 'Kiraz', category: 'Meyveler', calories: 63, protein: 1.1, carbs: 16, fat: 0.2, fiber: 2.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-89', name: 'Vişne', category: 'Meyveler', calories: 50, protein: 1, carbs: 12.2, fat: 0.3, fiber: 1.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-90', name: 'Erik', category: 'Meyveler', calories: 46, protein: 0.7, carbs: 11.4, fat: 0.3, fiber: 1.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-91', name: 'Üzüm (Yeşil)', category: 'Meyveler', calories: 69, protein: 0.7, carbs: 18.1, fat: 0.2, fiber: 0.9, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-92', name: 'Üzüm (Siyah)', category: 'Meyveler', calories: 70, protein: 0.6, carbs: 17.4, fat: 0.4, fiber: 0.9, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-93', name: 'Karpuz', category: 'Meyveler', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-94', name: 'Kavun', category: 'Meyveler', calories: 34, protein: 0.8, carbs: 8.2, fat: 0.2, fiber: 0.9, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-95', name: 'İncir (Taze)', category: 'Meyveler', calories: 74, protein: 0.8, carbs: 19.2, fat: 0.3, fiber: 2.9, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-96', name: 'İncir (Kuru)', category: 'Meyveler', calories: 249, protein: 3.3, carbs: 63.9, fat: 0.9, fiber: 9.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-97', name: 'Hurma (Kuru)', category: 'Meyveler', calories: 282, protein: 2.5, carbs: 75, fat: 0.4, fiber: 8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-98', name: 'Nar', category: 'Meyveler', calories: 83, protein: 1.7, carbs: 18.7, fat: 1.2, fiber: 4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },

      // ==================== SEBZELER (USDA verileri) ====================
      { id: 'food-99', name: 'Brokoli', category: 'Sebzeler', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fiber: 2.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-100', name: 'Karnabahar', category: 'Sebzeler', calories: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-101', name: 'Ispanak (Çiğ)', category: 'Sebzeler', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-102', name: 'Ispanak (Pişmiş)', category: 'Sebzeler', calories: 23, protein: 3, carbs: 3.8, fat: 0.3, fiber: 2.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-103', name: 'Kale (Karalahana)', category: 'Sebzeler', calories: 35, protein: 2.9, carbs: 4.4, fat: 1.5, fiber: 4.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-104', name: 'Pazı', category: 'Sebzeler', calories: 19, protein: 1.8, carbs: 3.7, fat: 0.2, fiber: 1.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-105', name: 'Domates', category: 'Sebzeler', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-106', name: 'Salatalık', category: 'Sebzeler', calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-107', name: 'Havuç', category: 'Sebzeler', calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-108', name: 'Kabak (Zucchini)', category: 'Sebzeler', calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-109', name: 'Patlıcan', category: 'Sebzeler', calories: 25, protein: 1, carbs: 5.9, fat: 0.2, fiber: 3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-110', name: 'Biber (Kırmızı)', category: 'Sebzeler', calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-111', name: 'Biber (Yeşil)', category: 'Sebzeler', calories: 20, protein: 0.9, carbs: 4.6, fat: 0.2, fiber: 1.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-112', name: 'Soğan', category: 'Sebzeler', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-113', name: 'Sarımsak', category: 'Sebzeler', calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fiber: 2.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-114', name: 'Pırasa', category: 'Sebzeler', calories: 61, protein: 1.5, carbs: 14.2, fat: 0.3, fiber: 1.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-115', name: 'Kereviz (Sapı)', category: 'Sebzeler', calories: 16, protein: 0.7, carbs: 3, fat: 0.2, fiber: 1.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-116', name: 'Kereviz (Kökü)', category: 'Sebzeler', calories: 42, protein: 1.5, carbs: 9.2, fat: 0.3, fiber: 1.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-117', name: 'Pancar', category: 'Sebzeler', calories: 43, protein: 1.6, carbs: 9.6, fat: 0.2, fiber: 2.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-118', name: 'Turp (Beyaz)', category: 'Sebzeler', calories: 18, protein: 0.6, carbs: 4.1, fat: 0.1, fiber: 1.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-119', name: 'Marul', category: 'Sebzeler', calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-120', name: 'Roka', category: 'Sebzeler', calories: 25, protein: 2.6, carbs: 3.7, fat: 0.7, fiber: 1.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-121', name: 'Maydanoz', category: 'Sebzeler', calories: 36, protein: 3, carbs: 6.3, fat: 0.8, fiber: 3.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-122', name: 'Dereotu', category: 'Sebzeler', calories: 43, protein: 3.5, carbs: 7, fat: 1.1, fiber: 2.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-123', name: 'Nane (Taze)', category: 'Sebzeler', calories: 70, protein: 3.8, carbs: 14.9, fat: 0.9, fiber: 8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-124', name: 'Fesleğen', category: 'Sebzeler', calories: 23, protein: 3.2, carbs: 2.7, fat: 0.6, fiber: 1.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-125', name: 'Lahana (Beyaz)', category: 'Sebzeler', calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-126', name: 'Lahana (Mor)', category: 'Sebzeler', calories: 31, protein: 1.4, carbs: 7.4, fat: 0.2, fiber: 2.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-127', name: 'Brüksel Lahanası', category: 'Sebzeler', calories: 43, protein: 3.4, carbs: 9, fat: 0.3, fiber: 3.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-128', name: 'Enginar', category: 'Sebzeler', calories: 47, protein: 3.3, carbs: 10.5, fat: 0.2, fiber: 5.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-129', name: 'Kuşkonmaz', category: 'Sebzeler', calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, fiber: 2.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-130', name: 'Yeşil Fasulye', category: 'Sebzeler', calories: 31, protein: 1.8, carbs: 7, fat: 0.1, fiber: 2.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-131', name: 'Bezelye (Taze)', category: 'Sebzeler', calories: 81, protein: 5.4, carbs: 14.5, fat: 0.4, fiber: 5.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-132', name: 'Bamya', category: 'Sebzeler', calories: 33, protein: 1.9, carbs: 7, fat: 0.2, fiber: 3.2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-133', name: 'Mantar (Beyaz)', category: 'Sebzeler', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-134', name: 'Mantar (Portobello)', category: 'Sebzeler', calories: 22, protein: 2.1, carbs: 3.9, fat: 0.4, fiber: 1.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-135', name: 'Patates (Haşlanmış)', category: 'Sebzeler', calories: 87, protein: 1.9, carbs: 20.1, fat: 0.1, fiber: 1.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-136', name: 'Tatlı Patates (Pişmiş)', category: 'Sebzeler', calories: 90, protein: 2, carbs: 21, fat: 0.1, fiber: 3.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-137', name: 'Zencefil (Taze)', category: 'Sebzeler', calories: 80, protein: 1.8, carbs: 18, fat: 0.8, fiber: 2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-138', name: 'Zerdeçal (Taze)', category: 'Sebzeler', calories: 312, protein: 9.7, carbs: 67.1, fat: 3.2, fiber: 22.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },

      // ==================== KURUYEMİŞLER (USDA verileri) ====================
      { id: 'food-139', name: 'Badem (Çiğ)', category: 'Kuruyemişler', calories: 579, protein: 21.2, carbs: 21.7, fat: 49.9, fiber: 12.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-140', name: 'Badem (Kavrulmuş)', category: 'Kuruyemişler', calories: 598, protein: 20.9, carbs: 21, fat: 52.5, fiber: 11.8, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-141', name: 'Ceviz', category: 'Kuruyemişler', calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2, fiber: 6.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-142', name: 'Fındık (Çiğ)', category: 'Kuruyemişler', calories: 628, protein: 15, carbs: 16.7, fat: 60.8, fiber: 9.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-143', name: 'Fındık (Kavrulmuş)', category: 'Kuruyemişler', calories: 646, protein: 13.7, carbs: 17.6, fat: 62.4, fiber: 9.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-144', name: 'Antep Fıstığı', category: 'Kuruyemişler', calories: 562, protein: 20.2, carbs: 27.2, fat: 45.3, fiber: 10.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-145', name: 'Kaju', category: 'Kuruyemişler', calories: 553, protein: 18.2, carbs: 30.2, fat: 43.8, fiber: 3.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-146', name: 'Yer Fıstığı (Çiğ)', category: 'Kuruyemişler', calories: 567, protein: 25.8, carbs: 16.1, fat: 49.2, fiber: 8.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-147', name: 'Pekan Cevizi', category: 'Kuruyemişler', calories: 691, protein: 9.2, carbs: 13.9, fat: 72, fiber: 9.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-148', name: 'Macadamia', category: 'Kuruyemişler', calories: 718, protein: 7.9, carbs: 13.8, fat: 75.8, fiber: 8.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-149', name: 'Brezilya Cevizi', category: 'Kuruyemişler', calories: 659, protein: 14.3, carbs: 11.7, fat: 67.1, fiber: 7.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-150', name: 'Çam Fıstığı', category: 'Kuruyemişler', calories: 673, protein: 13.7, carbs: 13.1, fat: 68.4, fiber: 3.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-151', name: 'Kabak Çekirdeği', category: 'Kuruyemişler', calories: 559, protein: 30.2, carbs: 10.7, fat: 49.1, fiber: 6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-152', name: 'Ayçiçeği Çekirdeği', category: 'Kuruyemişler', calories: 584, protein: 20.8, carbs: 20, fat: 51.5, fiber: 8.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-153', name: 'Kuru Üzüm', category: 'Kuruyemişler', calories: 299, protein: 3.1, carbs: 79.2, fat: 0.5, fiber: 3.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-154', name: 'Kuru Kayısı', category: 'Kuruyemişler', calories: 241, protein: 3.4, carbs: 62.6, fat: 0.5, fiber: 7.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-155', name: 'Kuru Erik', category: 'Kuruyemişler', calories: 240, protein: 2.2, carbs: 63.9, fat: 0.4, fiber: 7.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },

      // ==================== BAKLAGİLLER (USDA verileri) ====================
      { id: 'food-156', name: 'Mercimek (Yeşil, Pişmiş)', category: 'Baklagiller', calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-157', name: 'Mercimek (Kırmızı, Pişmiş)', category: 'Baklagiller', calories: 116, protein: 9, carbs: 20.1, fat: 0.4, fiber: 5.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-158', name: 'Nohut (Pişmiş)', category: 'Baklagiller', calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fiber: 7.6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-159', name: 'Kuru Fasulye (Pişmiş)', category: 'Baklagiller', calories: 127, protein: 8.7, carbs: 22.8, fat: 0.5, fiber: 6.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-160', name: 'Barbunya (Pişmiş)', category: 'Baklagiller', calories: 143, protein: 9.7, carbs: 25.1, fat: 0.5, fiber: 9, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-161', name: 'Siyah Fasulye (Pişmiş)', category: 'Baklagiller', calories: 132, protein: 8.9, carbs: 23.7, fat: 0.5, fiber: 8.7, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-162', name: 'Börülce (Pişmiş)', category: 'Baklagiller', calories: 116, protein: 7.7, carbs: 20.8, fat: 0.5, fiber: 6.5, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-163', name: 'Bakla (Pişmiş)', category: 'Baklagiller', calories: 110, protein: 7.6, carbs: 19.7, fat: 0.4, fiber: 5.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-164', name: 'Soya Fasulyesi (Pişmiş)', category: 'Baklagiller', calories: 173, protein: 16.6, carbs: 9.9, fat: 9, fiber: 6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-165', name: 'Edamame (Pişmiş)', category: 'Baklagiller', calories: 121, protein: 11.9, carbs: 8.9, fat: 5.2, fiber: 5.2, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-166', name: 'Humus', category: 'Baklagiller', calories: 166, protein: 7.9, carbs: 14.3, fat: 9.6, fiber: 6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },

      // ==================== YAĞLAR (USDA verileri) ====================
      { id: 'food-167', name: 'Zeytinyağı (Sızma)', category: 'Yağlar', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-168', name: 'Hindistan Cevizi Yağı', category: 'Yağlar', calories: 862, protein: 0, carbs: 0, fat: 100, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-169', name: 'Tereyağı', category: 'Yağlar', calories: 717, protein: 0.9, carbs: 0.1, fat: 81.1, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-170', name: 'Ayçiçek Yağı', category: 'Yağlar', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-171', name: 'Kanola Yağı', category: 'Yağlar', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-172', name: 'Fındık Yağı', category: 'Yağlar', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-173', name: 'Susam Yağı', category: 'Yağlar', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-174', name: 'Keten Tohumu Yağı', category: 'Yağlar', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-175', name: 'Avokado Yağı', category: 'Yağlar', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-176', name: 'Sadeyağ (Ghee)', category: 'Yağlar', calories: 900, protein: 0, carbs: 0, fat: 100, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-177', name: 'Tahin', category: 'Yağlar', calories: 595, protein: 17, carbs: 21.2, fat: 53.8, fiber: 9.3, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-178', name: 'Badem Ezmesi', category: 'Yağlar', calories: 614, protein: 21, carbs: 18.8, fat: 55.5, fiber: 10.4, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },
      { id: 'food-179', name: 'Fıstık Ezmesi', category: 'Yağlar', calories: 588, protein: 25.1, carbs: 20, fat: 50.4, fiber: 6, servingSize: '100', servingUnit: 'gram', createdAt: new Date().toISOString() },

      // ==================== İÇECEKLER (USDA verileri) ====================
      { id: 'food-180', name: 'Yeşil Çay (Şekersiz)', category: 'İçecekler', calories: 1, protein: 0, carbs: 0, fat: 0, servingSize: '240', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-181', name: 'Siyah Çay (Şekersiz)', category: 'İçecekler', calories: 2, protein: 0, carbs: 0.5, fat: 0, servingSize: '240', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-182', name: 'Kahve (Filtre, Sade)', category: 'İçecekler', calories: 2, protein: 0.3, carbs: 0, fat: 0, servingSize: '240', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-183', name: 'Espresso', category: 'İçecekler', calories: 3, protein: 0.1, carbs: 0.5, fat: 0, servingSize: '30', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-184', name: 'Portakal Suyu (Taze)', category: 'İçecekler', calories: 45, protein: 0.7, carbs: 10.4, fat: 0.2, servingSize: '100', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-185', name: 'Elma Suyu (Taze)', category: 'İçecekler', calories: 46, protein: 0.1, carbs: 11.3, fat: 0.1, servingSize: '100', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-186', name: 'Havuç Suyu', category: 'İçecekler', calories: 40, protein: 0.9, carbs: 9.3, fat: 0.2, servingSize: '100', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-187', name: 'Nar Suyu', category: 'İçecekler', calories: 54, protein: 0.2, carbs: 13.1, fat: 0.3, servingSize: '100', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-188', name: 'Badem Sütü (Şekersiz)', category: 'İçecekler', calories: 13, protein: 0.4, carbs: 0.3, fat: 1.1, servingSize: '100', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-189', name: 'Yulaf Sütü (Şekersiz)', category: 'İçecekler', calories: 43, protein: 0.4, carbs: 6.7, fat: 1.4, servingSize: '100', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-190', name: 'Soya Sütü (Şekersiz)', category: 'İçecekler', calories: 33, protein: 2.9, carbs: 1.2, fat: 1.6, servingSize: '100', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-191', name: 'Hindistan Cevizi Suyu', category: 'İçecekler', calories: 19, protein: 0.7, carbs: 3.7, fat: 0.2, servingSize: '100', servingUnit: 'ml', createdAt: new Date().toISOString() },
      { id: 'food-192', name: 'Kombucha', category: 'İçecekler', calories: 17, protein: 0, carbs: 4, fat: 0, servingSize: '100', servingUnit: 'ml', createdAt: new Date().toISOString() }
    ];

    for (const food of sampleFoods) {
      await db.addFoodItem(food);
    }
  }

  // Initialize comprehensive ACSM/ACE verified exercise items
  const exerciseItems = await db.getAllExerciseItems();
  if (exerciseItems.length === 0) {
    const sampleExercises: ExerciseItem[] = [
      // ==================== KARDİYOVASKÜLER (35 egzersiz) ====================
      // Kalori değerleri ACSM Compendium of Physical Activities'e göre (70kg birey için kcal/dk)

      // Koşu ve Yürüyüş
      { id: 'ex-1', name: 'Koşu (8 km/s)', category: 'Kardiyovasküler', caloriesPerMinute: 8.3, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Orta tempoda koşu, 8 km/saat hızında', createdAt: new Date().toISOString() },
      { id: 'ex-2', name: 'Koşu (10 km/s)', category: 'Kardiyovasküler', caloriesPerMinute: 10.5, difficulty: 'Zor', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Hızlı koşu, 10 km/saat hızında', createdAt: new Date().toISOString() },
      { id: 'ex-3', name: 'Koşu (12 km/s)', category: 'Kardiyovasküler', caloriesPerMinute: 12.5, difficulty: 'Zor', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Yüksek tempolu koşu, 12 km/saat', createdAt: new Date().toISOString() },
      { id: 'ex-4', name: 'Sprint (Interval)', category: 'Kardiyovasküler', caloriesPerMinute: 15, difficulty: 'Çok Zor', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Maksimum hızda kısa mesafe koşuları', createdAt: new Date().toISOString() },
      { id: 'ex-5', name: 'Yürüyüş (Yavaş, 4 km/s)', category: 'Kardiyovasküler', caloriesPerMinute: 3.3, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Bacaklar', description: 'Rahat tempoda yürüyüş', createdAt: new Date().toISOString() },
      { id: 'ex-6', name: 'Yürüyüş (Hızlı, 6 km/s)', category: 'Kardiyovasküler', caloriesPerMinute: 5, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Bacaklar', description: 'Tempolu yürüyüş, fitness amaçlı', createdAt: new Date().toISOString() },
      { id: 'ex-7', name: 'Yokuş Yürüyüşü', category: 'Kardiyovasküler', caloriesPerMinute: 6.5, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Bacaklar, Kalça', description: 'Eğimli arazide yürüyüş', createdAt: new Date().toISOString() },
      { id: 'ex-8', name: 'Nordic Walking', category: 'Kardiyovasküler', caloriesPerMinute: 5.5, difficulty: 'Orta', equipment: 'Baston', muscleGroup: 'Tüm Vücut', description: 'İskandinav yürüyüşü, bastonlu', createdAt: new Date().toISOString() },

      // Bisiklet
      { id: 'ex-9', name: 'Bisiklet (Yavaş, 15 km/s)', category: 'Kardiyovasküler', caloriesPerMinute: 5.8, difficulty: 'Kolay', equipment: 'Bisiklet', muscleGroup: 'Bacaklar', description: 'Düşük yoğunlukta bisiklet', createdAt: new Date().toISOString() },
      { id: 'ex-10', name: 'Bisiklet (Orta, 20 km/s)', category: 'Kardiyovasküler', caloriesPerMinute: 8.3, difficulty: 'Orta', equipment: 'Bisiklet', muscleGroup: 'Bacaklar', description: 'Orta yoğunlukta bisiklet', createdAt: new Date().toISOString() },
      { id: 'ex-11', name: 'Bisiklet (Hızlı, 25 km/s)', category: 'Kardiyovasküler', caloriesPerMinute: 10, difficulty: 'Zor', equipment: 'Bisiklet', muscleGroup: 'Bacaklar', description: 'Yüksek yoğunlukta bisiklet', createdAt: new Date().toISOString() },
      { id: 'ex-12', name: 'Sabit Bisiklet (Hafif)', category: 'Kardiyovasküler', caloriesPerMinute: 5.5, difficulty: 'Kolay', equipment: 'Sabit Bisiklet', muscleGroup: 'Bacaklar', description: 'Düşük direnç ile sabit bisiklet', createdAt: new Date().toISOString() },
      { id: 'ex-13', name: 'Sabit Bisiklet (Orta)', category: 'Kardiyovasküler', caloriesPerMinute: 7.3, difficulty: 'Orta', equipment: 'Sabit Bisiklet', muscleGroup: 'Bacaklar', description: 'Orta direnç ile sabit bisiklet', createdAt: new Date().toISOString() },
      { id: 'ex-14', name: 'Spinning', category: 'Kardiyovasküler', caloriesPerMinute: 10.5, difficulty: 'Zor', equipment: 'Spin Bisikleti', muscleGroup: 'Bacaklar', description: 'Yüksek yoğunluklu grup bisiklet dersi', createdAt: new Date().toISOString() },

      // Yüzme
      { id: 'ex-15', name: 'Yüzme (Serbest, Yavaş)', category: 'Kardiyovasküler', caloriesPerMinute: 5.8, difficulty: 'Kolay', equipment: 'Havuz', muscleGroup: 'Tüm Vücut', description: 'Rahat tempoda serbest stil', createdAt: new Date().toISOString() },
      { id: 'ex-16', name: 'Yüzme (Serbest, Hızlı)', category: 'Kardiyovasküler', caloriesPerMinute: 9.8, difficulty: 'Orta', equipment: 'Havuz', muscleGroup: 'Tüm Vücut', description: 'Hızlı tempoda serbest stil', createdAt: new Date().toISOString() },
      { id: 'ex-17', name: 'Yüzme (Kurbağalama)', category: 'Kardiyovasküler', caloriesPerMinute: 8.3, difficulty: 'Orta', equipment: 'Havuz', muscleGroup: 'Tüm Vücut', description: 'Kurbağalama stili', createdAt: new Date().toISOString() },
      { id: 'ex-18', name: 'Yüzme (Kelebek)', category: 'Kardiyovasküler', caloriesPerMinute: 11.7, difficulty: 'Çok Zor', equipment: 'Havuz', muscleGroup: 'Tüm Vücut', description: 'Kelebek stili yüzme', createdAt: new Date().toISOString() },
      { id: 'ex-19', name: 'Su Aerobiği', category: 'Kardiyovasküler', caloriesPerMinute: 5.5, difficulty: 'Orta', equipment: 'Havuz', muscleGroup: 'Tüm Vücut', description: 'Suda aerobik egzersizler', createdAt: new Date().toISOString() },

      // Diğer Kardiyovasküler
      { id: 'ex-20', name: 'İp Atlama (Yavaş)', category: 'Kardiyovasküler', caloriesPerMinute: 8.3, difficulty: 'Orta', equipment: 'İp', muscleGroup: 'Tüm Vücut', description: 'Düşük tempoda ip atlama', createdAt: new Date().toISOString() },
      { id: 'ex-21', name: 'İp Atlama (Hızlı)', category: 'Kardiyovasküler', caloriesPerMinute: 12.3, difficulty: 'Zor', equipment: 'İp', muscleGroup: 'Tüm Vücut', description: 'Yüksek tempoda ip atlama', createdAt: new Date().toISOString() },
      { id: 'ex-22', name: 'Eliptik Bisiklet', category: 'Kardiyovasküler', caloriesPerMinute: 7.8, difficulty: 'Orta', equipment: 'Eliptik Makine', muscleGroup: 'Tüm Vücut', description: 'Eliptik makinede orta yoğunluk', createdAt: new Date().toISOString() },
      { id: 'ex-23', name: 'Merdiven Çıkma', category: 'Kardiyovasküler', caloriesPerMinute: 8.8, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Bacaklar, Kalça', description: 'Merdiven çıkma egzersizi', createdAt: new Date().toISOString() },
      { id: 'ex-24', name: 'Step Makinesi', category: 'Kardiyovasküler', caloriesPerMinute: 7.5, difficulty: 'Orta', equipment: 'Step Makinesi', muscleGroup: 'Bacaklar, Kalça', description: 'Step makinesi antrenmanı', createdAt: new Date().toISOString() },
      { id: 'ex-25', name: 'Kürek Çekme (Makine)', category: 'Kardiyovasküler', caloriesPerMinute: 8.5, difficulty: 'Orta', equipment: 'Kürek Makinesi', muscleGroup: 'Tüm Vücut', description: 'Kürek çekme makinesi antrenmanı', createdAt: new Date().toISOString() },
      { id: 'ex-26', name: 'Aerobik (Düşük Etki)', category: 'Kardiyovasküler', caloriesPerMinute: 5.5, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Düşük etkili aerobik', createdAt: new Date().toISOString() },
      { id: 'ex-27', name: 'Aerobik (Yüksek Etki)', category: 'Kardiyovasküler', caloriesPerMinute: 7.3, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Yüksek etkili aerobik', createdAt: new Date().toISOString() },
      { id: 'ex-28', name: 'Step Aerobik', category: 'Kardiyovasküler', caloriesPerMinute: 8.5, difficulty: 'Orta', equipment: 'Step', muscleGroup: 'Bacaklar, Kalça', description: 'Step ile aerobik egzersiz', createdAt: new Date().toISOString() },
      { id: 'ex-29', name: 'Zumba', category: 'Kardiyovasküler', caloriesPerMinute: 7.5, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Dans temelli fitness', createdAt: new Date().toISOString() },
      { id: 'ex-30', name: 'Dans (Aktif)', category: 'Kardiyovasküler', caloriesPerMinute: 6.5, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Enerjik dans', createdAt: new Date().toISOString() },
      { id: 'ex-31', name: 'HIIT', category: 'Kardiyovasküler', caloriesPerMinute: 12, difficulty: 'Çok Zor', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Yüksek yoğunluklu interval antrenmanı', createdAt: new Date().toISOString() },
      { id: 'ex-32', name: 'Boks (Kum Torbası)', category: 'Kardiyovasküler', caloriesPerMinute: 9, difficulty: 'Zor', equipment: 'Kum Torbası', muscleGroup: 'Tüm Vücut', description: 'Boks antrenmanı, kum torbasına vuruş', createdAt: new Date().toISOString() },
      { id: 'ex-33', name: 'Kickboks', category: 'Kardiyovasküler', caloriesPerMinute: 10, difficulty: 'Zor', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Kickboks fitness dersi', createdAt: new Date().toISOString() },
      { id: 'ex-34', name: 'Trampolin', category: 'Kardiyovasküler', caloriesPerMinute: 6.5, difficulty: 'Orta', equipment: 'Trampolin', muscleGroup: 'Bacaklar', description: 'Trampolinde zıplama', createdAt: new Date().toISOString() },
      { id: 'ex-35', name: 'Jumping Jacks', category: 'Kardiyovasküler', caloriesPerMinute: 8, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Atlama hareketi, ısınma egzersizi', createdAt: new Date().toISOString() },

      // ==================== KUVVET (50 egzersiz) ====================
      // Kalori değerleri genel kuvvet antrenmanı MET değerlerine göre

      // Göğüs Egzersizleri
      { id: 'ex-36', name: 'Şınav (Klasik)', category: 'Kuvvet', caloriesPerMinute: 7, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Göğüs, Triceps, Omuzlar', description: 'Standart şınav hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-37', name: 'Şınav (Geniş Tutuş)', category: 'Kuvvet', caloriesPerMinute: 7, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Göğüs', description: 'Geniş el açıklığı ile şınav', createdAt: new Date().toISOString() },
      { id: 'ex-38', name: 'Şınav (Dar Tutuş)', category: 'Kuvvet', caloriesPerMinute: 7, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Triceps', description: 'Dar el açıklığı ile şınav', createdAt: new Date().toISOString() },
      { id: 'ex-39', name: 'Şınav (Eğimli)', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Alt Göğüs', description: 'Eller yüksekte, eğimli şınav', createdAt: new Date().toISOString() },
      { id: 'ex-40', name: 'Şınav (Decline)', category: 'Kuvvet', caloriesPerMinute: 8, difficulty: 'Zor', equipment: 'Yok', muscleGroup: 'Üst Göğüs', description: 'Ayaklar yüksekte şınav', createdAt: new Date().toISOString() },
      { id: 'ex-41', name: 'Bench Press (Düz)', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'Halter/Dumbbell', muscleGroup: 'Göğüs, Triceps', description: 'Düz bench press', createdAt: new Date().toISOString() },
      { id: 'ex-42', name: 'Bench Press (İncline)', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'Halter/Dumbbell', muscleGroup: 'Üst Göğüs', description: 'Eğimli bench press', createdAt: new Date().toISOString() },
      { id: 'ex-43', name: 'Dumbbell Flyes', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Dumbbell', muscleGroup: 'Göğüs', description: 'Dumbbell ile göğüs açma', createdAt: new Date().toISOString() },
      { id: 'ex-44', name: 'Cable Crossover', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Kablo Makinesi', muscleGroup: 'Göğüs', description: 'Kablo ile göğüs çaprazlama', createdAt: new Date().toISOString() },
      { id: 'ex-45', name: 'Dips (Göğüs)', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Zor', equipment: 'Paralel Bar', muscleGroup: 'Göğüs, Triceps', description: 'Paralel barda dips', createdAt: new Date().toISOString() },

      // Sırt Egzersizleri
      { id: 'ex-46', name: 'Pull-up (Barfiks)', category: 'Kuvvet', caloriesPerMinute: 8, difficulty: 'Zor', equipment: 'Bar', muscleGroup: 'Sırt, Biceps', description: 'Üsten tutuş barfiks', createdAt: new Date().toISOString() },
      { id: 'ex-47', name: 'Chin-up', category: 'Kuvvet', caloriesPerMinute: 8, difficulty: 'Zor', equipment: 'Bar', muscleGroup: 'Sırt, Biceps', description: 'Alttan tutuş barfiks', createdAt: new Date().toISOString() },
      { id: 'ex-48', name: 'Lat Pulldown', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'Lat Makinesi', muscleGroup: 'Sırt', description: 'Lat çekme hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-49', name: 'Bent Over Row', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'Halter/Dumbbell', muscleGroup: 'Sırt', description: 'Eğilerek kürek çekme', createdAt: new Date().toISOString() },
      { id: 'ex-50', name: 'T-Bar Row', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'T-Bar', muscleGroup: 'Sırt', description: 'T-bar kürek çekme', createdAt: new Date().toISOString() },
      { id: 'ex-51', name: 'Seated Cable Row', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Kablo Makinesi', muscleGroup: 'Sırt', description: 'Oturarak kablo çekme', createdAt: new Date().toISOString() },
      { id: 'ex-52', name: 'Deadlift', category: 'Kuvvet', caloriesPerMinute: 8, difficulty: 'Zor', equipment: 'Halter', muscleGroup: 'Sırt, Bacaklar, Kalça', description: 'Yerden kaldırma', createdAt: new Date().toISOString() },
      { id: 'ex-53', name: 'Romanian Deadlift', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Orta', equipment: 'Halter/Dumbbell', muscleGroup: 'Hamstring, Sırt', description: 'Romanya tipi deadlift', createdAt: new Date().toISOString() },
      { id: 'ex-54', name: 'Superman', category: 'Kuvvet', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Alt Sırt', description: 'Yüzüstü uzanarak sırt çalışması', createdAt: new Date().toISOString() },
      { id: 'ex-55', name: 'Face Pull', category: 'Kuvvet', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Kablo', muscleGroup: 'Arka Omuz, Sırt', description: 'Yüze doğru kablo çekme', createdAt: new Date().toISOString() },

      // Omuz Egzersizleri
      { id: 'ex-56', name: 'Shoulder Press (Dumbbell)', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'Dumbbell', muscleGroup: 'Omuzlar', description: 'Oturarak omuz presi', createdAt: new Date().toISOString() },
      { id: 'ex-57', name: 'Military Press', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Zor', equipment: 'Halter', muscleGroup: 'Omuzlar', description: 'Ayakta halter ile omuz presi', createdAt: new Date().toISOString() },
      { id: 'ex-58', name: 'Lateral Raise', category: 'Kuvvet', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Dumbbell', muscleGroup: 'Yan Omuzlar', description: 'Yana dumbbell kaldırma', createdAt: new Date().toISOString() },
      { id: 'ex-59', name: 'Front Raise', category: 'Kuvvet', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Dumbbell', muscleGroup: 'Ön Omuzlar', description: 'Öne dumbbell kaldırma', createdAt: new Date().toISOString() },
      { id: 'ex-60', name: 'Rear Delt Fly', category: 'Kuvvet', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Dumbbell', muscleGroup: 'Arka Omuzlar', description: 'Arka omuz fly hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-61', name: 'Arnold Press', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'Dumbbell', muscleGroup: 'Omuzlar', description: 'Arnold tipi omuz presi', createdAt: new Date().toISOString() },
      { id: 'ex-62', name: 'Shrugs', category: 'Kuvvet', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Dumbbell/Halter', muscleGroup: 'Trapez', description: 'Omuz silkme hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-63', name: 'Upright Row', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Halter/Dumbbell', muscleGroup: 'Omuzlar, Trapez', description: 'Dik kürek çekme', createdAt: new Date().toISOString() },

      // Kol Egzersizleri (Biceps)
      { id: 'ex-64', name: 'Bicep Curl (Dumbbell)', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Kolay', equipment: 'Dumbbell', muscleGroup: 'Biceps', description: 'Dumbbell ile biceps curl', createdAt: new Date().toISOString() },
      { id: 'ex-65', name: 'Bicep Curl (Halter)', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Kolay', equipment: 'Halter', muscleGroup: 'Biceps', description: 'Halter ile biceps curl', createdAt: new Date().toISOString() },
      { id: 'ex-66', name: 'Hammer Curl', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Kolay', equipment: 'Dumbbell', muscleGroup: 'Biceps, Önkol', description: 'Çekiç tutuşlu curl', createdAt: new Date().toISOString() },
      { id: 'ex-67', name: 'Preacher Curl', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'EZ Bar', muscleGroup: 'Biceps', description: 'Destekli biceps curl', createdAt: new Date().toISOString() },
      { id: 'ex-68', name: 'Concentration Curl', category: 'Kuvvet', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Dumbbell', muscleGroup: 'Biceps', description: 'Konsantrasyon curl', createdAt: new Date().toISOString() },

      // Kol Egzersizleri (Triceps)
      { id: 'ex-69', name: 'Tricep Dips', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Orta', equipment: 'Bench/Paralel Bar', muscleGroup: 'Triceps', description: 'Triceps için dips', createdAt: new Date().toISOString() },
      { id: 'ex-70', name: 'Tricep Pushdown', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Kolay', equipment: 'Kablo', muscleGroup: 'Triceps', description: 'Kablo ile triceps itme', createdAt: new Date().toISOString() },
      { id: 'ex-71', name: 'Skull Crusher', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'EZ Bar/Dumbbell', muscleGroup: 'Triceps', description: 'Yatarak triceps çalışması', createdAt: new Date().toISOString() },
      { id: 'ex-72', name: 'Overhead Tricep Extension', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Dumbbell', muscleGroup: 'Triceps', description: 'Baş üstü triceps ekstansiyonu', createdAt: new Date().toISOString() },
      { id: 'ex-73', name: 'Close Grip Bench Press', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'Halter', muscleGroup: 'Triceps, Göğüs', description: 'Dar tutuş bench press', createdAt: new Date().toISOString() },

      // Bacak Egzersizleri
      { id: 'ex-74', name: 'Squat (Vücut Ağırlığı)', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Quadriceps, Kalça', description: 'Ağırlıksız squat', createdAt: new Date().toISOString() },
      { id: 'ex-75', name: 'Squat (Halter)', category: 'Kuvvet', caloriesPerMinute: 8, difficulty: 'Zor', equipment: 'Halter', muscleGroup: 'Quadriceps, Kalça', description: 'Halter ile squat', createdAt: new Date().toISOString() },
      { id: 'ex-76', name: 'Front Squat', category: 'Kuvvet', caloriesPerMinute: 8, difficulty: 'Zor', equipment: 'Halter', muscleGroup: 'Quadriceps', description: 'Önden halter ile squat', createdAt: new Date().toISOString() },
      { id: 'ex-77', name: 'Goblet Squat', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Orta', equipment: 'Kettlebell/Dumbbell', muscleGroup: 'Quadriceps, Kalça', description: 'Kettlebell ile squat', createdAt: new Date().toISOString() },
      { id: 'ex-78', name: 'Sumo Squat', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Orta', equipment: 'Yok/Ağırlık', muscleGroup: 'İç Bacak, Kalça', description: 'Geniş duruşlu squat', createdAt: new Date().toISOString() },
      { id: 'ex-79', name: 'Lunges', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Orta', equipment: 'Yok/Dumbbell', muscleGroup: 'Quadriceps, Kalça', description: 'Öne adım hamlesi', createdAt: new Date().toISOString() },
      { id: 'ex-80', name: 'Walking Lunges', category: 'Kuvvet', caloriesPerMinute: 7, difficulty: 'Orta', equipment: 'Yok/Dumbbell', muscleGroup: 'Quadriceps, Kalça', description: 'Yürüyerek hamle', createdAt: new Date().toISOString() },
      { id: 'ex-81', name: 'Bulgarian Split Squat', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Zor', equipment: 'Yok/Dumbbell', muscleGroup: 'Quadriceps, Kalça', description: 'Tek bacak split squat', createdAt: new Date().toISOString() },
      { id: 'ex-82', name: 'Leg Press', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Orta', equipment: 'Leg Press Makinesi', muscleGroup: 'Quadriceps, Kalça', description: 'Bacak press makinesi', createdAt: new Date().toISOString() },
      { id: 'ex-83', name: 'Leg Extension', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Kolay', equipment: 'Makine', muscleGroup: 'Quadriceps', description: 'Bacak ekstansiyonu', createdAt: new Date().toISOString() },
      { id: 'ex-84', name: 'Leg Curl', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Kolay', equipment: 'Makine', muscleGroup: 'Hamstring', description: 'Bacak curl hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-85', name: 'Calf Raise', category: 'Kuvvet', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Yok/Makine', muscleGroup: 'Baldır', description: 'Baldır kaldırma', createdAt: new Date().toISOString() },

      // Karın Egzersizleri
      { id: 'ex-86', name: 'Plank', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Core', description: 'Statik karın egzersizi', createdAt: new Date().toISOString() },
      { id: 'ex-87', name: 'Side Plank', category: 'Kuvvet', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Obliques', description: 'Yan plank', createdAt: new Date().toISOString() },
      { id: 'ex-88', name: 'Crunch', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Karın', description: 'Klasik karın hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-89', name: 'Bicycle Crunch', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Karın, Obliques', description: 'Bisiklet hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-90', name: 'Leg Raise', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Alt Karın', description: 'Bacak kaldırma', createdAt: new Date().toISOString() },
      { id: 'ex-91', name: 'Mountain Climber', category: 'Kuvvet', caloriesPerMinute: 8, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Core, Kalça', description: 'Dağcı hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-92', name: 'Russian Twist', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Orta', equipment: 'Yok/Ağırlık', muscleGroup: 'Obliques', description: 'Oturarak gövde döndürme', createdAt: new Date().toISOString() },
      { id: 'ex-93', name: 'Dead Bug', category: 'Kuvvet', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Core', description: 'Sırt üstü core stabilizasyonu', createdAt: new Date().toISOString() },
      { id: 'ex-94', name: 'Hanging Leg Raise', category: 'Kuvvet', caloriesPerMinute: 6, difficulty: 'Zor', equipment: 'Bar', muscleGroup: 'Alt Karın', description: 'Asılı bacak kaldırma', createdAt: new Date().toISOString() },
      { id: 'ex-95', name: 'Ab Rollout', category: 'Kuvvet', caloriesPerMinute: 5, difficulty: 'Zor', equipment: 'Ab Wheel', muscleGroup: 'Core', description: 'Tekerlek ile karın çalışması', createdAt: new Date().toISOString() },

      // Tüm Vücut / Fonksiyonel
      { id: 'ex-96', name: 'Burpee', category: 'Kuvvet', caloriesPerMinute: 10, difficulty: 'Zor', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Tam vücut patlayıcı hareket', createdAt: new Date().toISOString() },
      { id: 'ex-97', name: 'Kettlebell Swing', category: 'Kuvvet', caloriesPerMinute: 9, difficulty: 'Orta', equipment: 'Kettlebell', muscleGroup: 'Kalça, Sırt', description: 'Kettlebell salınım hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-98', name: 'Clean and Press', category: 'Kuvvet', caloriesPerMinute: 8, difficulty: 'Zor', equipment: 'Halter/Kettlebell', muscleGroup: 'Tüm Vücut', description: 'Çekiş ve pres kombinasyonu', createdAt: new Date().toISOString() },
      { id: 'ex-99', name: 'Thruster', category: 'Kuvvet', caloriesPerMinute: 9, difficulty: 'Zor', equipment: 'Halter/Dumbbell', muscleGroup: 'Bacaklar, Omuzlar', description: 'Squat ve press kombinasyonu', createdAt: new Date().toISOString() },
      { id: 'ex-100', name: 'Wall Ball', category: 'Kuvvet', caloriesPerMinute: 8, difficulty: 'Orta', equipment: 'Medicine Ball', muscleGroup: 'Tüm Vücut', description: 'Squat ve top atma', createdAt: new Date().toISOString() },

      // ==================== ESNEKLİK (30 egzersiz) ====================

      // Yoga
      { id: 'ex-101', name: 'Hatha Yoga', category: 'Esneklik', caloriesPerMinute: 2.5, difficulty: 'Kolay', equipment: 'Mat', muscleGroup: 'Tüm Vücut', description: 'Temel yoga, yavaş akışlı', createdAt: new Date().toISOString() },
      { id: 'ex-102', name: 'Vinyasa Yoga', category: 'Esneklik', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Mat', muscleGroup: 'Tüm Vücut', description: 'Akışlı yoga, nefes ile hareket', createdAt: new Date().toISOString() },
      { id: 'ex-103', name: 'Power Yoga', category: 'Esneklik', caloriesPerMinute: 5, difficulty: 'Zor', equipment: 'Mat', muscleGroup: 'Tüm Vücut', description: 'Güçlü ve dinamik yoga', createdAt: new Date().toISOString() },
      { id: 'ex-104', name: 'Ashtanga Yoga', category: 'Esneklik', caloriesPerMinute: 5, difficulty: 'Zor', equipment: 'Mat', muscleGroup: 'Tüm Vücut', description: 'Geleneksel seri yoga', createdAt: new Date().toISOString() },
      { id: 'ex-105', name: 'Yin Yoga', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Mat', muscleGroup: 'Tüm Vücut', description: 'Pasif, uzun süreli pozlar', createdAt: new Date().toISOString() },
      { id: 'ex-106', name: 'Restorative Yoga', category: 'Esneklik', caloriesPerMinute: 1.5, difficulty: 'Kolay', equipment: 'Mat, Props', muscleGroup: 'Tüm Vücut', description: 'Destekli, rahatlatıcı yoga', createdAt: new Date().toISOString() },
      { id: 'ex-107', name: 'Bikram Yoga (Sıcak)', category: 'Esneklik', caloriesPerMinute: 6, difficulty: 'Zor', equipment: 'Mat', muscleGroup: 'Tüm Vücut', description: 'Sıcak ortamda 26 poz', createdAt: new Date().toISOString() },

      // Pilates
      { id: 'ex-108', name: 'Pilates (Mat)', category: 'Esneklik', caloriesPerMinute: 3.5, difficulty: 'Orta', equipment: 'Mat', muscleGroup: 'Core, Sırt', description: 'Mat üzerinde pilates', createdAt: new Date().toISOString() },
      { id: 'ex-109', name: 'Pilates (Reformer)', category: 'Esneklik', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Reformer', muscleGroup: 'Tüm Vücut', description: 'Reformer makinesi ile pilates', createdAt: new Date().toISOString() },
      { id: 'ex-110', name: 'Clinical Pilates', category: 'Esneklik', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Mat/Ekipman', muscleGroup: 'Core', description: 'Rehabilitasyon amaçlı pilates', createdAt: new Date().toISOString() },

      // Germe Egzersizleri
      { id: 'ex-111', name: 'Statik Germe (Genel)', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Sabit pozisyonda germe', createdAt: new Date().toISOString() },
      { id: 'ex-112', name: 'Dinamik Germe', category: 'Esneklik', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Hareketli ısınma germesi', createdAt: new Date().toISOString() },
      { id: 'ex-113', name: 'Hamstring Germe', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Hamstring', description: 'Arka bacak germe', createdAt: new Date().toISOString() },
      { id: 'ex-114', name: 'Quadriceps Germe', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Quadriceps', description: 'Ön bacak germe', createdAt: new Date().toISOString() },
      { id: 'ex-115', name: 'Hip Flexor Germe', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Kalça Fleksörleri', description: 'Kalça ön kısım germe', createdAt: new Date().toISOString() },
      { id: 'ex-116', name: 'Pigeon Pose', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Orta', equipment: 'Mat', muscleGroup: 'Kalça, Gluteal', description: 'Güvercin pozu', createdAt: new Date().toISOString() },
      { id: 'ex-117', name: 'Cat-Cow Stretch', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Mat', muscleGroup: 'Omurga', description: 'Kedi-inek hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-118', name: 'Child\'s Pose', category: 'Esneklik', caloriesPerMinute: 1.5, difficulty: 'Kolay', equipment: 'Mat', muscleGroup: 'Sırt, Kalça', description: 'Çocuk pozu', createdAt: new Date().toISOString() },
      { id: 'ex-119', name: 'Downward Dog', category: 'Esneklik', caloriesPerMinute: 2.5, difficulty: 'Kolay', equipment: 'Mat', muscleGroup: 'Tüm Vücut', description: 'Aşağı bakan köpek', createdAt: new Date().toISOString() },
      { id: 'ex-120', name: 'Cobra Stretch', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Mat', muscleGroup: 'Karın, Sırt', description: 'Kobra pozu', createdAt: new Date().toISOString() },
      { id: 'ex-121', name: 'Shoulder Stretch', category: 'Esneklik', caloriesPerMinute: 1.5, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Omuzlar', description: 'Omuz germe', createdAt: new Date().toISOString() },
      { id: 'ex-122', name: 'Chest Opener', category: 'Esneklik', caloriesPerMinute: 1.5, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Göğüs', description: 'Göğüs açma hareketi', createdAt: new Date().toISOString() },
      { id: 'ex-123', name: 'Neck Stretch', category: 'Esneklik', caloriesPerMinute: 1, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Boyun', description: 'Boyun germe', createdAt: new Date().toISOString() },
      { id: 'ex-124', name: 'Spinal Twist', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Mat', muscleGroup: 'Omurga', description: 'Oturarak gövde döndürme', createdAt: new Date().toISOString() },
      { id: 'ex-125', name: 'Figure-4 Stretch', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Kalça, Gluteal', description: '4 şeklinde kalça germesi', createdAt: new Date().toISOString() },

      // Diğer Esneklik
      { id: 'ex-126', name: 'Tai Chi', category: 'Esneklik', caloriesPerMinute: 3, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Çin meditasyonu ve hareket', createdAt: new Date().toISOString() },
      { id: 'ex-127', name: 'Foam Rolling', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Kolay', equipment: 'Foam Roller', muscleGroup: 'Tüm Vücut', description: 'Köpük silindir ile miyofasiyal gevşeme', createdAt: new Date().toISOString() },
      { id: 'ex-128', name: 'Barre', category: 'Esneklik', caloriesPerMinute: 4, difficulty: 'Orta', equipment: 'Barre', muscleGroup: 'Bacaklar, Core', description: 'Bale esintili fitness', createdAt: new Date().toISOString() },
      { id: 'ex-129', name: 'Mobility Work', category: 'Esneklik', caloriesPerMinute: 2.5, difficulty: 'Kolay', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Eklem hareketliliği çalışması', createdAt: new Date().toISOString() },
      { id: 'ex-130', name: 'PNF Germe', category: 'Esneklik', caloriesPerMinute: 2, difficulty: 'Orta', equipment: 'Yok', muscleGroup: 'Tüm Vücut', description: 'Proprioseptif nöromüsküler kolaylaştırma', createdAt: new Date().toISOString() }
    ];

    for (const exercise of sampleExercises) {
      await db.addExerciseItem(exercise);
    }
  }

  // Initialize comprehensive scientifically verified detox items
  const detoxItems = await db.getAllDetoxItems();
  if (detoxItems.length === 0) {
    const sampleDetox: DetoxItem[] = [
      // ==================== İÇECEKLER (40 öğe) ====================
      // Bilimsel araştırmalara dayalı detoks içecekleri

      // Çaylar
      { id: 'detox-1', name: 'Yeşil Çay', category: 'İçecekler', benefits: 'EGCG antioksidanı, metabolizma hızlandırıcı, yağ yakımını destekler, kalp sağlığı', servingSize: '1', servingUnit: 'fincan', bestTime: 'Sabah/Öğleden Sonra', description: 'Şekersiz yeşil çay, 2-3 dakika demlenmiş', createdAt: new Date().toISOString() },
      { id: 'detox-2', name: 'Matcha', category: 'İçecekler', benefits: 'Yeşil çaydan 10 kat fazla antioksidan, L-theanine ile odaklanma, enerji', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Japon yeşil çay tozu, köpürtülerek hazırlanır', createdAt: new Date().toISOString() },
      { id: 'detox-3', name: 'Beyaz Çay', category: 'İçecekler', benefits: 'En yüksek antioksidan içeriği, yaşlanma karşıtı, cilt sağlığı', servingSize: '1', servingUnit: 'fincan', bestTime: 'Öğleden Sonra', description: 'Minimum işlenmiş çay yaprakları, 3-4 dakika demleme', createdAt: new Date().toISOString() },
      { id: 'detox-4', name: 'Oolong Çay', category: 'İçecekler', benefits: 'Metabolizma hızlandırıcı, yağ yakımı, kolesterol dengesi', servingSize: '1', servingUnit: 'fincan', bestTime: 'Öğle/Akşam', description: 'Yarı fermente edilmiş çay', createdAt: new Date().toISOString() },
      { id: 'detox-5', name: 'Pu-erh Çay', category: 'İçecekler', benefits: 'Probiyotik özellikleri, sindirim sistemi, kolesterol düşürücü', servingSize: '1', servingUnit: 'fincan', bestTime: 'Yemeklerden Sonra', description: 'Fermente edilmiş Çin çayı', createdAt: new Date().toISOString() },
      { id: 'detox-6', name: 'Zencefil Çayı', category: 'İçecekler', benefits: 'Anti-inflamatuar, mide bulantısı giderici, bağışıklık güçlendirici', servingSize: '1', servingUnit: 'fincan', bestTime: 'Sabah/Akşam', description: 'Taze zencefil kökü ile hazırlanmış çay', createdAt: new Date().toISOString() },
      { id: 'detox-7', name: 'Zerdeçal Çayı', category: 'İçecekler', benefits: 'Curcumin antioksidanı, anti-inflamatuar, karaciğer detoksu', servingSize: '1', servingUnit: 'fincan', bestTime: 'Akşam', description: 'Taze zerdeçal ve karabiber ile hazırlanmış çay', createdAt: new Date().toISOString() },
      { id: 'detox-8', name: 'Tarçın Çayı', category: 'İçecekler', benefits: 'Kan şekeri düzenleyici, antioksidan, anti-mikrobiyel', servingSize: '1', servingUnit: 'fincan', bestTime: 'Akşam', description: 'Tarçın çubuğu ile hazırlanmış çay', createdAt: new Date().toISOString() },
      { id: 'detox-9', name: 'Nane Çayı', category: 'İçecekler', benefits: 'Sindirim destekleyici, mide rahatlığı, ferahlatıcı', servingSize: '1', servingUnit: 'fincan', bestTime: 'Yemeklerden Sonra', description: 'Taze nane yaprakları ile hazırlanmış çay', createdAt: new Date().toISOString() },
      { id: 'detox-10', name: 'Papatya Çayı', category: 'İçecekler', benefits: 'Sakinleştirici, uyku kalitesi, anti-inflamatuar', servingSize: '1', servingUnit: 'fincan', bestTime: 'Yatmadan Önce', description: 'Kurutulmuş papatya çiçekleri ile hazırlanmış çay', createdAt: new Date().toISOString() },
      { id: 'detox-11', name: 'Ihlamur Çayı', category: 'İçecekler', benefits: 'Rahatlatıcı, soğuk algınlığı, stres azaltıcı', servingSize: '1', servingUnit: 'fincan', bestTime: 'Akşam', description: 'Ihlamur çiçekleri ile hazırlanmış çay', createdAt: new Date().toISOString() },
      { id: 'detox-12', name: 'Kuşburnu Çayı', category: 'İçecekler', benefits: 'C vitamini deposu, bağışıklık güçlendirici, cilt sağlığı', servingSize: '1', servingUnit: 'fincan', bestTime: 'Sabah/Akşam', description: 'Kurutulmuş kuşburnu ile hazırlanmış çay', createdAt: new Date().toISOString() },
      { id: 'detox-13', name: 'Hibiskus Çayı', category: 'İçecekler', benefits: 'Tansiyon düşürücü, antioksidan, kolesterol dengesi', servingSize: '1', servingUnit: 'fincan', bestTime: 'Öğleden Sonra', description: 'Hibiskus çiçekleri ile hazırlanmış çay', createdAt: new Date().toISOString() },
      { id: 'detox-14', name: 'Rezene Çayı', category: 'İçecekler', benefits: 'Sindirim düzenleyici, şişkinlik giderici, hormon dengesi', servingSize: '1', servingUnit: 'fincan', bestTime: 'Yemeklerden Sonra', description: 'Rezene tohumları ile hazırlanmış çay', createdAt: new Date().toISOString() },
      { id: 'detox-15', name: 'Rooibos Çayı', category: 'İçecekler', benefits: 'Kafeinsiz antioksidan, kemik sağlığı, cilt sağlığı', servingSize: '1', servingUnit: 'fincan', bestTime: 'Gün Boyu', description: 'Güney Afrika bitkisel çayı', createdAt: new Date().toISOString() },

      // Sular ve Detoks İçecekleri
      { id: 'detox-16', name: 'Limonlu Ilık Su', category: 'İçecekler', benefits: 'Sindirim sistemini uyandırır, C vitamini, alkali yapıcı', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah Aç Karnına', description: 'Ilık suda taze sıkılmış yarım limon', createdAt: new Date().toISOString() },
      { id: 'detox-17', name: 'Salatalık Detoks Suyu', category: 'İçecekler', benefits: 'Hidratasyon, ödem giderici, cilt sağlığı', servingSize: '1', servingUnit: 'litre', bestTime: 'Gün Boyu', description: 'Dilimlenmiş salatalık ile hazırlanmış su', createdAt: new Date().toISOString() },
      { id: 'detox-18', name: 'Nane Limon Detoks Suyu', category: 'İçecekler', benefits: 'Metabolizma hızlandırıcı, ferahlatıcı, sindirim', servingSize: '1', servingUnit: 'litre', bestTime: 'Gün Boyu', description: 'Nane yaprakları ve limon dilimleri ile hazırlanmış su', createdAt: new Date().toISOString() },
      { id: 'detox-19', name: 'Zencefil Limon Suyu', category: 'İçecekler', benefits: 'Bağışıklık güçlendirici, anti-inflamatuar, enerji verici', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah', description: 'Rendelenmiş zencefil ve limon suyu', createdAt: new Date().toISOString() },
      { id: 'detox-20', name: 'Elma Sirkesi Detoks', category: 'İçecekler', benefits: 'Kan şekeri dengesi, sindirim sistemi, probiyotik', servingSize: '1', servingUnit: 'yemek kaşığı', bestTime: 'Yemeklerden Önce', description: 'Suda seyreltilmiş organik elma sirkesi', createdAt: new Date().toISOString() },
      { id: 'detox-21', name: 'Hindistan Cevizi Suyu', category: 'İçecekler', benefits: 'Elektrolit dengesi, hidratasyon, potasyum kaynağı', servingSize: '1', servingUnit: 'bardak', bestTime: 'Egzersiz Sonrası', description: 'Taze hindistan cevizi suyu', createdAt: new Date().toISOString() },
      { id: 'detox-22', name: 'Aloe Vera Suyu', category: 'İçecekler', benefits: 'Bağırsak sağlığı, cilt iyileştirme, anti-inflamatuar', servingSize: '50', servingUnit: 'ml', bestTime: 'Sabah Aç Karnına', description: 'Saf aloe vera jeli ile hazırlanmış içecek', createdAt: new Date().toISOString() },

      // Taze Sıkılmış Meyve-Sebze Suları
      { id: 'detox-23', name: 'Kereviz Suyu', category: 'İçecekler', benefits: 'Ödem giderici, tansiyon düzenleyici, karaciğer temizliği', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah Aç Karnına', description: 'Taze sıkılmış kereviz suyu', createdAt: new Date().toISOString() },
      { id: 'detox-24', name: 'Havuç Suyu', category: 'İçecekler', benefits: 'Beta-karoten, göz sağlığı, cilt parlaklığı', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah', description: 'Taze sıkılmış havuç suyu', createdAt: new Date().toISOString() },
      { id: 'detox-25', name: 'Pancar Suyu', category: 'İçecekler', benefits: 'Kan temizleyici, damar sağlığı, enerji artırıcı', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah', description: 'Taze sıkılmış pancar suyu', createdAt: new Date().toISOString() },
      { id: 'detox-26', name: 'Maydanoz Suyu', category: 'İçecekler', benefits: 'Böbrek temizliği, ödem atıcı, K vitamini', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah', description: 'Taze maydanoz ile hazırlanmış içecek', createdAt: new Date().toISOString() },
      { id: 'detox-27', name: 'Ispanak Suyu', category: 'İçecekler', benefits: 'Demir, folat, antioksidan, kas sağlığı', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah', description: 'Taze ıspanak yaprağı ile hazırlanmış içecek', createdAt: new Date().toISOString() },
      { id: 'detox-28', name: 'Yeşil Detoks Suyu', category: 'İçecekler', benefits: 'Klorofil, alkalileştirici, enerji verici', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah', description: 'Ispanak, kereviz, elma, limon karışımı', createdAt: new Date().toISOString() },
      { id: 'detox-29', name: 'Kırmızı Detoks Suyu', category: 'İçecekler', benefits: 'Antioksidan, kanı temizleyici, cilt sağlığı', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah', description: 'Pancar, havuç, elma, zencefil karışımı', createdAt: new Date().toISOString() },
      { id: 'detox-30', name: 'Turuncu Detoks Suyu', category: 'İçecekler', benefits: 'C vitamini, bağışıklık, enerji', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah', description: 'Portakal, havuç, zerdeçal karışımı', createdAt: new Date().toISOString() },

      // Smoothie'ler
      { id: 'detox-31', name: 'Yeşil Smoothie', category: 'İçecekler', benefits: 'Lif, vitamin, mineral, enerji, tokluk', servingSize: '1', servingUnit: 'bardak', bestTime: 'Kahvaltı', description: 'Ispanak, muz, elma, badem sütü karışımı', createdAt: new Date().toISOString() },
      { id: 'detox-32', name: 'Antioksidan Smoothie', category: 'İçecekler', benefits: 'Yüksek antioksidan, yaşlanma karşıtı, enerji', servingSize: '1', servingUnit: 'bardak', bestTime: 'Kahvaltı', description: 'Yaban mersini, çilek, yoğurt karışımı', createdAt: new Date().toISOString() },
      { id: 'detox-33', name: 'Tropikal Detoks Smoothie', category: 'İçecekler', benefits: 'Sindirim enzimleri, C vitamini, hidrasyon', servingSize: '1', servingUnit: 'bardak', bestTime: 'Ara Öğün', description: 'Ananas, mango, hindistan cevizi suyu karışımı', createdAt: new Date().toISOString() },
      { id: 'detox-34', name: 'Protein Detoks Smoothie', category: 'İçecekler', benefits: 'Protein, lif, tokluk, kas onarımı', servingSize: '1', servingUnit: 'bardak', bestTime: 'Egzersiz Sonrası', description: 'Muz, yulaf, badem ezmesi, süt karışımı', createdAt: new Date().toISOString() },

      // Özel İçecekler
      { id: 'detox-35', name: 'Altın Süt (Golden Milk)', category: 'İçecekler', benefits: 'Anti-inflamatuar, uyku kalitesi, eklem sağlığı', servingSize: '1', servingUnit: 'fincan', bestTime: 'Yatmadan Önce', description: 'Zerdeçal, zencefil, tarçın, karabiber ile sıcak süt', createdAt: new Date().toISOString() },
      { id: 'detox-36', name: 'Kemik Suyu', category: 'İçecekler', benefits: 'Kolajen, bağırsak sağlığı, eklem sağlığı', servingSize: '1', servingUnit: 'bardak', bestTime: 'Sabah/Akşam', description: 'Uzun süre kaynatılmış kemik suyu', createdAt: new Date().toISOString() },
      { id: 'detox-37', name: 'Kombucha', category: 'İçecekler', benefits: 'Probiyotik, sindirim sağlığı, bağışıklık', servingSize: '1', servingUnit: 'bardak', bestTime: 'Öğle', description: 'Fermente edilmiş çay içeceği', createdAt: new Date().toISOString() },
      { id: 'detox-38', name: 'Kefir', category: 'İçecekler', benefits: 'Probiyotik, kalsiyum, protein, sindirim', servingSize: '1', servingUnit: 'bardak', bestTime: 'Kahvaltı', description: 'Fermente edilmiş süt içeceği', createdAt: new Date().toISOString() },
      { id: 'detox-39', name: 'Badem Sütü', category: 'İçecekler', benefits: 'Düşük kalorili, E vitamini, laktozsuz', servingSize: '1', servingUnit: 'bardak', bestTime: 'Gün Boyu', description: 'Ev yapımı badem sütü', createdAt: new Date().toISOString() },
      { id: 'detox-40', name: 'Yulaf Sütü', category: 'İçecekler', benefits: 'Lif, beta-glukan, kolesterol düşürücü', servingSize: '1', servingUnit: 'bardak', bestTime: 'Kahvaltı', description: 'Ev yapımı yulaf sütü', createdAt: new Date().toISOString() },

      // ==================== TOHUMLAR (15 öğe) ====================

      { id: 'detox-41', name: 'Chia Tohumu', category: 'Tohumlar', benefits: 'Omega-3, lif, protein, tokluk hissi, enerji', servingSize: '1', servingUnit: 'yemek kaşığı', bestTime: 'Kahvaltı', description: 'Suda 10-15 dakika bekletilmiş chia tohumu', createdAt: new Date().toISOString() },
      { id: 'detox-42', name: 'Keten Tohumu', category: 'Tohumlar', benefits: 'Omega-3, lignans, sindirim düzenleyici, hormon dengesi', servingSize: '1', servingUnit: 'yemek kaşığı', bestTime: 'Kahvaltı', description: 'Öğütülmüş keten tohumu', createdAt: new Date().toISOString() },
      { id: 'detox-43', name: 'Kenevir Tohumu', category: 'Tohumlar', benefits: 'Tam protein, omega 3-6, magnezyum, beyin sağlığı', servingSize: '2', servingUnit: 'yemek kaşığı', bestTime: 'Kahvaltı/Ara Öğün', description: 'Kabukları çıkarılmış kenevir tohumu', createdAt: new Date().toISOString() },
      { id: 'detox-44', name: 'Kabak Çekirdeği', category: 'Tohumlar', benefits: 'Çinko, magnezyum, prostat sağlığı, uyku kalitesi', servingSize: '30', servingUnit: 'gram', bestTime: 'Ara Öğün', description: 'Çiğ veya hafif kavrulmuş kabak çekirdeği', createdAt: new Date().toISOString() },
      { id: 'detox-45', name: 'Ayçiçeği Çekirdeği', category: 'Tohumlar', benefits: 'E vitamini, selenyum, kalp sağlığı, cilt sağlığı', servingSize: '30', servingUnit: 'gram', bestTime: 'Ara Öğün', description: 'Tuzsuz ayçiçeği çekirdeği', createdAt: new Date().toISOString() },
      { id: 'detox-46', name: 'Susam', category: 'Tohumlar', benefits: 'Kalsiyum, bakır, kemik sağlığı, antioksidan', servingSize: '1', servingUnit: 'yemek kaşığı', bestTime: 'Yemeklerle', description: 'Çiğ veya kavrulmuş susam', createdAt: new Date().toISOString() },
      { id: 'detox-47', name: 'Çörek Otu Tohumu', category: 'Tohumlar', benefits: 'Anti-inflamatuar, bağışıklık güçlendirici, sindirim', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah Aç Karnına', description: 'Çörek otu tohumu veya yağı', createdAt: new Date().toISOString() },
      { id: 'detox-48', name: 'Haşhaş Tohumu', category: 'Tohumlar', benefits: 'Kalsiyum, magnezyum, uyku kalitesi', servingSize: '1', servingUnit: 'yemek kaşığı', bestTime: 'Akşam', description: 'Haşhaş tohumu', createdAt: new Date().toISOString() },
      { id: 'detox-49', name: 'Kinoa', category: 'Tohumlar', benefits: 'Tam protein, lif, demir, enerji verici', servingSize: '50', servingUnit: 'gram', bestTime: 'Öğle/Akşam Yemeği', description: 'Pişirilmiş kinoa', createdAt: new Date().toISOString() },
      { id: 'detox-50', name: 'Amarant', category: 'Tohumlar', benefits: 'Protein, kalsiyum, demir, glütensiz', servingSize: '50', servingUnit: 'gram', bestTime: 'Kahvaltı/Öğle', description: 'Pişirilmiş amarant', createdAt: new Date().toISOString() },
      { id: 'detox-51', name: 'Karabuğday', category: 'Tohumlar', benefits: 'Rutin, magnezyum, kalp sağlığı, glütensiz', servingSize: '50', servingUnit: 'gram', bestTime: 'Kahvaltı/Öğle', description: 'Pişirilmiş karabuğday', createdAt: new Date().toISOString() },
      { id: 'detox-52', name: 'Teff', category: 'Tohumlar', benefits: 'Demir, kalsiyum, lif, enerji', servingSize: '50', servingUnit: 'gram', bestTime: 'Kahvaltı', description: 'Etiyopya tahılı', createdAt: new Date().toISOString() },
      { id: 'detox-53', name: 'Psyllium Kabuğu', category: 'Tohumlar', benefits: 'Yüksek lif, sindirim düzenleyici, kolesterol', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Yatmadan Önce', description: 'Bol su ile alınmalı', createdAt: new Date().toISOString() },
      { id: 'detox-54', name: 'Kişniş Tohumu', category: 'Tohumlar', benefits: 'Sindirim, ağır metal temizliği, antioksidan', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Yemeklerle', description: 'Öğütülmüş kişniş tohumu', createdAt: new Date().toISOString() },
      { id: 'detox-55', name: 'Kimyon', category: 'Tohumlar', benefits: 'Sindirim, demir, bağışıklık güçlendirici', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Yemeklerle', description: 'Öğütülmüş kimyon', createdAt: new Date().toISOString() },

      // ==================== SÜPER BESİNLER (20 öğe) ====================

      { id: 'detox-56', name: 'Spirulina', category: 'Süper Besinler', benefits: 'Protein, B12, demir, ağır metal bağlayıcı, enerji', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Mavi-yeşil alg tozu', createdAt: new Date().toISOString() },
      { id: 'detox-57', name: 'Chlorella', category: 'Süper Besinler', benefits: 'Klorofil, detoks, bağışıklık, hücre yenilenmesi', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Yeşil alg tozu', createdAt: new Date().toISOString() },
      { id: 'detox-58', name: 'Buğday Çimi', category: 'Süper Besinler', benefits: 'Klorofil, enzimler, vitaminler, alkali yapıcı', servingSize: '30', servingUnit: 'ml', bestTime: 'Sabah Aç Karnına', description: 'Taze sıkılmış buğday çimi suyu', createdAt: new Date().toISOString() },
      { id: 'detox-59', name: 'Arpa Çimi', category: 'Süper Besinler', benefits: 'Antioksidan, enzimler, mineral, alkali', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Arpa çimi tozu', createdAt: new Date().toISOString() },
      { id: 'detox-60', name: 'Maca Kökü', category: 'Süper Besinler', benefits: 'Enerji, hormon dengesi, dayanıklılık, libido', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Peru dağ kökü tozu', createdAt: new Date().toISOString() },
      { id: 'detox-61', name: 'Açai Berry', category: 'Süper Besinler', benefits: 'Antioksidan, kalp sağlığı, enerji, cilt', servingSize: '1', servingUnit: 'yemek kaşığı', bestTime: 'Kahvaltı', description: 'Açai tozu veya dondurulmuş meyve', createdAt: new Date().toISOString() },
      { id: 'detox-62', name: 'Goji Berry', category: 'Süper Besinler', benefits: 'A vitamini, antioksidan, göz sağlığı, bağışıklık', servingSize: '2', servingUnit: 'yemek kaşığı', bestTime: 'Ara Öğün', description: 'Kurutulmuş goji meyvesi', createdAt: new Date().toISOString() },
      { id: 'detox-63', name: 'Camu Camu', category: 'Süper Besinler', benefits: 'En yüksek C vitamini, bağışıklık, antioksidan', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Camu camu tozu', createdAt: new Date().toISOString() },
      { id: 'detox-64', name: 'Kakao (Çiğ)', category: 'Süper Besinler', benefits: 'Magnezyum, antioksidan, ruh hali, enerji', servingSize: '1', servingUnit: 'yemek kaşığı', bestTime: 'Sabah/Öğle', description: 'Çiğ kakao tozu', createdAt: new Date().toISOString() },
      { id: 'detox-65', name: 'Lucuma', category: 'Süper Besinler', benefits: 'Doğal tatlandırıcı, düşük glisemik, mineral', servingSize: '1', servingUnit: 'yemek kaşığı', bestTime: 'Kahvaltı', description: 'Lucuma tozu', createdAt: new Date().toISOString() },
      { id: 'detox-66', name: 'Moringa', category: 'Süper Besinler', benefits: '90+ besin maddesi, antioksidan, enerji, bağışıklık', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Moringa yaprağı tozu', createdAt: new Date().toISOString() },
      { id: 'detox-67', name: 'Ashwagandha', category: 'Süper Besinler', benefits: 'Adaptojenik, stres azaltıcı, enerji, uyku', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Akşam', description: 'Ashwagandha kökü tozu', createdAt: new Date().toISOString() },
      { id: 'detox-68', name: 'Reishi Mantarı', category: 'Süper Besinler', benefits: 'Bağışıklık güçlendirici, stres azaltıcı, uyku', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Akşam', description: 'Reishi mantar tozu', createdAt: new Date().toISOString() },
      { id: 'detox-69', name: 'Chaga Mantarı', category: 'Süper Besinler', benefits: 'Antioksidan kralı, bağışıklık, anti-inflamatuar', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Chaga mantar tozu', createdAt: new Date().toISOString() },
      { id: 'detox-70', name: 'Lion\'s Mane Mantarı', category: 'Süper Besinler', benefits: 'Beyin sağlığı, sinir sistemi, odaklanma', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Lion\'s Mane mantar tozu', createdAt: new Date().toISOString() },
      { id: 'detox-71', name: 'Cordyceps Mantarı', category: 'Süper Besinler', benefits: 'Enerji, dayanıklılık, oksijen kullanımı', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah/Egzersiz Önce', description: 'Cordyceps mantar tozu', createdAt: new Date().toISOString() },
      { id: 'detox-72', name: 'Arı Poleni', category: 'Süper Besinler', benefits: 'Protein, B vitaminleri, enerji, bağışıklık', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Taze arı poleni', createdAt: new Date().toISOString() },
      { id: 'detox-73', name: 'Arı Sütü', category: 'Süper Besinler', benefits: 'Besleyici, bağışıklık, cilt sağlığı, enerji', servingSize: '500', servingUnit: 'mg', bestTime: 'Sabah Aç Karnına', description: 'Taze arı sütü', createdAt: new Date().toISOString() },
      { id: 'detox-74', name: 'Propolis', category: 'Süper Besinler', benefits: 'Antibakteriyel, antiviral, bağışıklık', servingSize: '20', servingUnit: 'damla', bestTime: 'Sabah/Akşam', description: 'Propolis damla veya sprey', createdAt: new Date().toISOString() },
      { id: 'detox-75', name: 'Aktif Kömür', category: 'Süper Besinler', benefits: 'Toksin bağlayıcı, gaz giderici, acil detoks', servingSize: '1', servingUnit: 'kapsül', bestTime: 'Gerektiğinde', description: 'Hindistan cevizi kabuğundan aktif kömür', createdAt: new Date().toISOString() },

      // ==================== BAHARATlar (15 öğe) ====================

      { id: 'detox-76', name: 'Zerdeçal', category: 'Baharatlar', benefits: 'Curcumin, anti-inflamatuar, karaciğer detoksu, antioksidan', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Yemeklerle', description: 'Karabiber ile birlikte tüketilmeli', createdAt: new Date().toISOString() },
      { id: 'detox-77', name: 'Zencefil', category: 'Baharatlar', benefits: 'Sindirim, mide bulantısı, anti-inflamatuar, bağışıklık', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Gün Boyu', description: 'Taze veya toz zencefil', createdAt: new Date().toISOString() },
      { id: 'detox-78', name: 'Tarçın (Ceylon)', category: 'Baharatlar', benefits: 'Kan şekeri dengesi, antioksidan, anti-mikrobiyel', servingSize: '1/2', servingUnit: 'çay kaşığı', bestTime: 'Kahvaltı', description: 'Ceylon (gerçek) tarçın tercih edilmeli', createdAt: new Date().toISOString() },
      { id: 'detox-79', name: 'Karabiber', category: 'Baharatlar', benefits: 'Curcumin emilimini artırır, sindirim, metabolizma', servingSize: '1/4', servingUnit: 'çay kaşığı', bestTime: 'Yemeklerle', description: 'Taze öğütülmüş karabiber', createdAt: new Date().toISOString() },
      { id: 'detox-80', name: 'Cayenne Biberi', category: 'Baharatlar', benefits: 'Kapsaisin, metabolizma hızlandırıcı, kan dolaşımı', servingSize: '1/8', servingUnit: 'çay kaşığı', bestTime: 'Sabah', description: 'Acı kırmızı biber', createdAt: new Date().toISOString() },
      { id: 'detox-81', name: 'Sarımsak', category: 'Baharatlar', benefits: 'Allicin, antibakteriyel, kalp sağlığı, bağışıklık', servingSize: '1-2', servingUnit: 'diş', bestTime: 'Sabah Aç Karnına', description: 'Çiğ sarımsak en etkili', createdAt: new Date().toISOString() },
      { id: 'detox-82', name: 'Soğan', category: 'Baharatlar', benefits: 'Quercetin, prebiyotik, antioksidan, bağışıklık', servingSize: '1/2', servingUnit: 'adet', bestTime: 'Yemeklerle', description: 'Çiğ veya pişmiş soğan', createdAt: new Date().toISOString() },
      { id: 'detox-83', name: 'Kekik', category: 'Baharatlar', benefits: 'Timol, antibakteriyel, solunum yolları, bağışıklık', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Yemeklerle', description: 'Taze veya kurutulmuş kekik', createdAt: new Date().toISOString() },
      { id: 'detox-84', name: 'Biberiye', category: 'Baharatlar', benefits: 'Hafıza, antioksidan, sindirim, anti-inflamatuar', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Yemeklerle', description: 'Taze veya kurutulmuş biberiye', createdAt: new Date().toISOString() },
      { id: 'detox-85', name: 'Adaçayı', category: 'Baharatlar', benefits: 'Antibakteriyel, hafıza, hormon dengesi, sindirim', servingSize: '1', servingUnit: 'çay kaşığı', bestTime: 'Çay Olarak', description: 'Taze veya kurutulmuş adaçayı', createdAt: new Date().toISOString() },
      { id: 'detox-86', name: 'Fesleğen', category: 'Baharatlar', benefits: 'Anti-inflamatuar, antioksidan, stres azaltıcı', servingSize: '5-10', servingUnit: 'yaprak', bestTime: 'Yemeklerle', description: 'Taze fesleğen yaprakları', createdAt: new Date().toISOString() },
      { id: 'detox-87', name: 'Kişniş Yaprağı', category: 'Baharatlar', benefits: 'Ağır metal bağlayıcı, sindirim, antioksidan', servingSize: '1', servingUnit: 'tutam', bestTime: 'Yemeklerle', description: 'Taze kişniş yaprakları', createdAt: new Date().toISOString() },
      { id: 'detox-88', name: 'Dereotu', category: 'Baharatlar', benefits: 'Sindirim, anti-bakteriyel, rahatlatıcı', servingSize: '1', servingUnit: 'tutam', bestTime: 'Yemeklerle', description: 'Taze dereotu', createdAt: new Date().toISOString() },
      { id: 'detox-89', name: 'Karanfil', category: 'Baharatlar', benefits: 'Eugenol, antibakteriyel, ağız sağlığı, sindirim', servingSize: '2-3', servingUnit: 'adet', bestTime: 'Yemeklerden Sonra', description: 'Bütün veya öğütülmüş karanfil', createdAt: new Date().toISOString() },
      { id: 'detox-90', name: 'Muskat', category: 'Baharatlar', benefits: 'Sindirim, uyku kalitesi, antioksidan', servingSize: '1/4', servingUnit: 'çay kaşığı', bestTime: 'Akşam', description: 'Taze rendelenmiş muskat', createdAt: new Date().toISOString() }
    ];

    for (const detox of sampleDetox) {
      await db.addDetoxItem(detox);
    }
  }

  // Initialize comprehensive recipe database
  const recipes = await db.getAllRecipes();
  if (recipes.length === 0) {
    const sampleRecipes: Recipe[] = [
      // ==================== KAHVALTILAR (20 tarif) ====================
      {
        id: 'recipe-1',
        name: 'Avokadolu Yumurta Toast',
        category: 'Kahvaltılar',
        ingredients: [
          { foodId: 'food-1', foodName: 'Tam Buğday Ekmeği', amount: 2, unit: 'dilim' },
          { foodId: 'food-2', foodName: 'Avokado', amount: 1, unit: 'adet' },
          { foodId: 'food-3', foodName: 'Yumurta', amount: 2, unit: 'adet' },
          { foodId: 'food-4', foodName: 'Kiraz Domates', amount: 50, unit: 'gram' },
          { foodId: 'food-5', foodName: 'Zeytinyağı', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Ekmeği kızartın. 2. Avokadonun çekirdeğini çıkarıp ezin. 3. Yumurtaları sahanda pişirin. 4. Ekmek üzerine avokado sürün, yumurta ve domates ekleyin.',
        prepTime: 5,
        cookTime: 10,
        servings: 1,
        totalCalories: 450,
        totalProtein: 18,
        totalCarbs: 35,
        totalFat: 28,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-2',
        name: 'Yulaf Ezmeli Smoothie Bowl',
        category: 'Kahvaltılar',
        ingredients: [
          { foodId: 'food-6', foodName: 'Yulaf Ezmesi', amount: 40, unit: 'gram' },
          { foodId: 'food-7', foodName: 'Muz', amount: 1, unit: 'adet' },
          { foodId: 'food-8', foodName: 'Yaban Mersini', amount: 50, unit: 'gram' },
          { foodId: 'food-9', foodName: 'Badem Sütü', amount: 200, unit: 'ml' },
          { foodId: 'food-10', foodName: 'Chia Tohumu', amount: 1, unit: 'yemek kaşığı' },
          { foodId: 'food-11', foodName: 'Bal', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Yulaf, muz ve badem sütünü blenderda karıştırın. 2. Kaseye dökün. 3. Üzerine yaban mersini, chia tohumu ve bal ekleyin.',
        prepTime: 5,
        cookTime: 0,
        servings: 1,
        totalCalories: 380,
        totalProtein: 10,
        totalCarbs: 65,
        totalFat: 10,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-3',
        name: 'Türk Usulü Menemen',
        category: 'Kahvaltılar',
        ingredients: [
          { foodId: 'food-12', foodName: 'Yumurta', amount: 3, unit: 'adet' },
          { foodId: 'food-13', foodName: 'Domates', amount: 2, unit: 'adet' },
          { foodId: 'food-14', foodName: 'Yeşil Biber', amount: 2, unit: 'adet' },
          { foodId: 'food-15', foodName: 'Soğan', amount: 1, unit: 'adet' },
          { foodId: 'food-16', foodName: 'Zeytinyağı', amount: 2, unit: 'yemek kaşığı' },
          { foodId: 'food-17', foodName: 'Tuz', amount: 1, unit: 'tutam' }
        ],
        instructions: '1. Soğanı zeytinyağında kavurun. 2. Biberleri ekleyip soteleyin. 3. Domatesleri ekleyip pişirin. 4. Yumurtaları kırıp karıştırarak pişirin.',
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        totalCalories: 280,
        totalProtein: 15,
        totalCarbs: 12,
        totalFat: 20,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-4',
        name: 'Protein Pancake',
        category: 'Kahvaltılar',
        ingredients: [
          { foodId: 'food-18', foodName: 'Yulaf Unu', amount: 60, unit: 'gram' },
          { foodId: 'food-19', foodName: 'Yumurta Beyazı', amount: 3, unit: 'adet' },
          { foodId: 'food-20', foodName: 'Muz', amount: 1, unit: 'adet' },
          { foodId: 'food-21', foodName: 'Süt', amount: 100, unit: 'ml' },
          { foodId: 'food-22', foodName: 'Tarçın', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Tüm malzemeleri blenderda karıştırın. 2. Yapışmaz tavada her iki tarafı altın rengi olana kadar pişirin.',
        prepTime: 5,
        cookTime: 10,
        servings: 2,
        totalCalories: 320,
        totalProtein: 22,
        totalCarbs: 45,
        totalFat: 6,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-5',
        name: 'Lor Peynirli Kahvaltı Tabağı',
        category: 'Kahvaltılar',
        ingredients: [
          { foodId: 'food-23', foodName: 'Lor Peyniri', amount: 100, unit: 'gram' },
          { foodId: 'food-24', foodName: 'Salatalık', amount: 1, unit: 'adet' },
          { foodId: 'food-25', foodName: 'Domates', amount: 1, unit: 'adet' },
          { foodId: 'food-26', foodName: 'Ceviz', amount: 30, unit: 'gram' },
          { foodId: 'food-27', foodName: 'Bal', amount: 1, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Lor peynirini tabağa alın. 2. Salatalık ve domatesi dilimleyin. 3. Ceviz kırın ve üzerine serpin. 4. Bal gezdirin.',
        prepTime: 5,
        cookTime: 0,
        servings: 1,
        totalCalories: 350,
        totalProtein: 20,
        totalCarbs: 25,
        totalFat: 22,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-6',
        name: 'Ispanaklı Omlet',
        category: 'Kahvaltılar',
        ingredients: [
          { foodId: 'food-28', foodName: 'Yumurta', amount: 3, unit: 'adet' },
          { foodId: 'food-29', foodName: 'Ispanak', amount: 100, unit: 'gram' },
          { foodId: 'food-30', foodName: 'Beyaz Peynir', amount: 30, unit: 'gram' },
          { foodId: 'food-31', foodName: 'Tereyağı', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Ispanakları soteleyin. 2. Yumurtaları çırpıp tavaya dökün. 3. Ispanak ve peynir ekleyip katlayın.',
        prepTime: 5,
        cookTime: 8,
        servings: 1,
        totalCalories: 320,
        totalProtein: 24,
        totalCarbs: 4,
        totalFat: 24,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-7',
        name: 'Sağlıklı Granola',
        category: 'Kahvaltılar',
        ingredients: [
          { foodId: 'food-32', foodName: 'Yulaf', amount: 200, unit: 'gram' },
          { foodId: 'food-33', foodName: 'Badem', amount: 50, unit: 'gram' },
          { foodId: 'food-34', foodName: 'Ceviz', amount: 50, unit: 'gram' },
          { foodId: 'food-35', foodName: 'Kuru Üzüm', amount: 50, unit: 'gram' },
          { foodId: 'food-36', foodName: 'Bal', amount: 3, unit: 'yemek kaşığı' },
          { foodId: 'food-37', foodName: 'Hindistan Cevizi Yağı', amount: 2, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Yulaf, badem ve cevizi bal ve yağ ile karıştırın. 2. 150°C fırında 25 dakika pişirin. 3. Soğuyunca kuru üzüm ekleyin.',
        prepTime: 10,
        cookTime: 25,
        servings: 8,
        totalCalories: 250,
        totalProtein: 7,
        totalCarbs: 32,
        totalFat: 12,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-8',
        name: 'Chia Puding',
        category: 'Kahvaltılar',
        ingredients: [
          { foodId: 'food-38', foodName: 'Chia Tohumu', amount: 3, unit: 'yemek kaşığı' },
          { foodId: 'food-39', foodName: 'Badem Sütü', amount: 200, unit: 'ml' },
          { foodId: 'food-40', foodName: 'Mango', amount: 100, unit: 'gram' },
          { foodId: 'food-41', foodName: 'Hindistan Cevizi Rendesi', amount: 1, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Chia ve badem sütünü karıştırıp buzdolabında gece bekletin. 2. Mango ve hindistan cevizi ile servis edin.',
        prepTime: 5,
        cookTime: 0,
        servings: 1,
        totalCalories: 280,
        totalProtein: 8,
        totalCarbs: 35,
        totalFat: 14,
        createdAt: new Date().toISOString()
      },

      // ==================== ANA YEMEKLER (25 tarif) ====================
      {
        id: 'recipe-9',
        name: 'Izgara Tavuk Göğsü',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-42', foodName: 'Tavuk Göğsü', amount: 200, unit: 'gram' },
          { foodId: 'food-43', foodName: 'Zeytinyağı', amount: 1, unit: 'yemek kaşığı' },
          { foodId: 'food-44', foodName: 'Sarımsak', amount: 2, unit: 'diş' },
          { foodId: 'food-45', foodName: 'Limon', amount: 1, unit: 'adet' },
          { foodId: 'food-46', foodName: 'Kekik', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Tavuğu zeytinyağı, sarımsak, limon suyu ve kekik ile marine edin. 2. 30 dakika bekletin. 3. Izgarada her iki tarafı pişirin.',
        prepTime: 35,
        cookTime: 15,
        servings: 2,
        totalCalories: 280,
        totalProtein: 48,
        totalCarbs: 2,
        totalFat: 9,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-10',
        name: 'Fırında Somon',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-47', foodName: 'Somon Fileto', amount: 200, unit: 'gram' },
          { foodId: 'food-48', foodName: 'Limon', amount: 1, unit: 'adet' },
          { foodId: 'food-49', foodName: 'Dereotu', amount: 1, unit: 'tutam' },
          { foodId: 'food-50', foodName: 'Zeytinyağı', amount: 1, unit: 'yemek kaşığı' },
          { foodId: 'food-51', foodName: 'Sarımsak', amount: 2, unit: 'diş' }
        ],
        instructions: '1. Somonu fırın kabına yerleştirin. 2. Limon suyu, zeytinyağı ve sarımsak ile yağlayın. 3. 180°C fırında 20 dakika pişirin.',
        prepTime: 10,
        cookTime: 20,
        servings: 2,
        totalCalories: 380,
        totalProtein: 40,
        totalCarbs: 2,
        totalFat: 24,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-11',
        name: 'Mercimek Köftesi',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-52', foodName: 'Kırmızı Mercimek', amount: 200, unit: 'gram' },
          { foodId: 'food-53', foodName: 'İnce Bulgur', amount: 150, unit: 'gram' },
          { foodId: 'food-54', foodName: 'Soğan', amount: 2, unit: 'adet' },
          { foodId: 'food-55', foodName: 'Domates Salçası', amount: 2, unit: 'yemek kaşığı' },
          { foodId: 'food-56', foodName: 'Zeytinyağı', amount: 3, unit: 'yemek kaşığı' },
          { foodId: 'food-57', foodName: 'Maydanoz', amount: 1, unit: 'demet' }
        ],
        instructions: '1. Mercimeği haşlayın. 2. Bulguru ekleyip demleyin. 3. Soğanları kavurup ekleyin. 4. Şekil verin ve maydanoz ile servis edin.',
        prepTime: 20,
        cookTime: 30,
        servings: 8,
        totalCalories: 180,
        totalProtein: 8,
        totalCarbs: 28,
        totalFat: 5,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-12',
        name: 'Kinoa Salatası',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-58', foodName: 'Kinoa', amount: 150, unit: 'gram' },
          { foodId: 'food-59', foodName: 'Salatalık', amount: 1, unit: 'adet' },
          { foodId: 'food-60', foodName: 'Kiraz Domates', amount: 100, unit: 'gram' },
          { foodId: 'food-61', foodName: 'Avokado', amount: 1, unit: 'adet' },
          { foodId: 'food-62', foodName: 'Zeytinyağı', amount: 2, unit: 'yemek kaşığı' },
          { foodId: 'food-63', foodName: 'Limon', amount: 1, unit: 'adet' }
        ],
        instructions: '1. Kinoayı pişirip soğutun. 2. Sebzeleri doğrayın. 3. Tümünü karıştırıp zeytinyağı ve limon ile soslandırın.',
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        totalCalories: 380,
        totalProtein: 12,
        totalCarbs: 42,
        totalFat: 20,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-13',
        name: 'Sebzeli Tavuk Sote',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-64', foodName: 'Tavuk Göğsü', amount: 300, unit: 'gram' },
          { foodId: 'food-65', foodName: 'Brokoli', amount: 200, unit: 'gram' },
          { foodId: 'food-66', foodName: 'Havuç', amount: 2, unit: 'adet' },
          { foodId: 'food-67', foodName: 'Kabak', amount: 1, unit: 'adet' },
          { foodId: 'food-68', foodName: 'Soya Sosu', amount: 2, unit: 'yemek kaşığı' },
          { foodId: 'food-69', foodName: 'Sarımsak', amount: 3, unit: 'diş' }
        ],
        instructions: '1. Tavuğu küp şeklinde kesin ve soteleyin. 2. Sebzeleri ekleyip pişirin. 3. Soya sosu ve sarımsak ile tatlandırın.',
        prepTime: 15,
        cookTime: 20,
        servings: 3,
        totalCalories: 290,
        totalProtein: 35,
        totalCarbs: 15,
        totalFat: 10,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-14',
        name: 'Fırında Sebzeli Balık',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-70', foodName: 'Levrek Fileto', amount: 300, unit: 'gram' },
          { foodId: 'food-71', foodName: 'Patates', amount: 2, unit: 'adet' },
          { foodId: 'food-72', foodName: 'Havuç', amount: 1, unit: 'adet' },
          { foodId: 'food-73', foodName: 'Zeytinyağı', amount: 2, unit: 'yemek kaşığı' },
          { foodId: 'food-74', foodName: 'Kekik', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Sebzeleri dilimleyip fırın kabına yerleştirin. 2. Balıkları üstüne koyun. 3. Yağlayıp 180°C fırında 30 dakika pişirin.',
        prepTime: 15,
        cookTime: 30,
        servings: 2,
        totalCalories: 350,
        totalProtein: 35,
        totalCarbs: 25,
        totalFat: 14,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-15',
        name: 'Nohutlu Tavuk',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-75', foodName: 'Tavuk But', amount: 4, unit: 'adet' },
          { foodId: 'food-76', foodName: 'Nohut (Haşlanmış)', amount: 400, unit: 'gram' },
          { foodId: 'food-77', foodName: 'Domates', amount: 2, unit: 'adet' },
          { foodId: 'food-78', foodName: 'Soğan', amount: 1, unit: 'adet' },
          { foodId: 'food-79', foodName: 'Zerdeçal', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Tavukları kızartın. 2. Soğan ve domatesi ekleyin. 3. Nohut ve zerdeçal ile pişirin.',
        prepTime: 15,
        cookTime: 40,
        servings: 4,
        totalCalories: 380,
        totalProtein: 32,
        totalCarbs: 28,
        totalFat: 16,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-16',
        name: 'Zeytinyağlı Fasulye',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-80', foodName: 'Taze Fasulye', amount: 500, unit: 'gram' },
          { foodId: 'food-81', foodName: 'Domates', amount: 2, unit: 'adet' },
          { foodId: 'food-82', foodName: 'Soğan', amount: 1, unit: 'adet' },
          { foodId: 'food-83', foodName: 'Zeytinyağı', amount: 4, unit: 'yemek kaşığı' },
          { foodId: 'food-84', foodName: 'Sarımsak', amount: 2, unit: 'diş' }
        ],
        instructions: '1. Fasulyeleri temizleyip kesin. 2. Soğanı kavurun, domates ekleyin. 3. Fasulye ve su ekleyip pişirin.',
        prepTime: 20,
        cookTime: 40,
        servings: 4,
        totalCalories: 180,
        totalProtein: 4,
        totalCarbs: 18,
        totalFat: 12,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-17',
        name: 'Köri Soslu Tavuk',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-85', foodName: 'Tavuk Göğsü', amount: 400, unit: 'gram' },
          { foodId: 'food-86', foodName: 'Hindistan Cevizi Sütü', amount: 200, unit: 'ml' },
          { foodId: 'food-87', foodName: 'Köri Tozu', amount: 2, unit: 'yemek kaşığı' },
          { foodId: 'food-88', foodName: 'Soğan', amount: 1, unit: 'adet' },
          { foodId: 'food-89', foodName: 'Sarımsak', amount: 3, unit: 'diş' }
        ],
        instructions: '1. Tavuğu küp kesin ve kavurun. 2. Soğan ve sarımsak ekleyin. 3. Köri ve hindistan cevizi sütü ile pişirin.',
        prepTime: 10,
        cookTime: 25,
        servings: 4,
        totalCalories: 280,
        totalProtein: 30,
        totalCarbs: 8,
        totalFat: 14,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-18',
        name: 'Bulgur Pilavı',
        category: 'Ana Yemekler',
        ingredients: [
          { foodId: 'food-90', foodName: 'Bulgur', amount: 200, unit: 'gram' },
          { foodId: 'food-91', foodName: 'Domates Salçası', amount: 1, unit: 'yemek kaşığı' },
          { foodId: 'food-92', foodName: 'Tereyağı', amount: 2, unit: 'yemek kaşığı' },
          { foodId: 'food-93', foodName: 'Şehriye', amount: 50, unit: 'gram' },
          { foodId: 'food-94', foodName: 'Su', amount: 400, unit: 'ml' }
        ],
        instructions: '1. Şehriyeyi tereyağında kavurun. 2. Salça ve bulguru ekleyin. 3. Su ekleyip kısık ateşte pişirin.',
        prepTime: 5,
        cookTime: 20,
        servings: 4,
        totalCalories: 220,
        totalProtein: 6,
        totalCarbs: 38,
        totalFat: 6,
        createdAt: new Date().toISOString()
      },

      // ==================== SALATALAR (15 tarif) ====================
      {
        id: 'recipe-19',
        name: 'Akdeniz Salatası',
        category: 'Salatalar',
        ingredients: [
          { foodId: 'food-95', foodName: 'Marul', amount: 100, unit: 'gram' },
          { foodId: 'food-96', foodName: 'Domates', amount: 2, unit: 'adet' },
          { foodId: 'food-97', foodName: 'Salatalık', amount: 1, unit: 'adet' },
          { foodId: 'food-98', foodName: 'Zeytin', amount: 50, unit: 'gram' },
          { foodId: 'food-99', foodName: 'Beyaz Peynir', amount: 50, unit: 'gram' },
          { foodId: 'food-100', foodName: 'Zeytinyağı', amount: 2, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Tüm sebzeleri doğrayın. 2. Zeytin ve peynir ekleyin. 3. Zeytinyağı ile soslandırın.',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        totalCalories: 250,
        totalProtein: 8,
        totalCarbs: 12,
        totalFat: 20,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-20',
        name: 'Sezar Salata',
        category: 'Salatalar',
        ingredients: [
          { foodId: 'food-101', foodName: 'Marul', amount: 150, unit: 'gram' },
          { foodId: 'food-102', foodName: 'Tavuk Göğsü', amount: 150, unit: 'gram' },
          { foodId: 'food-103', foodName: 'Parmesan', amount: 30, unit: 'gram' },
          { foodId: 'food-104', foodName: 'Kruton', amount: 30, unit: 'gram' },
          { foodId: 'food-105', foodName: 'Sezar Sos', amount: 2, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Tavuğu ızgara yapın ve dilimleyin. 2. Marulları parçalayın. 3. Tüm malzemeleri sosla karıştırın.',
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        totalCalories: 380,
        totalProtein: 32,
        totalCarbs: 15,
        totalFat: 22,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-21',
        name: 'Ton Balıklı Salata',
        category: 'Salatalar',
        ingredients: [
          { foodId: 'food-106', foodName: 'Ton Balığı Konserve', amount: 150, unit: 'gram' },
          { foodId: 'food-107', foodName: 'Mısır', amount: 100, unit: 'gram' },
          { foodId: 'food-108', foodName: 'Marul', amount: 100, unit: 'gram' },
          { foodId: 'food-109', foodName: 'Haşlanmış Yumurta', amount: 2, unit: 'adet' },
          { foodId: 'food-110', foodName: 'Zeytinyağı', amount: 1, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Ton balığını süzün. 2. Sebzeleri doğrayın. 3. Yumurtaları dilimleyin. 4. Tümünü sosla karıştırın.',
        prepTime: 10,
        cookTime: 10,
        servings: 2,
        totalCalories: 320,
        totalProtein: 30,
        totalCarbs: 18,
        totalFat: 16,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-22',
        name: 'Yeşil Detoks Salata',
        category: 'Salatalar',
        ingredients: [
          { foodId: 'food-111', foodName: 'Ispanak', amount: 100, unit: 'gram' },
          { foodId: 'food-112', foodName: 'Roka', amount: 50, unit: 'gram' },
          { foodId: 'food-113', foodName: 'Avokado', amount: 1, unit: 'adet' },
          { foodId: 'food-114', foodName: 'Salatalık', amount: 1, unit: 'adet' },
          { foodId: 'food-115', foodName: 'Limon', amount: 1, unit: 'adet' }
        ],
        instructions: '1. Yeşillikleri yıkayın. 2. Avokado ve salatalığı dilimleyin. 3. Limon suyu ile servis edin.',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        totalCalories: 200,
        totalProtein: 5,
        totalCarbs: 15,
        totalFat: 16,
        createdAt: new Date().toISOString()
      },

      // ==================== ATIŞTIIRMALIKLAR (10 tarif) ====================
      {
        id: 'recipe-23',
        name: 'Humus',
        category: 'Atıştırmalıklar',
        ingredients: [
          { foodId: 'food-116', foodName: 'Nohut (Haşlanmış)', amount: 400, unit: 'gram' },
          { foodId: 'food-117', foodName: 'Tahin', amount: 3, unit: 'yemek kaşığı' },
          { foodId: 'food-118', foodName: 'Sarımsak', amount: 2, unit: 'diş' },
          { foodId: 'food-119', foodName: 'Limon', amount: 1, unit: 'adet' },
          { foodId: 'food-120', foodName: 'Zeytinyağı', amount: 2, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Tüm malzemeleri blenderda pürüzsüz olana kadar çekin. 2. Zeytinyağı ile servis edin.',
        prepTime: 10,
        cookTime: 0,
        servings: 6,
        totalCalories: 150,
        totalProtein: 6,
        totalCarbs: 15,
        totalFat: 8,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-24',
        name: 'Guacamole',
        category: 'Atıştırmalıklar',
        ingredients: [
          { foodId: 'food-121', foodName: 'Avokado', amount: 2, unit: 'adet' },
          { foodId: 'food-122', foodName: 'Domates', amount: 1, unit: 'adet' },
          { foodId: 'food-123', foodName: 'Soğan', amount: 1, unit: 'adet' },
          { foodId: 'food-124', foodName: 'Kişniş', amount: 1, unit: 'tutam' },
          { foodId: 'food-125', foodName: 'Limon', amount: 1, unit: 'adet' }
        ],
        instructions: '1. Avokadoları ezin. 2. Domates ve soğanı küp kesin. 3. Tümünü limon suyu ile karıştırın.',
        prepTime: 10,
        cookTime: 0,
        servings: 4,
        totalCalories: 160,
        totalProtein: 2,
        totalCarbs: 10,
        totalFat: 14,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-25',
        name: 'Fırında Kabak Cipsi',
        category: 'Atıştırmalıklar',
        ingredients: [
          { foodId: 'food-126', foodName: 'Kabak', amount: 2, unit: 'adet' },
          { foodId: 'food-127', foodName: 'Zeytinyağı', amount: 1, unit: 'yemek kaşığı' },
          { foodId: 'food-128', foodName: 'Tuz', amount: 1, unit: 'tutam' },
          { foodId: 'food-129', foodName: 'Kekik', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Kabakları ince dilimleyin. 2. Zeytinyağı ve baharatla karıştırın. 3. 180°C fırında çıtır olana kadar pişirin.',
        prepTime: 10,
        cookTime: 25,
        servings: 4,
        totalCalories: 60,
        totalProtein: 2,
        totalCarbs: 6,
        totalFat: 4,
        createdAt: new Date().toISOString()
      },

      // ==================== ÇORBALAR (10 tarif) ====================
      {
        id: 'recipe-26',
        name: 'Mercimek Çorbası',
        category: 'Çorbalar',
        ingredients: [
          { foodId: 'food-130', foodName: 'Kırmızı Mercimek', amount: 200, unit: 'gram' },
          { foodId: 'food-131', foodName: 'Soğan', amount: 1, unit: 'adet' },
          { foodId: 'food-132', foodName: 'Havuç', amount: 1, unit: 'adet' },
          { foodId: 'food-133', foodName: 'Patates', amount: 1, unit: 'adet' },
          { foodId: 'food-134', foodName: 'Tereyağı', amount: 1, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Sebzeleri doğrayın ve kavurun. 2. Mercimek ve su ekleyip pişirin. 3. Blenderdan geçirip servis edin.',
        prepTime: 10,
        cookTime: 30,
        servings: 6,
        totalCalories: 150,
        totalProtein: 8,
        totalCarbs: 22,
        totalFat: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-27',
        name: 'Sebze Çorbası',
        category: 'Çorbalar',
        ingredients: [
          { foodId: 'food-135', foodName: 'Havuç', amount: 2, unit: 'adet' },
          { foodId: 'food-136', foodName: 'Kabak', amount: 1, unit: 'adet' },
          { foodId: 'food-137', foodName: 'Brokoli', amount: 100, unit: 'gram' },
          { foodId: 'food-138', foodName: 'Soğan', amount: 1, unit: 'adet' },
          { foodId: 'food-139', foodName: 'Zeytinyağı', amount: 1, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Sebzeleri doğrayın. 2. Zeytinyağında kavurun. 3. Su ekleyip pişirin ve blenderdan geçirin.',
        prepTime: 15,
        cookTime: 25,
        servings: 4,
        totalCalories: 90,
        totalProtein: 3,
        totalCarbs: 12,
        totalFat: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-28',
        name: 'Tavuk Çorbası',
        category: 'Çorbalar',
        ingredients: [
          { foodId: 'food-140', foodName: 'Tavuk Göğsü', amount: 200, unit: 'gram' },
          { foodId: 'food-141', foodName: 'Havuç', amount: 1, unit: 'adet' },
          { foodId: 'food-142', foodName: 'Pirinç', amount: 50, unit: 'gram' },
          { foodId: 'food-143', foodName: 'Limon', amount: 1, unit: 'adet' },
          { foodId: 'food-144', foodName: 'Yumurta', amount: 1, unit: 'adet' }
        ],
        instructions: '1. Tavuğu haşlayın ve didikleyin. 2. Havuç ve pirinç ekleyip pişirin. 3. Yumurta ve limon ile terbiye edin.',
        prepTime: 10,
        cookTime: 40,
        servings: 6,
        totalCalories: 120,
        totalProtein: 12,
        totalCarbs: 10,
        totalFat: 4,
        createdAt: new Date().toISOString()
      },

      // ==================== TATLILAR (10 tarif) ====================
      {
        id: 'recipe-29',
        name: 'Muzlu Yulaf Topları',
        category: 'Tatlılar',
        ingredients: [
          { foodId: 'food-145', foodName: 'Yulaf', amount: 100, unit: 'gram' },
          { foodId: 'food-146', foodName: 'Muz', amount: 2, unit: 'adet' },
          { foodId: 'food-147', foodName: 'Kakao', amount: 2, unit: 'yemek kaşığı' },
          { foodId: 'food-148', foodName: 'Fıstık Ezmesi', amount: 2, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Muzları ezin. 2. Tüm malzemeleri karıştırın. 3. Toplar yapıp buzdolabında bekletin.',
        prepTime: 10,
        cookTime: 0,
        servings: 8,
        totalCalories: 100,
        totalProtein: 3,
        totalCarbs: 15,
        totalFat: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-30',
        name: 'Yoğurtlu Meyve Kasesi',
        category: 'Tatlılar',
        ingredients: [
          { foodId: 'food-149', foodName: 'Yoğurt', amount: 200, unit: 'gram' },
          { foodId: 'food-150', foodName: 'Çilek', amount: 100, unit: 'gram' },
          { foodId: 'food-151', foodName: 'Yaban Mersini', amount: 50, unit: 'gram' },
          { foodId: 'food-152', foodName: 'Granola', amount: 30, unit: 'gram' },
          { foodId: 'food-153', foodName: 'Bal', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Yoğurdu kaseye alın. 2. Meyveleri ekleyin. 3. Granola ve bal ile süsleyin.',
        prepTime: 5,
        cookTime: 0,
        servings: 1,
        totalCalories: 280,
        totalProtein: 12,
        totalCarbs: 40,
        totalFat: 8,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-31',
        name: 'Hurma Topları',
        category: 'Tatlılar',
        ingredients: [
          { foodId: 'food-154', foodName: 'Hurma', amount: 150, unit: 'gram' },
          { foodId: 'food-155', foodName: 'Badem', amount: 50, unit: 'gram' },
          { foodId: 'food-156', foodName: 'Hindistan Cevizi Rendesi', amount: 30, unit: 'gram' },
          { foodId: 'food-157', foodName: 'Kakao', amount: 1, unit: 'yemek kaşığı' }
        ],
        instructions: '1. Hurma ve bademi blenderda çekin. 2. Toplar yapın. 3. Hindistan cevizi ile kaplama.',
        prepTime: 15,
        cookTime: 0,
        servings: 10,
        totalCalories: 80,
        totalProtein: 2,
        totalCarbs: 12,
        totalFat: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: 'recipe-32',
        name: 'Avokado Mousse',
        category: 'Tatlılar',
        ingredients: [
          { foodId: 'food-158', foodName: 'Avokado', amount: 2, unit: 'adet' },
          { foodId: 'food-159', foodName: 'Kakao', amount: 3, unit: 'yemek kaşığı' },
          { foodId: 'food-160', foodName: 'Bal', amount: 2, unit: 'yemek kaşığı' },
          { foodId: 'food-161', foodName: 'Vanilya', amount: 1, unit: 'çay kaşığı' }
        ],
        instructions: '1. Avokadoları blenderda ezin. 2. Kakao, bal ve vanilya ekleyin. 3. Buzdolabında 1 saat bekletin.',
        prepTime: 10,
        cookTime: 0,
        servings: 4,
        totalCalories: 180,
        totalProtein: 3,
        totalCarbs: 18,
        totalFat: 14,
        createdAt: new Date().toISOString()
      }
    ];

    for (const recipe of sampleRecipes) {
      await db.addRecipe(recipe);
    }
  }

  // Create 1 week diet plan for demo user
  const demoUserForPlans = await db.getUserByUsername('demo');
  if (demoUserForPlans) {
    const existingDietPlans = await db.getDailyDietPlansByUser(demoUserForPlans.id);
    if (existingDietPlans.length === 0) {
      const today = new Date();
      const weekDays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        const meals: Meal[] = [
          {
            id: `meal-${i}-1`,
            name: 'Kahvaltı',
            time: '08:00',
            foods: [
              { foodId: 'food-1', foodName: 'Yulaf Ezmesi', amount: 50, unit: 'gram', calories: 195, protein: 8.5, carbs: 33.2, fat: 3.5 },
              { foodId: 'food-8', foodName: 'Muz', amount: 1, unit: 'adet', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
              { foodId: 'food-11', foodName: 'Badem', amount: 10, unit: 'gram', calories: 193, protein: 7, carbs: 7.3, fat: 16.7 },
              { foodId: 'food-26', foodName: 'Süt (Yarım Yağlı)', amount: 1, unit: 'bardak', calories: 49, protein: 3.4, carbs: 4.8, fat: 1.8 }
            ],
            totalCalories: 526,
            totalProtein: 20,
            totalCarbs: 68.3,
            totalFat: 22.3,
            notes: 'Bol su için'
          },
          {
            id: `meal-${i}-2`,
            name: 'Ara Öğün',
            time: '11:00',
            foods: [
              { foodId: 'food-7', foodName: 'Elma', amount: 1, unit: 'adet', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
              { foodId: 'food-12', foodName: 'Ceviz', amount: 5, unit: 'gram', calories: 109, protein: 2.5, carbs: 2.3, fat: 10.8 }
            ],
            totalCalories: 161,
            totalProtein: 2.8,
            totalCarbs: 16.3,
            totalFat: 11,
            notes: ''
          },
          {
            id: `meal-${i}-3`,
            name: 'Öğle Yemeği',
            time: '13:30',
            foods: [
              { foodId: 'food-3', foodName: 'Tavuk Göğsü', amount: 150, unit: 'gram', calories: 248, protein: 46.5, carbs: 0, fat: 5.4 },
              { foodId: 'food-17', foodName: 'Bulgur', amount: 80, unit: 'gram', calories: 274, protein: 9.8, carbs: 60.7, fat: 1 },
              { foodId: 'food-39', foodName: 'Marul', amount: 50, unit: 'gram', calories: 8, protein: 0.7, carbs: 1.5, fat: 0.1 },
              { foodId: 'food-33', foodName: 'Domates', amount: 1, unit: 'adet', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
              { foodId: 'food-5', foodName: 'Süzme Yoğurt', amount: 100, unit: 'gram', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 }
            ],
            totalCalories: 607,
            totalProtein: 67.9,
            totalCarbs: 69.7,
            totalFat: 7.1,
            notes: 'Zeytinyağı ile hazırlanmalı'
          },
          {
            id: `meal-${i}-4`,
            name: 'Ara Öğün',
            time: '16:30',
            foods: [
              { foodId: 'food-28', foodName: 'Portakal', amount: 1, unit: 'adet', calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
              { foodId: 'food-41', foodName: 'Fındık', amount: 10, unit: 'gram', calories: 209, protein: 5, carbs: 5.7, fat: 20.3 }
            ],
            totalCalories: 256,
            totalProtein: 5.9,
            totalCarbs: 17.7,
            totalFat: 20.4,
            notes: ''
          },
          {
            id: `meal-${i}-5`,
            name: 'Akşam Yemeği',
            time: '19:30',
            foods: [
              { foodId: 'food-13', foodName: 'Somon Balığı', amount: 120, unit: 'gram', calories: 250, protein: 24, carbs: 0, fat: 15.6 },
              { foodId: 'food-9', foodName: 'Brokoli', amount: 150, unit: 'gram', calories: 51, protein: 4.2, carbs: 10.5, fat: 0.6 },
              { foodId: 'food-35', foodName: 'Havuç', amount: 1, unit: 'adet', calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
              { foodId: 'food-40', foodName: 'Roka', amount: 50, unit: 'gram', calories: 13, protein: 1.3, carbs: 1.9, fat: 0.4 }
            ],
            totalCalories: 355,
            totalProtein: 30.4,
            totalCarbs: 22.4,
            totalFat: 16.8,
            notes: 'Fırında pişirilmeli'
          }
        ];

        const dailyPlan: DailyDietPlan = {
          id: `diet-demo-${i}`,
          userId: demoUserForPlans.id,
          date: dateStr,
          meals: meals,
          totalCalories: meals.reduce((sum, m) => sum + m.totalCalories, 0),
          totalProtein: meals.reduce((sum, m) => sum + m.totalProtein, 0),
          totalCarbs: meals.reduce((sum, m) => sum + m.totalCarbs, 0),
          totalFat: meals.reduce((sum, m) => sum + m.totalFat, 0),
          waterIntake: 2.5,
          notes: `${weekDays[i]} günü diyet planı`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await db.addDailyDietPlan(dailyPlan);
      }
    }

    // Create 1 week exercise plan for demo user
    const existingExercisePlans = await db.getDailyExercisePlansByUser(demoUserForPlans.id);
    if (existingExercisePlans.length === 0) {
      const today = new Date();
      const weekDays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
      
      const exercisePrograms = [
        // Pazartesi - Üst Vücut
        [
          { exerciseId: 'ex-6', exerciseName: 'Şınav', duration: 15, sets: 3, reps: 15, calories: 105, notes: '3 set 15 tekrar' },
          { exerciseId: 'ex-16', exerciseName: 'Bench Press', duration: 20, sets: 4, reps: 12, calories: 140, notes: '4 set 12 tekrar' },
          { exerciseId: 'ex-17', exerciseName: 'Pull-up', duration: 15, sets: 3, reps: 10, calories: 120, notes: '3 set 10 tekrar' },
          { exerciseId: 'ex-20', exerciseName: 'Bicep Curl', duration: 10, sets: 3, reps: 15, calories: 40, notes: '3 set 15 tekrar' }
        ],
        // Salı - Kardiyovasküler
        [
          { exerciseId: 'ex-1', exerciseName: 'Koşu', duration: 30, sets: 1, reps: 1, calories: 300, notes: 'Orta tempo' },
          { exerciseId: 'ex-11', exerciseName: 'İp Atlama', duration: 10, sets: 3, reps: 1, calories: 120, notes: '3 set 10 dakika' },
          { exerciseId: 'ex-7', exerciseName: 'Plank', duration: 5, sets: 3, reps: 1, calories: 25, notes: '3 set 1 dakika' }
        ],
        // Çarşamba - Alt Vücut
        [
          { exerciseId: 'ex-5', exerciseName: 'Squat', duration: 20, sets: 4, reps: 15, calories: 120, notes: '4 set 15 tekrar' },
          { exerciseId: 'ex-14', exerciseName: 'Lunges', duration: 15, sets: 3, reps: 12, calories: 90, notes: '3 set 12 tekrar her bacak' },
          { exerciseId: 'ex-15', exerciseName: 'Deadlift', duration: 20, sets: 4, reps: 10, calories: 160, notes: '4 set 10 tekrar' },
          { exerciseId: 'ex-13', exerciseName: 'Merdiven Çıkma', duration: 15, sets: 1, reps: 1, calories: 120, notes: '15 dakika' }
        ],
        // Perşembe - Esneklik
        [
          { exerciseId: 'ex-9', exerciseName: 'Yoga', duration: 45, sets: 1, reps: 1, calories: 135, notes: 'Hatha yoga' },
          { exerciseId: 'ex-10', exerciseName: 'Pilates', duration: 30, sets: 1, reps: 1, calories: 120, notes: 'Mat pilates' },
          { exerciseId: 'ex-21', exerciseName: 'Stretching', duration: 15, sets: 1, reps: 1, calories: 30, notes: 'Tüm vücut germe' }
        ],
        // Cuma - HIIT
        [
          { exerciseId: 'ex-8', exerciseName: 'Burpee', duration: 15, sets: 4, reps: 15, calories: 150, notes: '4 set 15 tekrar' },
          { exerciseId: 'ex-11', exerciseName: 'İp Atlama', duration: 15, sets: 3, reps: 1, calories: 180, notes: '3 set 5 dakika' },
          { exerciseId: 'ex-6', exerciseName: 'Şınav', duration: 10, sets: 3, reps: 20, calories: 70, notes: '3 set 20 tekrar' },
          { exerciseId: 'ex-5', exerciseName: 'Squat', duration: 10, sets: 3, reps: 20, calories: 60, notes: '3 set 20 tekrar' }
        ],
        // Cumartesi - Kardiyovasküler
        [
          { exerciseId: 'ex-3', exerciseName: 'Bisiklet', duration: 45, sets: 1, reps: 1, calories: 360, notes: 'Orta tempo' },
          { exerciseId: 'ex-2', exerciseName: 'Yürüyüş', duration: 30, sets: 1, reps: 1, calories: 120, notes: 'Hızlı yürüyüş' }
        ],
        // Pazar - Dinlenme/Hafif
        [
          { exerciseId: 'ex-2', exerciseName: 'Yürüyüş', duration: 30, sets: 1, reps: 1, calories: 120, notes: 'Rahat tempo' },
          { exerciseId: 'ex-21', exerciseName: 'Stretching', duration: 20, sets: 1, reps: 1, calories: 40, notes: 'Hafif germe' },
          { exerciseId: 'ex-22', exerciseName: 'Tai Chi', duration: 20, sets: 1, reps: 1, calories: 60, notes: 'Meditasyon' }
        ]
      ];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        const exercises = exercisePrograms[i];
        
        const dailyPlan: DailyExercisePlan = {
          id: `exercise-demo-${i}`,
          userId: demoUserForPlans.id,
          date: dateStr,
          exercises: exercises,
          totalDuration: exercises.reduce((sum, e) => sum + e.duration, 0),
          totalCalories: exercises.reduce((sum, e) => sum + e.calories, 0),
          completed: false,
          notes: `${weekDays[i]} günü egzersiz programı`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await db.addDailyExercisePlan(dailyPlan);
      }
    }

    // Create 1 week detox plan for demo user
    const existingDetoxPlans = await db.getDailyDetoxPlansByUser(demoUserForPlans.id);
    if (existingDetoxPlans.length === 0) {
      const today = new Date();
      const weekDays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        const items: DetoxEntry[] = [
          { detoxId: 'detox-1', detoxName: 'Limon Suyu', time: '07:00', amount: 1, unit: 'bardak', benefits: 'Sindirim sistemini destekler, bağışıklığı güçlendirir', notes: 'Ilık su ile' },
          { detoxId: 'detox-6', detoxName: 'Chia Tohumu', time: '08:00', amount: 1, unit: 'yemek kaşığı', benefits: 'Omega-3, lif, tokluk hissi', notes: 'Kahvaltıda yoğurta eklenecek' },
          { detoxId: 'detox-2', detoxName: 'Yeşil Çay', time: '10:00', amount: 1, unit: 'fincan', benefits: 'Antioksidan, metabolizmayı hızlandırır', notes: 'Şekersiz' },
          { detoxId: 'detox-12', detoxName: 'Nane Limon', time: '12:00', amount: 1, unit: 'bardak', benefits: 'Sindirim, ferahlık', notes: 'Öğle yemeğinden önce' },
          { detoxId: 'detox-4', detoxName: 'Detoks Suyu', time: '15:00', amount: 1, unit: 'litre', benefits: 'Toksinleri atar, cildi güzelleştirir', notes: 'Gün boyu içilecek' },
          { detoxId: 'detox-3', detoxName: 'Zencefil Çayı', time: '20:00', amount: 1, unit: 'fincan', benefits: 'Sindirim, iltihaplanma karşıtı', notes: 'Akşam yemeğinden sonra' }
        ];

        const dailyPlan: DailyDetoxPlan = {
          id: `detox-demo-${i}`,
          userId: demoUserForPlans.id,
          date: dateStr,
          items: items,
          waterIntake: 3,
          completed: false,
          notes: `${weekDays[i]} günü detoks programı`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await db.addDailyDetoxPlan(dailyPlan);
      }
    }
  }
}
