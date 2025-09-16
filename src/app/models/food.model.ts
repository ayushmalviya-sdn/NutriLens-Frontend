export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  cholesterol: number;
}

export interface FoodItem {
  id: string;
  name: string;
  image?: string;
  nutrition: NutritionInfo;
  healthScore: number;
  category: string;
  timestamp: Date;
}

export interface HealthyAlternative {
  food: FoodItem;
  reason: string;
  improvementScore: number;
}

export interface DailyStats {
  date: Date;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  averageHealthScore: number;
  foodsConsumed: number;
}