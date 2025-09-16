import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { NutritionService } from '../../../../core/services/nutrition.service';
import { FoodItem, HealthyAlternative } from '../../../../models/food.model';
import { Alternatives } from '../alternatives/alternatives';
import { ImageUpload } from '../image-upload/image-upload';
import { FoodCard } from '../food-card/food-card';
import { Stats } from '../stats/stats';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,Alternatives,ImageUpload,FoodCard,Stats
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  activeTab = 'upload';
  isAnalyzing = false;
  lastAnalyzedFood: FoodItem | null = null;
  currentAlternatives: HealthyAlternative[] = [];
  foodItems$: Observable<FoodItem[]>;

  tabs = [
    { id: 'upload', label: '📷 Upload' },
    { id: 'history', label: '📋 History' },
    { id: 'stats', label: '📊 Stats' }
  ];

  constructor(private nutritionService: NutritionService) {
    this.foodItems$ = this.nutritionService.foodItems$;
  }

  ngOnInit(): void {
    // Component initialization
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  onImageAnalyzed(imageName: string): void {
    this.isAnalyzing = true;
    this.lastAnalyzedFood = null;
    this.currentAlternatives = [];

    this.nutritionService.analyzeFood(imageName).subscribe(food => {
      this.isAnalyzing = false;
      this.lastAnalyzedFood = food;
      this.nutritionService.addFoodItem(food);

      // Get healthy alternatives if the food has a low health score
      if (food.healthScore < 7) {
        this.currentAlternatives = this.nutritionService.getHealthyAlternatives(food.name);
      }
    });
  }

  onDeleteFood(foodId: string): void {
    this.nutritionService.removeFoodItem(foodId);

    // Clear analysis result if it's the same food
    if (this.lastAnalyzedFood?.id === foodId) {
      this.lastAnalyzedFood = null;
      this.currentAlternatives = [];
    }
  }
}