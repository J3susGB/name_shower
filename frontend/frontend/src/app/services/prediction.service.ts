// src/app/services/prediction.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private baseUrl = `${environment.apiUrl}/predicciones`;
  private adminUrl = `${environment.apiUrl}/admin/predicciones`;

  constructor(private http: HttpClient) {}

  enviarPrediccion(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  obtenerEstadisticas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/estadisticas`);
  }

  obtenerTodas(): Observable<any> {
    return this.http.get(this.adminUrl);
  }
}
