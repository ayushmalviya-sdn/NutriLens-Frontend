import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { ImageUpload } from '../image-upload/image-upload';
import { FoodCard } from '../food-card/food-card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NutritionService } from '../../../../core/services/nutrition.service';
import { NutritionResponse, GenerateRequest } from '../../../../models/food.model';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FoodCard,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule, ImageUpload, MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('cameraUpload') cameraUpload!: ImageUpload;
  @ViewChild('nutritionResults') nutritionResults!: FoodCard;

  nutritionData: NutritionResponse | null = null;
  loading = false;

  constructor(
    private nutritionService: NutritionService,
    private snackBar: MatSnackBar
  ) { }

  onImageSelected(file: File) {
    this.loading = true;

    this.nutritionService.uploadFile(file).subscribe({
      next: (response) => {
        this.nutritionData = response;
        this.loading = false;
        this.cameraUpload.resetUpload();
        this.showSuccess('Food analyzed successfully!');
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.loading = false;
        this.cameraUpload.resetUpload();
        this.showError('Failed to analyze food. Please try again.');
      }
    });
  }

  onGenerateRequest(request: GenerateRequest) {
    this.nutritionService.generateResponse(request).subscribe({
      next: (response) => {
        this.nutritionResults.setCorrectedData(response);
        this.showSuccess('Corrected values calculated!');
      },
      error: (error) => {
        console.error('Generate error:', error);
        this.showError('Failed to calculate corrected values. Please try again.');
      }
    });
  }

  resetApp() {
    this.nutritionData = null;
    this.loading = false;
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}

