import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PredictionFormComponent } from './components/prediction-form/prediction-form.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ esto es imprescindible para usar `imports` aquí
  imports: [RouterOutlet, PredictionFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ typo corregido: era styleUrl
})
export class AppComponent {
  title = 'frontend';
}
