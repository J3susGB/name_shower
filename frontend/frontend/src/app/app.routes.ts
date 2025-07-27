// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { PredictionsStatsComponent } from './components/predictions-stats/predictions-stats.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'regalos', component: GiftListComponent },
  { path: 'admin/panel', component: AdminPanelComponent },
  { path: 'ver-predicciones', component: PredictionsStatsComponent },
];
