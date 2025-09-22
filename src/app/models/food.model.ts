export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface NutritionResponse {
  food_name: string;
  food_category: string;
  calories_per_serving: number;
  serving_size: string;
  macros: Macros;
  healthiness_score: number;
  healthier_alternatives: string[];
  confidence_score: number;
}

export interface GenerateRequest {
  foodName: string;
  foodCategory: string;
  servingSize: string;
  macros: Macros;
  caloriesPerServing: number;
}

export interface GenerateResponse {
  corrected_calories: number;
  corrected_serving_size: number;
  corrected_macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  nutritional_advice?: string;
  portion_recommendation?: string;
}
