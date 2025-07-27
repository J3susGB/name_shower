// src/app/components/admin-panel/admin-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GiftService } from '../../services/gift.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  regalos: any[] = [];
  tokenValido = false;

  nuevoRegalo = {
    nombre: '',
    unidad: 1,
    precio: 0,
    enlace: ''
  };

  private readonly TOKEN_SECRETO = environment.adminToken;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private giftService: GiftService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    this.tokenValido = token === this.TOKEN_SECRETO;

    if (this.tokenValido) {
      this.cargarRegalos();
    }
  }

  cargarRegalos(): void {
    this.giftService.getAll().subscribe({
      next: (data) => this.regalos = data,
      error: () => alert('Error al cargar los regalos')
    });
  }

  crear(): void {
    if (!this.nuevoRegalo.nombre || !this.nuevoRegalo.enlace) {
      alert('Rellena todos los campos');
      return;
    }

    console.log('Enviando datos:', this.nuevoRegalo);

    this.giftService.crearGift(this.nuevoRegalo).subscribe({
      next: () => {
        this.nuevoRegalo = { nombre: '', unidad: 1, precio: 0, enlace: '' };
        this.cargarRegalos();
      },
      error: (err) => {
        console.error('Error al crear regalo:', err);
        alert('Error al crear el regalo');
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de que quieres eliminar este regalo?')) return;

    this.giftService.eliminarGift(id).subscribe({
      next: () => this.cargarRegalos(),
      error: () => alert('Error al eliminar el regalo')
    });
  }
}
