// Database Adapter - Provides backward compatibility with IndexedDB interface
// Uses the new API service under the hood

import { api } from './api';
import type {
  User,
  FoodItem,
  ExerciseItem,
  DetoxItem,
  Recipe,
  DailyDietPlan,
  DailyExercisePlan,
  DailyDetoxPlan,
  WeightRecord,
  Measurement,
  UserFolder,
} from './api';

// Re-export all types
export type {
  User,
  FoodItem,
  ExerciseItem,
  DetoxItem,
  Recipe,
  DailyDietPlan,
  DailyExercisePlan,
  DailyDetoxPlan,
  WeightRecord,
  Measurement,
  UserFolder,
  MealFood,
  Meal,
  ExerciseEntry,
  DetoxEntry,
} from './api';

// Database adapter that mimics the old IndexedDB interface
class DatabaseAdapter {
  // ==================== Auth ====================
  async validateUser(username: string, password: string): Promise<User | null> {
    try {
      const result = await api.login(username, password);
      if (result.success && result.user) {
        return result.user as User;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Alias for login page
  async login(username: string, password: string): Promise<User | null> {
    return this.validateUser(username, password);
  }

  // ==================== Users ====================
  async getUsers(): Promise<User[]> {
    try {
      return await api.getUsers();
    } catch {
      return [];
    }
  }

  // Alias for backward compatibility
  async getAllUsers(): Promise<User[]> {
    return this.getUsers();
  }

  async getUser(id: string): Promise<User | null> {
    return api.getUser(id);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const users = await api.getUsers();
      return users.find(u => u.username === username) || null;
    } catch {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const users = await api.getUsers();
      return users.find(u => u.email === email) || null;
    } catch {
      return null;
    }
  }

  async addUser(userData: Partial<User>): Promise<User> {
    const result = await api.createUser(userData);
    if (result.success && result.user) {
      return result.user;
    }
    throw new Error(result.message || 'Failed to create user');
  }

  async updateUser(idOrUser: string | Partial<User>, updates?: Partial<User>): Promise<void> {
    if (typeof idOrUser === 'string') {
      await api.updateUser(idOrUser, updates || {});
    } else {
      // Called with just the user object
      await api.updateUser(idOrUser.id!, idOrUser);
    }
  }

  async deleteUser(id: string): Promise<void> {
    await api.deleteUser(id);
  }

  async getUserDataCount(userId: string): Promise<Record<string, number>> {
    try {
      return await api.getUserDataCounts(userId);
    } catch {
      return {};
    }
  }

  // ==================== Food Items ====================
  async getFoodItems(): Promise<FoodItem[]> {
    try {
      return await api.getFoodItems();
    } catch {
      return [];
    }
  }

  // Alias for backward compatibility
  async getAllFoodItems(): Promise<FoodItem[]> {
    return this.getFoodItems();
  }

  async getFoodItem(id: string): Promise<FoodItem | null> {
    return api.getFoodItem(id);
  }

  async addFoodItem(item: Partial<FoodItem>): Promise<FoodItem> {
    return api.createFoodItem(item);
  }

  async updateFoodItem(idOrItem: string | Partial<FoodItem>, updates?: Partial<FoodItem>): Promise<void> {
    if (typeof idOrItem === 'string') {
      await api.updateFoodItem(idOrItem, updates || {});
    } else {
      // Called with just the item object
      await api.updateFoodItem(idOrItem.id!, idOrItem);
    }
  }

  async deleteFoodItem(id: string): Promise<void> {
    await api.deleteFoodItem(id);
  }

  // ==================== Exercise Items ====================
  async getExerciseItems(): Promise<ExerciseItem[]> {
    try {
      return await api.getExerciseItems();
    } catch {
      return [];
    }
  }

  // Alias for backward compatibility
  async getAllExerciseItems(): Promise<ExerciseItem[]> {
    return this.getExerciseItems();
  }

  async getExerciseItem(id: string): Promise<ExerciseItem | null> {
    return api.getExerciseItem(id);
  }

  async addExerciseItem(item: Partial<ExerciseItem>): Promise<ExerciseItem> {
    return api.createExerciseItem(item);
  }

  async updateExerciseItem(idOrItem: string | Partial<ExerciseItem>, updates?: Partial<ExerciseItem>): Promise<void> {
    if (typeof idOrItem === 'string') {
      await api.updateExerciseItem(idOrItem, updates || {});
    } else {
      await api.updateExerciseItem(idOrItem.id!, idOrItem);
    }
  }

  async deleteExerciseItem(id: string): Promise<void> {
    await api.deleteExerciseItem(id);
  }

  // ==================== Detox Items ====================
  async getDetoxItems(): Promise<DetoxItem[]> {
    try {
      return await api.getDetoxItems();
    } catch {
      return [];
    }
  }

  // Alias for backward compatibility
  async getAllDetoxItems(): Promise<DetoxItem[]> {
    return this.getDetoxItems();
  }

  async getDetoxItem(id: string): Promise<DetoxItem | null> {
    return api.getDetoxItem(id);
  }

  async addDetoxItem(item: Partial<DetoxItem>): Promise<DetoxItem> {
    return api.createDetoxItem(item);
  }

  async updateDetoxItem(idOrItem: string | Partial<DetoxItem>, updates?: Partial<DetoxItem>): Promise<void> {
    if (typeof idOrItem === 'string') {
      await api.updateDetoxItem(idOrItem, updates || {});
    } else {
      await api.updateDetoxItem(idOrItem.id!, idOrItem);
    }
  }

  async deleteDetoxItem(id: string): Promise<void> {
    await api.deleteDetoxItem(id);
  }

  // ==================== Recipes ====================
  async getRecipes(): Promise<Recipe[]> {
    try {
      return await api.getRecipes();
    } catch {
      return [];
    }
  }

  // Alias for backward compatibility
  async getAllRecipes(): Promise<Recipe[]> {
    return this.getRecipes();
  }

  async getRecipe(id: string): Promise<Recipe | null> {
    return api.getRecipe(id);
  }

  async addRecipe(item: Partial<Recipe>): Promise<Recipe> {
    return api.createRecipe(item);
  }

  async updateRecipe(idOrItem: string | Partial<Recipe>, updates?: Partial<Recipe>): Promise<void> {
    if (typeof idOrItem === 'string') {
      await api.updateRecipe(idOrItem, updates || {});
    } else {
      await api.updateRecipe(idOrItem.id!, idOrItem);
    }
  }

  async deleteRecipe(id: string): Promise<void> {
    await api.deleteRecipe(id);
  }

  // ==================== Diet Plans (Legacy) ====================
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getDietPlan(userId: string): Promise<any> {
    const plan = await api.getDietPlan(userId);
    return plan?.data || plan || null;
  }

  async saveDietPlan(userIdOrPlan: string | { userId: string; [key: string]: unknown }, data?: unknown): Promise<void> {
    if (typeof userIdOrPlan === 'string') {
      await api.saveDietPlan(userIdOrPlan, data);
    } else {
      // Called with just the plan object
      await api.saveDietPlan(userIdOrPlan.userId, userIdOrPlan);
    }
  }

  async deleteDietPlan(userId: string): Promise<void> {
    await api.deleteDietPlan(userId);
  }

  // ==================== Daily Diet Plans ====================
  async getDailyDietPlans(userId: string): Promise<DailyDietPlan[]> {
    try {
      return await api.getDailyDietPlans(userId);
    } catch {
      return [];
    }
  }

  async getDailyDietPlan(userId: string, date: string): Promise<DailyDietPlan | null> {
    return api.getDailyDietPlan(userId, date);
  }

  async getDailyDietPlansByDateRange(userId: string, startDate: string, endDate: string): Promise<DailyDietPlan[]> {
    try {
      const plans = await api.getDailyDietPlans(userId);
      return plans.filter(p => p.date >= startDate && p.date <= endDate);
    } catch {
      return [];
    }
  }

  async saveDailyDietPlan(plan: Partial<DailyDietPlan> & { userId: string; date: string }): Promise<DailyDietPlan> {
    return api.saveDailyDietPlan(plan.userId, plan);
  }

  async deleteDailyDietPlan(userId: string, date: string): Promise<void> {
    await api.deleteDailyDietPlan(userId, date);
  }

  // Aliases for backward compatibility
  async getDailyDietPlansByUser(userId: string): Promise<DailyDietPlan[]> {
    return this.getDailyDietPlans(userId);
  }

  async updateDailyDietPlan(plan: Partial<DailyDietPlan> & { userId: string; date: string }): Promise<DailyDietPlan> {
    return this.saveDailyDietPlan(plan);
  }

  async addDailyDietPlan(plan: Partial<DailyDietPlan> & { userId: string; date: string }): Promise<DailyDietPlan> {
    return this.saveDailyDietPlan(plan);
  }

  // ==================== Exercise Plans (Legacy) ====================
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getExercisePlan(userId: string): Promise<any> {
    const plan = await api.getExercisePlan(userId);
    return plan?.data || plan || null;
  }

  async saveExercisePlan(userIdOrPlan: string | { userId: string; [key: string]: unknown }, data?: unknown): Promise<void> {
    if (typeof userIdOrPlan === 'string') {
      await api.saveExercisePlan(userIdOrPlan, data);
    } else {
      await api.saveExercisePlan(userIdOrPlan.userId, userIdOrPlan);
    }
  }

  async deleteExercisePlan(userId: string): Promise<void> {
    await api.deleteExercisePlan(userId);
  }

  // ==================== Daily Exercise Plans ====================
  async getDailyExercisePlans(userId: string): Promise<DailyExercisePlan[]> {
    try {
      return await api.getDailyExercisePlans(userId);
    } catch {
      return [];
    }
  }

  async getDailyExercisePlan(userId: string, date: string): Promise<DailyExercisePlan | null> {
    return api.getDailyExercisePlan(userId, date);
  }

  async getDailyExercisePlansByDateRange(userId: string, startDate: string, endDate: string): Promise<DailyExercisePlan[]> {
    try {
      const plans = await api.getDailyExercisePlans(userId);
      return plans.filter(p => p.date >= startDate && p.date <= endDate);
    } catch {
      return [];
    }
  }

  async saveDailyExercisePlan(plan: Partial<DailyExercisePlan> & { userId: string; date: string }): Promise<DailyExercisePlan> {
    return api.saveDailyExercisePlan(plan.userId, plan);
  }

  async deleteDailyExercisePlan(userId: string, date: string): Promise<void> {
    await api.deleteDailyExercisePlan(userId, date);
  }

  // Aliases for backward compatibility
  async getDailyExercisePlansByUser(userId: string): Promise<DailyExercisePlan[]> {
    return this.getDailyExercisePlans(userId);
  }

  async updateDailyExercisePlan(plan: Partial<DailyExercisePlan> & { userId: string; date: string }): Promise<DailyExercisePlan> {
    return this.saveDailyExercisePlan(plan);
  }

  async addDailyExercisePlan(plan: Partial<DailyExercisePlan> & { userId: string; date: string }): Promise<DailyExercisePlan> {
    return this.saveDailyExercisePlan(plan);
  }

  // ==================== Detox Plans (Legacy) ====================
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getDetoxPlan(userId: string): Promise<any> {
    const plan = await api.getDetoxPlan(userId);
    return plan?.data || plan || null;
  }

  async saveDetoxPlan(userIdOrPlan: string | { userId: string; [key: string]: unknown }, data?: unknown): Promise<void> {
    if (typeof userIdOrPlan === 'string') {
      await api.saveDetoxPlan(userIdOrPlan, data);
    } else {
      await api.saveDetoxPlan(userIdOrPlan.userId, userIdOrPlan);
    }
  }

  async deleteDetoxPlan(userId: string): Promise<void> {
    await api.deleteDetoxPlan(userId);
  }

  // ==================== Daily Detox Plans ====================
  async getDailyDetoxPlans(userId: string): Promise<DailyDetoxPlan[]> {
    try {
      return await api.getDailyDetoxPlans(userId);
    } catch {
      return [];
    }
  }

  async getDailyDetoxPlan(userId: string, date: string): Promise<DailyDetoxPlan | null> {
    return api.getDailyDetoxPlan(userId, date);
  }

  async getDailyDetoxPlansByDateRange(userId: string, startDate: string, endDate: string): Promise<DailyDetoxPlan[]> {
    try {
      const plans = await api.getDailyDetoxPlans(userId);
      return plans.filter(p => p.date >= startDate && p.date <= endDate);
    } catch {
      return [];
    }
  }

  async saveDailyDetoxPlan(plan: Partial<DailyDetoxPlan> & { userId: string; date: string }): Promise<DailyDetoxPlan> {
    return api.saveDailyDetoxPlan(plan.userId, plan);
  }

  async deleteDailyDetoxPlan(userId: string, date: string): Promise<void> {
    await api.deleteDailyDetoxPlan(userId, date);
  }

  // Aliases for backward compatibility
  async getDailyDetoxPlansByUser(userId: string): Promise<DailyDetoxPlan[]> {
    return this.getDailyDetoxPlans(userId);
  }

  async updateDailyDetoxPlan(plan: Partial<DailyDetoxPlan> & { userId: string; date: string }): Promise<DailyDetoxPlan> {
    return this.saveDailyDetoxPlan(plan);
  }

  async addDailyDetoxPlan(plan: Partial<DailyDetoxPlan> & { userId: string; date: string }): Promise<DailyDetoxPlan> {
    return this.saveDailyDetoxPlan(plan);
  }

  // ==================== Weight Records ====================
  async getWeightRecords(userId: string): Promise<WeightRecord[]> {
    try {
      return await api.getWeightRecords(userId);
    } catch {
      return [];
    }
  }

  async addWeightRecord(userId: string, record: Partial<WeightRecord>): Promise<WeightRecord> {
    return api.addWeightRecord(userId, record);
  }

  async deleteWeightRecord(id: string): Promise<void> {
    await api.deleteWeightRecord(id);
  }

  // ==================== Measurements ====================
  async getMeasurements(userId: string): Promise<Measurement[]> {
    try {
      return await api.getMeasurements(userId);
    } catch {
      return [];
    }
  }

  async addMeasurement(userId: string, measurement: Partial<Measurement>): Promise<Measurement> {
    return api.addMeasurement(userId, measurement);
  }

  async deleteMeasurement(id: string): Promise<void> {
    await api.deleteMeasurement(id);
  }

  // ==================== User Folders ====================
  async getUserFolders(userId: string): Promise<UserFolder[]> {
    try {
      return await api.getUserFolders(userId);
    } catch {
      return [];
    }
  }

  async createUserFolder(userId: string, name: string): Promise<UserFolder> {
    return api.createFolder(userId, name);
  }

  async updateUserFolder(id: string, name: string): Promise<void> {
    await api.updateFolder(id, name);
  }

  async deleteUserFolder(id: string): Promise<void> {
    await api.deleteFolder(id);
  }

  // Yeni kullanıcı için klasör yapısı oluştur
  async createUserFolderStructure(userId: string): Promise<void> {
    const defaultFolders = [
      'Diyet Planları',
      'Egzersiz Planları',
      'Detoks Planları',
      'Raporlar',
      'Notlar'
    ];

    for (const folderName of defaultFolders) {
      try {
        await api.createFolder(userId, folderName);
      } catch (error) {
        console.error(`[DB Adapter] Klasör oluşturulamadı: ${folderName}`, error);
      }
    }
  }

  // ==================== Database Management ====================
  async resetAllDatabases(): Promise<void> {
    console.log('[DB Adapter] Reset not available - data is managed by server');
    // In a real implementation, this would call an API endpoint to reset databases
    // For now, we just log a message since server manages the data
  }

  // ==================== Initialization (no-op for API) ====================
  async initializeDefaultAdmin(): Promise<void> {
    // Admin is created server-side
    console.log('[DB Adapter] Database ready (using API backend)');
  }

  async initializeDefaultData(): Promise<void> {
    // Default data is initialized server-side
    console.log('[DB Adapter] Default data initialized on server');
  }
}

// Export singleton instance
export const db = new DatabaseAdapter();
export default db;
