import { Component, Input } from '@angular/core';
import { HealthyAlternative } from '../../../../models/food.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alternatives',
  imports: [CommonModule],
  templateUrl: './alternatives.html',
  styleUrl: './alternatives.scss'
})
export class Alternatives {
@Input() alternatives: HealthyAlternative[] = [];
}
