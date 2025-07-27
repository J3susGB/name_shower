// src/app/services/prediction.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://localhost:8000/api/predicciones';

  constructor(private http: HttpClient) {}

  enviarPrediccion(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  obtenerEstadisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estadisticas`);
  }

  obtenerTodas(): Observable<any> {
    return this.http.get('http://localhost:8000/api/admin/predicciones');
  }
}
