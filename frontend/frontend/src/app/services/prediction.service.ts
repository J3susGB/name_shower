// src/app/services/prediction.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

function buildApiUrl(path: string): string {
  return `${environment.apiUrl}/${path}`;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private baseUrl = buildApiUrl('predicciones');
  private adminUrl = buildApiUrl('admin/predicciones');

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
