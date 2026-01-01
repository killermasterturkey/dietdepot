// API Service - Backend communication layer
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Generic fetch wrapper
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'API Error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// ==================== Interfaces ====================

export interface User {
  id: string;
  username: string;
  password?: string;
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
  gender?: string;
  activityLevel?: string;
  goal?: string;
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

export interface Recipe {
  id: string;
  name: string;
  category: string;
  ingredients: Array<{
    foodId: string;
    foodName: string;
    amount: number;
    unit: string;
  }>;
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
  updatedAt?: string;
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
  updatedAt?: string;
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
  updatedAt?: string;
}

export interface WeightRecord {
  id: string;
  userId: string;
  weight: number;
  date: string;
  notes?: string;
  createdAt: string;
}

export interface Measurement {
  id: string;
  userId: string;
  date: string;
  chest?: number;
  waist?: number;
  hips?: number;
  arm?: number;
  thigh?: number;
  notes?: string;
  createdAt: string;
}

export interface UserFolder {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
}

export interface DietPlan {
  userId: string;
  data: unknown;
  updatedAt: string;
}

export interface ExercisePlan {
  userId: string;
  data: unknown;
  updatedAt: string;
}

export interface DetoxPlan {
  userId: string;
  data: unknown;
  updatedAt: string;
}

// ==================== API Service ====================

export const api = {
  // ==================== Auth ====================
  async login(username: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  async register(userData: Partial<User> & { password: string }): Promise<{ success: boolean; user?: User; message?: string }> {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // ==================== Users ====================
  async getUsers(): Promise<User[]> {
    return fetchAPI('/users');
  },

  async getUser(id: string): Promise<User | null> {
    try {
      return await fetchAPI(`/users/${id}`);
    } catch {
      return null;
    }
  },

  async createUser(userData: Partial<User>): Promise<{ success: boolean; user?: User; message?: string }> {
    return fetchAPI('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    return fetchAPI(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteUser(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  async getUserDataCounts(userId: string): Promise<Record<string, number>> {
    return fetchAPI(`/users/${userId}/data-counts`);
  },

  // ==================== Food Items ====================
  async getFoodItems(): Promise<FoodItem[]> {
    return fetchAPI('/food-items');
  },

  async getFoodItem(id: string): Promise<FoodItem | null> {
    try {
      return await fetchAPI(`/food-items/${id}`);
    } catch {
      return null;
    }
  },

  async createFoodItem(item: Partial<FoodItem>): Promise<FoodItem> {
    return fetchAPI('/food-items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  async updateFoodItem(id: string, updates: Partial<FoodItem>): Promise<FoodItem> {
    return fetchAPI(`/food-items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteFoodItem(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/food-items/${id}`, {
      method: 'DELETE',
    });
  },

  // ==================== Exercise Items ====================
  async getExerciseItems(): Promise<ExerciseItem[]> {
    return fetchAPI('/exercise-items');
  },

  async getExerciseItem(id: string): Promise<ExerciseItem | null> {
    try {
      return await fetchAPI(`/exercise-items/${id}`);
    } catch {
      return null;
    }
  },

  async createExerciseItem(item: Partial<ExerciseItem>): Promise<ExerciseItem> {
    return fetchAPI('/exercise-items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  async updateExerciseItem(id: string, updates: Partial<ExerciseItem>): Promise<ExerciseItem> {
    return fetchAPI(`/exercise-items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteExerciseItem(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/exercise-items/${id}`, {
      method: 'DELETE',
    });
  },

  // ==================== Detox Items ====================
  async getDetoxItems(): Promise<DetoxItem[]> {
    return fetchAPI('/detox-items');
  },

  async getDetoxItem(id: string): Promise<DetoxItem | null> {
    try {
      return await fetchAPI(`/detox-items/${id}`);
    } catch {
      return null;
    }
  },

  async createDetoxItem(item: Partial<DetoxItem>): Promise<DetoxItem> {
    return fetchAPI('/detox-items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  async updateDetoxItem(id: string, updates: Partial<DetoxItem>): Promise<DetoxItem> {
    return fetchAPI(`/detox-items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteDetoxItem(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/detox-items/${id}`, {
      method: 'DELETE',
    });
  },

  // ==================== Recipes ====================
  async getRecipes(): Promise<Recipe[]> {
    return fetchAPI('/recipes');
  },

  async getRecipe(id: string): Promise<Recipe | null> {
    try {
      return await fetchAPI(`/recipes/${id}`);
    } catch {
      return null;
    }
  },

  async createRecipe(item: Partial<Recipe>): Promise<Recipe> {
    return fetchAPI('/recipes', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe> {
    return fetchAPI(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteRecipe(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/recipes/${id}`, {
      method: 'DELETE',
    });
  },

  // ==================== Diet Plans ====================
  async getDietPlan(userId: string): Promise<DietPlan | null> {
    return fetchAPI(`/diet-plans/${userId}`);
  },

  async saveDietPlan(userId: string, data: unknown): Promise<DietPlan> {
    return fetchAPI(`/diet-plans/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  },

  async deleteDietPlan(userId: string): Promise<{ success: boolean }> {
    return fetchAPI(`/diet-plans/${userId}`, {
      method: 'DELETE',
    });
  },

  // ==================== Daily Diet Plans ====================
  async getDailyDietPlans(userId: string): Promise<DailyDietPlan[]> {
    return fetchAPI(`/daily-diet-plans/${userId}`);
  },

  async getDailyDietPlan(userId: string, date: string): Promise<DailyDietPlan | null> {
    return fetchAPI(`/daily-diet-plans/${userId}/${date}`);
  },

  async saveDailyDietPlan(userId: string, plan: Partial<DailyDietPlan>): Promise<DailyDietPlan> {
    return fetchAPI(`/daily-diet-plans/${userId}`, {
      method: 'POST',
      body: JSON.stringify(plan),
    });
  },

  async deleteDailyDietPlan(userId: string, date: string): Promise<{ success: boolean }> {
    return fetchAPI(`/daily-diet-plans/${userId}/${date}`, {
      method: 'DELETE',
    });
  },

  // ==================== Exercise Plans ====================
  async getExercisePlan(userId: string): Promise<ExercisePlan | null> {
    return fetchAPI(`/exercise-plans/${userId}`);
  },

  async saveExercisePlan(userId: string, data: unknown): Promise<ExercisePlan> {
    return fetchAPI(`/exercise-plans/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  },

  async deleteExercisePlan(userId: string): Promise<{ success: boolean }> {
    return fetchAPI(`/exercise-plans/${userId}`, {
      method: 'DELETE',
    });
  },

  // ==================== Daily Exercise Plans ====================
  async getDailyExercisePlans(userId: string): Promise<DailyExercisePlan[]> {
    return fetchAPI(`/daily-exercise-plans/${userId}`);
  },

  async getDailyExercisePlan(userId: string, date: string): Promise<DailyExercisePlan | null> {
    return fetchAPI(`/daily-exercise-plans/${userId}/${date}`);
  },

  async saveDailyExercisePlan(userId: string, plan: Partial<DailyExercisePlan>): Promise<DailyExercisePlan> {
    return fetchAPI(`/daily-exercise-plans/${userId}`, {
      method: 'POST',
      body: JSON.stringify(plan),
    });
  },

  async deleteDailyExercisePlan(userId: string, date: string): Promise<{ success: boolean }> {
    return fetchAPI(`/daily-exercise-plans/${userId}/${date}`, {
      method: 'DELETE',
    });
  },

  // ==================== Detox Plans ====================
  async getDetoxPlan(userId: string): Promise<DetoxPlan | null> {
    return fetchAPI(`/detox-plans/${userId}`);
  },

  async saveDetoxPlan(userId: string, data: unknown): Promise<DetoxPlan> {
    return fetchAPI(`/detox-plans/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  },

  async deleteDetoxPlan(userId: string): Promise<{ success: boolean }> {
    return fetchAPI(`/detox-plans/${userId}`, {
      method: 'DELETE',
    });
  },

  // ==================== Daily Detox Plans ====================
  async getDailyDetoxPlans(userId: string): Promise<DailyDetoxPlan[]> {
    return fetchAPI(`/daily-detox-plans/${userId}`);
  },

  async getDailyDetoxPlan(userId: string, date: string): Promise<DailyDetoxPlan | null> {
    return fetchAPI(`/daily-detox-plans/${userId}/${date}`);
  },

  async saveDailyDetoxPlan(userId: string, plan: Partial<DailyDetoxPlan>): Promise<DailyDetoxPlan> {
    return fetchAPI(`/daily-detox-plans/${userId}`, {
      method: 'POST',
      body: JSON.stringify(plan),
    });
  },

  async deleteDailyDetoxPlan(userId: string, date: string): Promise<{ success: boolean }> {
    return fetchAPI(`/daily-detox-plans/${userId}/${date}`, {
      method: 'DELETE',
    });
  },

  // ==================== Weight Records ====================
  async getWeightRecords(userId: string): Promise<WeightRecord[]> {
    return fetchAPI(`/weight-records/${userId}`);
  },

  async addWeightRecord(userId: string, record: Partial<WeightRecord>): Promise<WeightRecord> {
    return fetchAPI(`/weight-records/${userId}`, {
      method: 'POST',
      body: JSON.stringify(record),
    });
  },

  async deleteWeightRecord(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/weight-records/${id}`, {
      method: 'DELETE',
    });
  },

  // ==================== Measurements ====================
  async getMeasurements(userId: string): Promise<Measurement[]> {
    return fetchAPI(`/measurements/${userId}`);
  },

  async addMeasurement(userId: string, measurement: Partial<Measurement>): Promise<Measurement> {
    return fetchAPI(`/measurements/${userId}`, {
      method: 'POST',
      body: JSON.stringify(measurement),
    });
  },

  async deleteMeasurement(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/measurements/${id}`, {
      method: 'DELETE',
    });
  },

  // ==================== User Folders ====================
  async getUserFolders(userId: string): Promise<UserFolder[]> {
    return fetchAPI(`/folders/${userId}`);
  },

  async createFolder(userId: string, name: string): Promise<UserFolder> {
    return fetchAPI(`/folders/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },

  async updateFolder(id: string, name: string): Promise<UserFolder> {
    return fetchAPI(`/folders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
  },

  async deleteFolder(id: string): Promise<{ success: boolean }> {
    return fetchAPI(`/folders/${id}`, {
      method: 'DELETE',
    });
  },

  // ==================== Health Check ====================
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return fetchAPI('/health');
  },
};

export default api;
