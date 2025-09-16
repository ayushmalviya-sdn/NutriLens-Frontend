import { Component, OnInit } from '@angular/core';
import { NutritionService } from '../../../../core/services/nutrition.service';
import { DailyStats } from '../../../../models/food.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.scss'
})
export class Stats implements OnInit {
  todayStats!: DailyStats;
  weeklyStats: DailyStats[] = [];

  constructor(private nutritionService: NutritionService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.todayStats = this.nutritionService.getDailyStats(new Date());
    this.weeklyStats = this.nutritionService.getWeeklyStats();
  }

  getBarHeight(calories: number): number {
    const maxCalories = Math.max(...this.weeklyStats.map(s => s.totalCalories), 1);
    return Math.max((calories / maxCalories) * 100, 5);
  }

  getDayLabel(date: Date): string {
    return date.toLocaleDateString([], { weekday: 'short' });
  }

  getAverageCalories(): number {
    const total = this.weeklyStats.reduce((sum, day) => sum + day.totalCalories, 0);
    return Math.round(total / this.weeklyStats.length);
  }

  getBestHealthDay(): string {
    const bestDay = this.weeklyStats.reduce((best, current) => 
      current.averageHealthScore > best.averageHealthScore ? current : best
    );
    return bestDay.date.toLocaleDateString([], { weekday: 'long' });
  }

  getTotalFoods(): number {
    return this.weeklyStats.reduce((sum, day) => sum + day.foodsConsumed, 0);
  }
}