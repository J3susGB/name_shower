import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftService } from '../../services/gift.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gift-list.component.html',
})
export class GiftListComponent implements OnInit {
  gifts: any[] = [];
  error: string = '';
  success: string = '';
  inputNombres: { [giftId: number]: string } = {}; // 👈 clave: input por regalo

  constructor(private giftService: GiftService) {}

  ngOnInit(): void {
    this.giftService.getAll().subscribe((res) => (this.gifts = res));
  }

  reservar(giftId: number, nombre: string): void {
    if (!nombre || !nombre.trim()) {
      this.error = 'Debes escribir tu nombre para reservar';
      this.success = '';
      return;
    }

    this.giftService.reservar(giftId, nombre).subscribe({
      next: () => {
        this.success = '¡Reserva realizada con éxito!';
        this.error = '';
        this.inputNombres[giftId] = '';
        this.ngOnInit(); // recargar lista
      },
      error: () => {
        this.error = 'Este regalo ya ha sido reservado o ha ocurrido un error.';
        this.success = '';
      },
    });
  }
}
