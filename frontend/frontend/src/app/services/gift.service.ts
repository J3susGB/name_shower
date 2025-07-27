// src/app/services/gift.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GiftService {
  private base = 'http://localhost:8000/api/gifts';
  private adminBase = 'http://localhost:8000/api/admin/gifts';

  // http://localhost:4200/admin/panel?token=8QJrUjvs???

  constructor(private http: HttpClient) { }

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
