import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodItem } from '../../../../models/food.model';

@Component({
  selector: 'app-food-card',
  imports: [],
  templateUrl: './food-card.html',
  styleUrl: './food-card.scss'
})
export class FoodCard {
  @Input() food!: FoodItem;
  @Output() delete = new EventEmitter<string>();

  getHealthScoreClass(): string {
    if (this.food.healthScore >= 7) return 'excellent';
    if (this.food.healthScore >= 5) return 'good';
    return 'poor';
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  onDelete(): void {
    this.delete.emit(this.food.id);
  }
}