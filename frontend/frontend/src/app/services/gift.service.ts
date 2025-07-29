// src/app/services/gift.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

function buildApiUrl(path: string): string {
  return `${environment.apiUrl}/${path}`;
}

@Injectable({ providedIn: 'root' })
export class GiftService {
  private base = buildApiUrl('gifts');
  private adminBase = buildApiUrl('admin/gifts');

  constructor(private http: HttpClient) {}

  // Públicos
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.base);
  }

  reservar(id: number, comprador: string): Observable<any> {
    return this.http.post(`${this.base}/reservar/${id}`, { comprador });
  }

  // ADMIN
  crearGift(gift: any): Observable<any> {
    const body = {
      ...gift,
      precio: parseFloat(gift.precio)
    };
    console.log('➡️ Enviando al backend:', body);
    return this.http.post(this.adminBase, body);
  }

  eliminarGift(id: number): Observable<any> {
    return this.http.delete(`${this.adminBase}/${id}`);
  }
}
