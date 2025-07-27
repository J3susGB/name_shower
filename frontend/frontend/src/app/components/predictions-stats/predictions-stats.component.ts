// src/app/pages/predictions-stats.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-predictions-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './predictions-stats.component.html'
})
export class PredictionsStatsComponent implements OnInit {
  combinaciones: any = {};
  nombresNino: any[] = [];
  nombresNina: any[] = [];

  constructor(private predictionService: PredictionService) {}

  ngOnInit(): void {
    this.predictionService.obtenerEstadisticas().subscribe({
      next: data => {
        this.combinaciones = data.combinaciones;
        this.nombresNino = data.nombres_nino;
        this.nombresNina = data.nombres_nina;
      },
      error: err => console.error('Error al obtener estadísticas', err)
    });
  }
}
