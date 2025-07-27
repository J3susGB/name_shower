// src/app/components/prediction-form/prediction-form.component.ts
import { Component } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prediction-form',
  standalone: true,
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.css'],
  imports: [FormsModule, CommonModule]
})
export class PredictionFormComponent {
  nombreAutor = '';
  sexoPredicho = '';
  nombreNino = '';
  nombreNina = '';
  nombreNino2 = '';
  nombreNina2 = '';
  enviado = false;
  error = '';

  constructor(private predictionService: PredictionService) {}

  enviar() {
    const payload = {
      nombreAutor: this.nombreAutor,
      sexoPredicho: this.sexoPredicho,
      nombreNino: this.nombreNino,
      nombreNina: this.nombreNina,
      nombreNino2: this.nombreNino2 || null,
      nombreNina2: this.nombreNina2 || null
    };

    this.predictionService.enviarPrediccion(payload).subscribe({
      next: () => {
        this.enviado = true;
        this.error = '';
      },
      error: err => {
        this.error = 'Error al enviar la predicción';
        console.error(err);
      }
    });
  }
}
