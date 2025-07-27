import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionFormComponent } from '../prediction-form/prediction-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PredictionFormComponent, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {}
