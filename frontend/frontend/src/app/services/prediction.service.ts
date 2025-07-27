// src/app/services/prediction.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://localhost:8000/api/predicciones';

  constructor(private http: HttpClient) {}

  enviarPrediccion(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
