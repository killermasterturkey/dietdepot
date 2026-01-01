import { useState, useEffect } from 'react';
import { db, Recipe, RecipeIngredient, FoodItem } from '../../../utils/database';
import FoodDatabase from './FoodDatabase';

interface RecipeDatabaseProps {
  onClose?: () => void;
  onSelectRecipe?: (recipe: Recipe) => void;
}

export default function RecipeDatabase({ onClose, onSelectRecipe }: RecipeDatabaseProps) {
  const isModal = !!onClose;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const categories = ['Tümü', 'Kahvaltılar', 'Ana Yemekler', 'Salatalar', 'Atıştırmalıklar', 'Çorbalar', 'Tatlılar'];

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [recipes, searchTerm, selectedCategory]);

  const loadRecipes = async () => {
    const allRecipes = await db.getAllRecipes();
    setRecipes(allRecipes);
  };

  const filterRecipes = () => {
    let filtered = recipes;

    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu tarifi silmek istediğinizden emin misiniz?')) {
      await db.deleteRecipe(id);
      loadRecipes();
    }
  };

  const content = (
    <>
      <div className={`${isModal ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gradient-to-r from-orange-600 to-red-600 rounded-t-xl'} px-6 py-4 flex items-center justify-between`}>
        <div>
          <h2 className="text-xl font-bold text-white">Yemek Tarifleri Veritabanı</h2>
          <p className="text-orange-100 text-sm mt-1">Yemek tariflerini yönetin ({recipes.length} öğe)</p>
        </div>
        {isModal && (
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-2xl text-white"></i>
          </button>
        )}
      </div>

        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tarif ara..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Yeni Tarif
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-orange-500 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{recipe.name}</h3>
                    <p className="text-xs text-orange-600 font-medium">{recipe.category}</p>
                  </div>
                  <div className="flex gap-1">
                    {onSelectRecipe && onClose && (
                      <button
                        onClick={() => {
                          onSelectRecipe(recipe);
                          onClose();
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-orange-100 text-orange-600 rounded-lg transition-colors"
                        title="Seç"
                      >
                        <i className="ri-check-line"></i>
                      </button>
                    )}
                    <button
                      onClick={() => setEditingRecipe(recipe)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span><i className="ri-time-line mr-1"></i>Hazırlık: {recipe.prepTime} dk</span>
                    <span><i className="ri-timer-line mr-1"></i>Pişirme: {recipe.cookTime} dk</span>
                    <span><i className="ri-user-line mr-1"></i>{recipe.servings} kişilik</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-2">Malzemeler ({recipe.ingredients.length}):</p>
                    <div className="space-y-1">
                      {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                        <p key={idx} className="text-sm text-gray-700">
                          • {ing.foodName} - {ing.amount} {ing.unit}
                        </p>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <p className="text-xs text-gray-500">+{recipe.ingredients.length - 3} malzeme daha...</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Kalori</p>
                      <p className="text-sm font-bold text-orange-600">{recipe.totalCalories}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Protein</p>
                      <p className="text-sm font-bold text-blue-600">{recipe.totalProtein}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Karb.</p>
                      <p className="text-sm font-bold text-amber-600">{recipe.totalCarbs}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Yağ</p>
                      <p className="text-sm font-bold text-red-600">{recipe.totalFat}g</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">Tarif bulunamadı</p>
            </div>
          )}
        </div>

      {(showAddModal || editingRecipe) && (
        <RecipeFormModal
          recipe={editingRecipe}
          onClose={() => {
            setShowAddModal(false);
            setEditingRecipe(null);
          }}
          onSuccess={() => {
            setShowAddModal(false);
            setEditingRecipe(null);
            loadRecipes();
          }}
        />
      )}
    </>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {content}
    </div>
  );
}

interface RecipeFormModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onSuccess: () => void;
}

function RecipeFormModal({ recipe, onClose, onSuccess }: RecipeFormModalProps) {
  const [formData, setFormData] = useState<Partial<Recipe>>(
    recipe || {
      name: '',
      category: 'Ana Yemek',
      ingredients: [],
      instructions: '',
      prepTime: 0,
      cookTime: 0,
      servings: 1,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0
    }
  );
  const [showFoodSelector, setShowFoodSelector] = useState(false);

  const categories = ['Kahvaltılar', 'Ana Yemekler', 'Salatalar', 'Atıştırmalıklar', 'Çorbalar', 'Tatlılar'];

  const handleAddIngredient = (food: FoodItem) => {
    const newIngredient: RecipeIngredient = {
      foodId: food.id,
      foodName: food.name,
      amount: parseFloat(food.servingSize),
      unit: food.servingUnit
    };

    const updatedIngredients = [...(formData.ingredients || []), newIngredient];
    calculateNutrition(updatedIngredients);
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = formData.ingredients?.filter((_, i) => i !== index) || [];
    calculateNutrition(updatedIngredients);
  };

  const handleUpdateIngredient = (index: number, field: 'amount' | 'unit', value: string | number) => {
    const updatedIngredients = [...(formData.ingredients || [])];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value
    };
    calculateNutrition(updatedIngredients);
  };

  const calculateNutrition = async (ingredients: RecipeIngredient[]) => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    for (const ing of ingredients) {
      const food = await db.getFoodItem(ing.foodId);
      if (food) {
        const ratio = ing.amount / parseFloat(food.servingSize);
        totalCalories += food.calories * ratio;
        totalProtein += food.protein * ratio;
        totalCarbs += food.carbs * ratio;
        totalFat += food.fat * ratio;
      }
    }

    setFormData({
      ...formData,
      ingredients,
      totalCalories: Math.round(totalCalories),
      totalProtein: Math.round(totalProtein * 10) / 10,
      totalCarbs: Math.round(totalCarbs * 10) / 10,
      totalFat: Math.round(totalFat * 10) / 10
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ingredients || formData.ingredients.length === 0) {
      alert('En az bir malzeme eklemelisiniz!');
      return;
    }

    const recipeData: Recipe = {
      id: recipe?.id || `recipe-${Date.now()}`,
      name: formData.name!,
      category: formData.category!,
      ingredients: formData.ingredients!,
      instructions: formData.instructions!,
      prepTime: formData.prepTime!,
      cookTime: formData.cookTime!,
      servings: formData.servings!,
      totalCalories: formData.totalCalories!,
      totalProtein: formData.totalProtein!,
      totalCarbs: formData.totalCarbs!,
      totalFat: formData.totalFat!,
      imageUrl: formData.imageUrl,
      createdAt: recipe?.createdAt || new Date().toISOString()
    };

    if (recipe) {
      await db.updateRecipe(recipeData);
    } else {
      await db.addRecipe(recipeData);
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {recipe ? 'Tarif Düzenle' : 'Yeni Tarif Ekle'}
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-2xl text-white"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tarif Adı *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Porsiyon Sayısı *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hazırlık Süresi (dk) *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pişirme Süresi (dk) *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.cookTime}
                onChange={(e) => setFormData({ ...formData, cookTime: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Malzemeler *</label>
              <button
                type="button"
                onClick={() => setShowFoodSelector(true)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                <i className="ri-add-line mr-1"></i>
                Malzeme Ekle
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {formData.ingredients && formData.ingredients.length > 0 ? (
                formData.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <span className="flex-1 font-medium text-gray-900">{ing.foodName}</span>
                    <input
                      type="number"
                      step="0.1"
                      value={ing.amount}
                      onChange={(e) => handleUpdateIngredient(idx, 'amount', parseFloat(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      value={ing.unit}
                      onChange={(e) => handleUpdateIngredient(idx, 'unit', e.target.value)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">Henüz malzeme eklenmedi</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Yapılışı *</label>
            <textarea
              required
              rows={6}
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="Tarifin yapılış aşamalarını yazın..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-3">Besin Değerleri (Otomatik Hesaplanır)</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Kalori</p>
                <p className="text-xl font-bold text-orange-600">{formData.totalCalories} kcal</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Protein</p>
                <p className="text-xl font-bold text-blue-600">{formData.totalProtein}g</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Karbonhidrat</p>
                <p className="text-xl font-bold text-amber-600">{formData.totalCarbs}g</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Yağ</p>
                <p className="text-xl font-bold text-red-600">{formData.totalFat}g</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium whitespace-nowrap"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              {recipe ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>

        {showFoodSelector && (
          <FoodDatabase
            onClose={() => setShowFoodSelector(false)}
            onSelectFood={(food) => {
              handleAddIngredient(food);
              setShowFoodSelector(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
