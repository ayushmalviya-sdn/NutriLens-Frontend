import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodItem, HealthyAlternative, DailyStats, NutritionInfo } from '../../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private foodItemsSubject = new BehaviorSubject<FoodItem[]>([]);
  public foodItems$ = this.foodItemsSubject.asObservable();

  private mockFoodDatabase: FoodItem[] = [
    {
      id: '1',
      name: 'Grilled Chicken Breast',
      nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74, cholesterol: 85 },
      healthScore: 9,
      category: 'Protein',
      timestamp: new Date()
    },
    {
      id: '2',
      name: 'Quinoa Salad',
      nutrition: { calories: 222, protein: 8, carbs: 39, fat: 3.6, fiber: 5, sugar: 3, sodium: 13, cholesterol: 0 },
      healthScore: 8,
      category: 'Grain',
      timestamp: new Date()
    },
    {
      id: '3',
      name: 'Avocado Toast',
      nutrition: { calories: 234, protein: 6, carbs: 19, fat: 15, fiber: 10, sugar: 1, sodium: 251, cholesterol: 0 },
      healthScore: 7,
      category: 'Healthy Fat',
      timestamp: new Date()
    }
  ];

  private healthyAlternatives: { [key: string]: HealthyAlternative[] } = {
    'pizza': [
      {
        food: {
          id: 'alt1',
          name: 'Cauliflower Crust Pizza',
          nutrition: { calories: 180, protein: 12, carbs: 15, fat: 8, fiber: 3, sugar: 4, sodium: 320, cholesterol: 15 },
          healthScore: 7,
          category: 'Alternative',
          timestamp: new Date()
        },
        reason: 'Lower calories and carbs, higher fiber',
        improvementScore: 3
      }
    ],
    'burger': [
      {
        food: {
          id: 'alt2',
          name: 'Turkey Lettuce Wrap Burger',
          nutrition: { calories: 220, protein: 25, carbs: 8, fat: 10, fiber: 2, sugar: 3, sodium: 280, cholesterol: 45 },
          healthScore: 8,
          category: 'Alternative',
          timestamp: new Date()
        },
        reason: 'Lean protein, no refined carbs, lower calories',
        improvementScore: 4
      }
    ]
  };

  constructor() {
    // Load saved data from localStorage
    const savedFoods = localStorage.getItem('nutritionTracker_foods');
    if (savedFoods) {
      const foods = JSON.parse(savedFoods).map((food: any) => ({
        ...food,
        timestamp: new Date(food.timestamp)
      }));
      this.foodItemsSubject.next(foods);
    }
  }

  analyzeFood(imageName: string): Observable<FoodItem> {
    return new Observable(observer => {
      // Simulate AI analysis delay
      setTimeout(() => {
        const mockAnalysis = this.getMockFoodAnalysis(imageName);
        observer.next(mockAnalysis);
        observer.complete();
      }, 2000);
    });
  }

  private getMockFoodAnalysis(imageName: string): FoodItem {
    const foodName = imageName.toLowerCase();
    
    if (foodName.includes('pizza')) {
      return {
        id: Date.now().toString(),
        name: 'Pepperoni Pizza',
        nutrition: { calories: 298, protein: 12, carbs: 36, fat: 12, fiber: 2, sugar: 4, sodium: 760, cholesterol: 22 },
        healthScore: 4,
        category: 'Fast Food',
        timestamp: new Date()
      };
    } else if (foodName.includes('burger')) {
      return {
        id: Date.now().toString(),
        name: 'Cheeseburger',
        nutrition: { calories: 535, protein: 25, carbs: 40, fat: 31, fiber: 3, sugar: 5, sodium: 1040, cholesterol: 88 },
        healthScore: 3,
        category: 'Fast Food',
        timestamp: new Date()
      };
    } else if (foodName.includes('salad')) {
      return {
        id: Date.now().toString(),
        name: 'Mixed Green Salad',
        nutrition: { calories: 120, protein: 5, carbs: 12, fat: 7, fiber: 4, sugar: 6, sodium: 180, cholesterol: 0 },
        healthScore: 8,
        category: 'Vegetable',
        timestamp: new Date()
      };
    }
    
    // Default analysis
    return {
      id: Date.now().toString(),
      name: 'Unknown Food Item',
      nutrition: { calories: 200, protein: 10, carbs: 25, fat: 8, fiber: 3, sugar: 5, sodium: 300, cholesterol: 20 },
      healthScore: 6,
      category: 'Mixed',
      timestamp: new Date()
    };
  }

  addFoodItem(food: FoodItem): void {
    const currentFoods = this.foodItemsSubject.value;
    const updatedFoods = [...currentFoods, food];
    this.foodItemsSubject.next(updatedFoods);
    this.saveFoodsToStorage(updatedFoods);
  }

  removeFoodItem(id: string): void {
    const currentFoods = this.foodItemsSubject.value;
    const updatedFoods = currentFoods.filter(food => food.id !== id);
    this.foodItemsSubject.next(updatedFoods);
    this.saveFoodsToStorage(updatedFoods);
  }

  getHealthyAlternatives(foodName: string): HealthyAlternative[] {
    const key = foodName.toLowerCase();
    for (const [keyword, alternatives] of Object.entries(this.healthyAlternatives)) {
      if (key.includes(keyword)) {
        return alternatives;
      }
    }
    return [];
  }

  getDailyStats(date: Date): DailyStats {
    const foods = this.foodItemsSubject.value.filter(food => 
      food.timestamp.toDateString() === date.toDateString()
    );

    if (foods.length === 0) {
      return {
        date,
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        averageHealthScore: 0,
        foodsConsumed: 0
      };
    }

    const totals = foods.reduce((acc, food) => ({
      calories: acc.calories + food.nutrition.calories,
      protein: acc.protein + food.nutrition.protein,
      carbs: acc.carbs + food.nutrition.carbs,
      fat: acc.fat + food.nutrition.fat,
      healthScore: acc.healthScore + food.healthScore
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, healthScore: 0 });

    return {
      date,
      totalCalories: totals.calories,
      totalProtein: totals.protein,
      totalCarbs: totals.carbs,
      totalFat: totals.fat,
      averageHealthScore: totals.healthScore / foods.length,
      foodsConsumed: foods.length
    };
  }

  getWeeklyStats(): DailyStats[] {
    const stats: DailyStats[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      stats.push(this.getDailyStats(date));
    }
    
    return stats;
  }

  private saveFoodsToStorage(foods: FoodItem[]): void {
    localStorage.setItem('nutritionTracker_foods', JSON.stringify(foods));
  }
}