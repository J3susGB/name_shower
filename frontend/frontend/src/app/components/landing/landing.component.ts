import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionFormComponent } from '../prediction-form/prediction-form.component';

@Component({
  selector: 'app-root', // Esto debe coincidir con index.html
  standalone: true,
  imports: [CommonModule, PredictionFormComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {}
