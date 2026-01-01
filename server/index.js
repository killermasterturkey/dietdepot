const express = require('express');
const cors = require('cors');
const db = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize default data
db.initializeDefaults();

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const users = db.getAll('users');
  const user = users.find(u =>
    (u.username === username || u.email === username) && u.password === password
  );

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401).json({ success: false, message: 'Geçersiz kullanıcı adı veya şifre' });
  }
});

// Register
app.post('/api/auth/register', (req, res) => {
  const { username, email, password, fullName, phone, age, weight, height, gender, activityLevel, goal } = req.body;

  const users = db.getAll('users');

  // Check if username or email already exists
  const existingUser = users.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Bu kullanıcı adı veya email zaten kayıtlı' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    username,
    email,
    password,
    fullName,
    phone: phone || '',
    age: age || null,
    weight: weight || null,
    height: height || null,
    gender: gender || null,
    activityLevel: activityLevel || null,
    goal: goal || null,
    createdAt: new Date().toISOString(),
    isAdmin: false
  };

  db.add('users', newUser);

  // Create default folder for user
  const defaultFolder = {
    id: `folder-${Date.now()}`,
    userId: newUser.id,
    name: 'Genel',
    createdAt: new Date().toISOString()
  };
  db.add('userFolders', defaultFolder);

  const { password: _, ...userWithoutPassword } = newUser;
  res.json({ success: true, user: userWithoutPassword });
});

// ==================== USER ROUTES ====================

// Get all users (admin only)
app.get('/api/users', (req, res) => {
  const users = db.getAll('users');
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json(usersWithoutPasswords);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = db.getById('users', req.params.id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }
});

// Create user (admin)
app.post('/api/users', (req, res) => {
  const userData = req.body;

  const users = db.getAll('users');
  const existingUser = users.find(u => u.username === userData.username || u.email === userData.email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Bu kullanıcı adı veya email zaten kayıtlı' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    ...userData,
    createdAt: new Date().toISOString(),
    isAdmin: userData.isAdmin || false
  };

  db.add('users', newUser);

  // Create default folder for user
  const defaultFolder = {
    id: `folder-${Date.now()}`,
    userId: newUser.id,
    name: 'Genel',
    createdAt: new Date().toISOString()
  };
  db.add('userFolders', defaultFolder);

  const { password, ...userWithoutPassword } = newUser;
  res.json({ success: true, user: userWithoutPassword });
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const updated = db.update('users', req.params.id, req.body);
  if (updated) {
    const { password, ...userWithoutPassword } = updated;
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }
});

// Delete user and all related data
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  // Delete all user-related data
  const relatedCollections = [
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

  relatedCollections.forEach(collection => {
    db.deleteByField(collection, 'userId', userId);
  });

  // Delete the user
  const deleted = db.delete('users', userId);

  if (deleted) {
    res.json({ success: true, message: 'Kullanıcı ve tüm verileri silindi' });
  } else {
    res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
  }
});

// Get user data counts (for delete confirmation)
app.get('/api/users/:id/data-counts', (req, res) => {
  const userId = req.params.id;

  const counts = {
    dietPlans: db.getByField('dailyDietPlans', 'userId', userId).length,
    exercisePlans: db.getByField('dailyExercisePlans', 'userId', userId).length,
    detoxPlans: db.getByField('dailyDetoxPlans', 'userId', userId).length,
    weightRecords: db.getByField('weightRecords', 'userId', userId).length,
    measurements: db.getByField('measurements', 'userId', userId).length,
    folders: db.getByField('userFolders', 'userId', userId).length
  };

  res.json(counts);
});

// ==================== FOOD ITEMS ROUTES ====================

app.get('/api/food-items', (req, res) => {
  res.json(db.getAll('foodItems'));
});

app.get('/api/food-items/:id', (req, res) => {
  const item = db.getById('foodItems', req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Besin bulunamadı' });
  }
});

app.post('/api/food-items', (req, res) => {
  const newItem = {
    id: `food-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.add('foodItems', newItem);
  res.json(newItem);
});

app.put('/api/food-items/:id', (req, res) => {
  const updated = db.update('foodItems', req.params.id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Besin bulunamadı' });
  }
});

app.delete('/api/food-items/:id', (req, res) => {
  const deleted = db.delete('foodItems', req.params.id);
  if (deleted) {
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Besin bulunamadı' });
  }
});

// ==================== EXERCISE ITEMS ROUTES ====================

app.get('/api/exercise-items', (req, res) => {
  res.json(db.getAll('exerciseItems'));
});

app.get('/api/exercise-items/:id', (req, res) => {
  const item = db.getById('exerciseItems', req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Egzersiz bulunamadı' });
  }
});

app.post('/api/exercise-items', (req, res) => {
  const newItem = {
    id: `ex-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.add('exerciseItems', newItem);
  res.json(newItem);
});

app.put('/api/exercise-items/:id', (req, res) => {
  const updated = db.update('exerciseItems', req.params.id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Egzersiz bulunamadı' });
  }
});

app.delete('/api/exercise-items/:id', (req, res) => {
  const deleted = db.delete('exerciseItems', req.params.id);
  if (deleted) {
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Egzersiz bulunamadı' });
  }
});

// ==================== DETOX ITEMS ROUTES ====================

app.get('/api/detox-items', (req, res) => {
  res.json(db.getAll('detoxItems'));
});

app.get('/api/detox-items/:id', (req, res) => {
  const item = db.getById('detoxItems', req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Detoks öğesi bulunamadı' });
  }
});

app.post('/api/detox-items', (req, res) => {
  const newItem = {
    id: `detox-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.add('detoxItems', newItem);
  res.json(newItem);
});

app.put('/api/detox-items/:id', (req, res) => {
  const updated = db.update('detoxItems', req.params.id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Detoks öğesi bulunamadı' });
  }
});

app.delete('/api/detox-items/:id', (req, res) => {
  const deleted = db.delete('detoxItems', req.params.id);
  if (deleted) {
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Detoks öğesi bulunamadı' });
  }
});

// ==================== RECIPES ROUTES ====================

app.get('/api/recipes', (req, res) => {
  res.json(db.getAll('recipes'));
});

app.get('/api/recipes/:id', (req, res) => {
  const item = db.getById('recipes', req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Tarif bulunamadı' });
  }
});

app.post('/api/recipes', (req, res) => {
  const newItem = {
    id: `recipe-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.add('recipes', newItem);
  res.json(newItem);
});

app.put('/api/recipes/:id', (req, res) => {
  const updated = db.update('recipes', req.params.id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Tarif bulunamadı' });
  }
});

app.delete('/api/recipes/:id', (req, res) => {
  const deleted = db.delete('recipes', req.params.id);
  if (deleted) {
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Tarif bulunamadı' });
  }
});

// ==================== DIET PLANS ROUTES ====================

// Get diet plan for user
app.get('/api/diet-plans/:userId', (req, res) => {
  const plan = db.getByField('dietPlans', 'userId', req.params.userId)[0];
  res.json(plan || null);
});

// Save/update diet plan
app.post('/api/diet-plans/:userId', (req, res) => {
  const plan = {
    ...req.body,
    userId: req.params.userId,
    updatedAt: new Date().toISOString()
  };
  db.upsert('dietPlans', 'userId', req.params.userId, plan);
  res.json(plan);
});

// Delete diet plan
app.delete('/api/diet-plans/:userId', (req, res) => {
  db.deleteByField('dietPlans', 'userId', req.params.userId);
  res.json({ success: true });
});

// ==================== DAILY DIET PLANS ROUTES ====================

// Get all daily diet plans for user
app.get('/api/daily-diet-plans/:userId', (req, res) => {
  const plans = db.getByField('dailyDietPlans', 'userId', req.params.userId);
  res.json(plans);
});

// Get daily diet plan by date
app.get('/api/daily-diet-plans/:userId/:date', (req, res) => {
  const plans = db.getByField('dailyDietPlans', 'userId', req.params.userId);
  const plan = plans.find(p => p.date === req.params.date);
  res.json(plan || null);
});

// Save daily diet plan
app.post('/api/daily-diet-plans/:userId', (req, res) => {
  const { date, ...data } = req.body;
  const plans = db.getByField('dailyDietPlans', 'userId', req.params.userId);
  const existingPlan = plans.find(p => p.date === date);

  if (existingPlan) {
    const updated = db.update('dailyDietPlans', existingPlan.id, { ...data, date, updatedAt: new Date().toISOString() });
    res.json(updated);
  } else {
    const newPlan = {
      id: `ddp-${Date.now()}`,
      userId: req.params.userId,
      date,
      ...data,
      createdAt: new Date().toISOString()
    };
    db.add('dailyDietPlans', newPlan);
    res.json(newPlan);
  }
});

// Delete daily diet plan
app.delete('/api/daily-diet-plans/:userId/:date', (req, res) => {
  const plans = db.getByField('dailyDietPlans', 'userId', req.params.userId);
  const plan = plans.find(p => p.date === req.params.date);
  if (plan) {
    db.delete('dailyDietPlans', plan.id);
  }
  res.json({ success: true });
});

// ==================== EXERCISE PLANS ROUTES ====================

app.get('/api/exercise-plans/:userId', (req, res) => {
  const plan = db.getByField('exercisePlans', 'userId', req.params.userId)[0];
  res.json(plan || null);
});

app.post('/api/exercise-plans/:userId', (req, res) => {
  const plan = {
    ...req.body,
    userId: req.params.userId,
    updatedAt: new Date().toISOString()
  };
  db.upsert('exercisePlans', 'userId', req.params.userId, plan);
  res.json(plan);
});

app.delete('/api/exercise-plans/:userId', (req, res) => {
  db.deleteByField('exercisePlans', 'userId', req.params.userId);
  res.json({ success: true });
});

// ==================== DAILY EXERCISE PLANS ROUTES ====================

app.get('/api/daily-exercise-plans/:userId', (req, res) => {
  const plans = db.getByField('dailyExercisePlans', 'userId', req.params.userId);
  res.json(plans);
});

app.get('/api/daily-exercise-plans/:userId/:date', (req, res) => {
  const plans = db.getByField('dailyExercisePlans', 'userId', req.params.userId);
  const plan = plans.find(p => p.date === req.params.date);
  res.json(plan || null);
});

app.post('/api/daily-exercise-plans/:userId', (req, res) => {
  const { date, ...data } = req.body;
  const plans = db.getByField('dailyExercisePlans', 'userId', req.params.userId);
  const existingPlan = plans.find(p => p.date === date);

  if (existingPlan) {
    const updated = db.update('dailyExercisePlans', existingPlan.id, { ...data, date, updatedAt: new Date().toISOString() });
    res.json(updated);
  } else {
    const newPlan = {
      id: `dep-${Date.now()}`,
      userId: req.params.userId,
      date,
      ...data,
      createdAt: new Date().toISOString()
    };
    db.add('dailyExercisePlans', newPlan);
    res.json(newPlan);
  }
});

app.delete('/api/daily-exercise-plans/:userId/:date', (req, res) => {
  const plans = db.getByField('dailyExercisePlans', 'userId', req.params.userId);
  const plan = plans.find(p => p.date === req.params.date);
  if (plan) {
    db.delete('dailyExercisePlans', plan.id);
  }
  res.json({ success: true });
});

// ==================== DETOX PLANS ROUTES ====================

app.get('/api/detox-plans/:userId', (req, res) => {
  const plan = db.getByField('detoxPlans', 'userId', req.params.userId)[0];
  res.json(plan || null);
});

app.post('/api/detox-plans/:userId', (req, res) => {
  const plan = {
    ...req.body,
    userId: req.params.userId,
    updatedAt: new Date().toISOString()
  };
  db.upsert('detoxPlans', 'userId', req.params.userId, plan);
  res.json(plan);
});

app.delete('/api/detox-plans/:userId', (req, res) => {
  db.deleteByField('detoxPlans', 'userId', req.params.userId);
  res.json({ success: true });
});

// ==================== DAILY DETOX PLANS ROUTES ====================

app.get('/api/daily-detox-plans/:userId', (req, res) => {
  const plans = db.getByField('dailyDetoxPlans', 'userId', req.params.userId);
  res.json(plans);
});

app.get('/api/daily-detox-plans/:userId/:date', (req, res) => {
  const plans = db.getByField('dailyDetoxPlans', 'userId', req.params.userId);
  const plan = plans.find(p => p.date === req.params.date);
  res.json(plan || null);
});

app.post('/api/daily-detox-plans/:userId', (req, res) => {
  const { date, ...data } = req.body;
  const plans = db.getByField('dailyDetoxPlans', 'userId', req.params.userId);
  const existingPlan = plans.find(p => p.date === date);

  if (existingPlan) {
    const updated = db.update('dailyDetoxPlans', existingPlan.id, { ...data, date, updatedAt: new Date().toISOString() });
    res.json(updated);
  } else {
    const newPlan = {
      id: `dtp-${Date.now()}`,
      userId: req.params.userId,
      date,
      ...data,
      createdAt: new Date().toISOString()
    };
    db.add('dailyDetoxPlans', newPlan);
    res.json(newPlan);
  }
});

app.delete('/api/daily-detox-plans/:userId/:date', (req, res) => {
  const plans = db.getByField('dailyDetoxPlans', 'userId', req.params.userId);
  const plan = plans.find(p => p.date === req.params.date);
  if (plan) {
    db.delete('dailyDetoxPlans', plan.id);
  }
  res.json({ success: true });
});

// ==================== WEIGHT RECORDS ROUTES ====================

app.get('/api/weight-records/:userId', (req, res) => {
  const records = db.getByField('weightRecords', 'userId', req.params.userId);
  res.json(records.sort((a, b) => new Date(b.date) - new Date(a.date)));
});

app.post('/api/weight-records/:userId', (req, res) => {
  const record = {
    id: `wr-${Date.now()}`,
    userId: req.params.userId,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.add('weightRecords', record);
  res.json(record);
});

app.delete('/api/weight-records/:id', (req, res) => {
  const deleted = db.delete('weightRecords', req.params.id);
  res.json({ success: deleted });
});

// ==================== MEASUREMENTS ROUTES ====================

app.get('/api/measurements/:userId', (req, res) => {
  const records = db.getByField('measurements', 'userId', req.params.userId);
  res.json(records.sort((a, b) => new Date(b.date) - new Date(a.date)));
});

app.post('/api/measurements/:userId', (req, res) => {
  const record = {
    id: `ms-${Date.now()}`,
    userId: req.params.userId,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.add('measurements', record);
  res.json(record);
});

app.delete('/api/measurements/:id', (req, res) => {
  const deleted = db.delete('measurements', req.params.id);
  res.json({ success: deleted });
});

// ==================== USER FOLDERS ROUTES ====================

app.get('/api/folders/:userId', (req, res) => {
  const folders = db.getByField('userFolders', 'userId', req.params.userId);
  res.json(folders);
});

app.post('/api/folders/:userId', (req, res) => {
  const folder = {
    id: `folder-${Date.now()}`,
    userId: req.params.userId,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.add('userFolders', folder);
  res.json(folder);
});

app.put('/api/folders/:id', (req, res) => {
  const updated = db.update('userFolders', req.params.id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Klasör bulunamadı' });
  }
});

app.delete('/api/folders/:id', (req, res) => {
  const deleted = db.delete('userFolders', req.params.id);
  res.json({ success: deleted });
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log(`[Server] API available at http://localhost:${PORT}/api`);
});
