import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionFormComponent } from '../prediction-form/prediction-form.component';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PredictionFormComponent, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  ngOnInit(): void {
    console.log('📢 environment.apiUrl:', environment.apiUrl);
  }
}
