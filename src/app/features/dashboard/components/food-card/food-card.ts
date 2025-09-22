import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NutritionResponse, GenerateRequest, GenerateResponse } from '../../../../models/food.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-food-card',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressBarModule],
  templateUrl: './food-card.html',
  styleUrl: './food-card.scss'
})
export class FoodCard {
  @Input() nutritionData: NutritionResponse | null = null;
  @Output() generateRequest = new EventEmitter<GenerateRequest>();
  @Output() reset = new EventEmitter<void>();

  servingMultiplier: number = 1;
  correctedData: GenerateResponse | null = null;
  generating = false;

  getConfidenceColor(): string {
    if (!this.nutritionData) return 'primary';

    if (this.nutritionData.confidence_score >= 80) return 'primary';
    if (this.nutritionData.confidence_score >= 60) return 'accent';
    return 'warn';
  }

  generateCorrectedValues() {
    if (!this.nutritionData) return;

    this.generating = true;

    const request: GenerateRequest = {
      foodName: this.nutritionData.food_name,
      foodCategory: this.nutritionData.food_category,
      servingSize: this.servingMultiplier.toString(),
      macros: this.nutritionData.macros,
      caloriesPerServing: this.nutritionData.calories_per_serving
    };

    this.generateRequest.emit(request);
  }

  setCorrectedData(data: GenerateResponse) {
    this.correctedData = data;
    this.generating = false;
  }

  startOver() {
    this.reset.emit();
  }
}