// Database module - Uses API backend for data persistence
// Re-exports from databaseAdapter for backward compatibility

import { db } from './databaseAdapter';

// Re-export db instance
export { db };

// Re-export types from databaseAdapter
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
} from './databaseAdapter';

// Additional type aliases for backward compatibility
export interface DietPlan {
  id?: string;
  userId: string;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snacks?: string;
  calories?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExercisePlan {
  id?: string;
  userId: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DetoxPlan {
  id?: string;
  userId: string;
  duration?: string;
  morning?: string;
  afternoon?: string;
  evening?: string;
  benefits?: string;
  warnings?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RecipeIngredient {
  foodId: string;
  foodName: string;
  amount: number;
  unit: string;
}

// Initialize function - no-op since server handles initialization
export async function initializeDefaultAdmin(): Promise<void> {
  console.log('[DB] Initializing connection to API backend...');
  try {
    // Just verify connection to API
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/health`);
    if (response.ok) {
      console.log('[DB] API backend connected successfully');
    } else {
      console.warn('[DB] API backend not available, data may not persist');
    }
  } catch (error) {
    console.warn('[DB] Cannot connect to API backend:', error);
  }
}

// Default export
export default db;
