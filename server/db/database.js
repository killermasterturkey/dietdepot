const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Database collections
const collections = [
  'users',
  'foodItems',
  'exerciseItems',
  'detoxItems',
  'recipes',
  'dietPlans',
  'exercisePlans',
  'detoxPlans',
  'dailyDietPlans',
  'dailyExercisePlans',
  'dailyDetoxPlans',
  'userFolders',
  'weightRecords',
  'measurements'
];

// Initialize empty collections if they don't exist
collections.forEach(collection => {
  const filePath = path.join(DB_DIR, `${collection}.json`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
});

// Read collection
function readCollection(name) {
  const filePath = path.join(DB_DIR, `${name}.json`);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${name}:`, error);
    return [];
  }
}

// Write collection
function writeCollection(name, data) {
  const filePath = path.join(DB_DIR, `${name}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${name}:`, error);
    return false;
  }
}

// Generic CRUD operations
const db = {
  // Get all items from a collection
  getAll: (collection) => {
    return readCollection(collection);
  },

  // Get item by ID
  getById: (collection, id) => {
    const items = readCollection(collection);
    return items.find(item => item.id === id);
  },

  // Get items by field value
  getByField: (collection, field, value) => {
    const items = readCollection(collection);
    return items.filter(item => item[field] === value);
  },

  // Add new item
  add: (collection, item) => {
    const items = readCollection(collection);
    items.push(item);
    writeCollection(collection, items);
    return item;
  },

  // Update item
  update: (collection, id, updates) => {
    const items = readCollection(collection);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      writeCollection(collection, items);
      return items[index];
    }
    return null;
  },

  // Delete item
  delete: (collection, id) => {
    const items = readCollection(collection);
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length !== items.length) {
      writeCollection(collection, filtered);
      return true;
    }
    return false;
  },

  // Delete by field
  deleteByField: (collection, field, value) => {
    const items = readCollection(collection);
    const filtered = items.filter(item => item[field] !== value);
    writeCollection(collection, filtered);
    return items.length - filtered.length;
  },

  // Upsert (update or insert) - for plans with userId as key
  upsert: (collection, keyField, keyValue, item) => {
    const items = readCollection(collection);
    const index = items.findIndex(i => i[keyField] === keyValue);
    if (index !== -1) {
      items[index] = { ...items[index], ...item };
    } else {
      items.push(item);
    }
    writeCollection(collection, items);
    return item;
  },

  // Initialize default data
  initializeDefaults: () => {
    // Check if admin exists
    const users = readCollection('users');
    const adminExists = users.find(u => u.username === 'admin');

    if (!adminExists) {
      const adminUser = {
        id: 'admin-001',
        username: 'admin',
        password: 'admin123',
        fullName: 'Dyt Ayşenur Korkmaz',
        email: 'admin@admin.com',
        phone: '+90 555 000 00 00',
        age: 30,
        weight: 60,
        height: 165,
        createdAt: new Date().toISOString(),
        isAdmin: true
      };
      db.add('users', adminUser);
      console.log('[DB] Admin user created');
    }

    // Initialize food items if empty
    const foodItems = readCollection('foodItems');
    if (foodItems.length === 0) {
      const defaultFoods = require('./defaultData/foods.json');
      writeCollection('foodItems', defaultFoods);
      console.log(`[DB] ${defaultFoods.length} food items initialized`);
    }

    // Initialize exercise items if empty
    const exerciseItems = readCollection('exerciseItems');
    if (exerciseItems.length === 0) {
      const defaultExercises = require('./defaultData/exercises.json');
      writeCollection('exerciseItems', defaultExercises);
      console.log(`[DB] ${defaultExercises.length} exercise items initialized`);
    }

    // Initialize detox items if empty
    const detoxItems = readCollection('detoxItems');
    if (detoxItems.length === 0) {
      const defaultDetox = require('./defaultData/detox.json');
      writeCollection('detoxItems', defaultDetox);
      console.log(`[DB] ${defaultDetox.length} detox items initialized`);
    }

    // Initialize recipes if empty
    const recipes = readCollection('recipes');
    if (recipes.length === 0) {
      const defaultRecipes = require('./defaultData/recipes.json');
      writeCollection('recipes', defaultRecipes);
      console.log(`[DB] ${defaultRecipes.length} recipes initialized`);
    }
  }
};

module.exports = db;
